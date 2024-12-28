import { OpenAI } from 'openai';
import { NextResponse } from 'next/server';
import { getExchangeRate } from '../../../../lib/exchange';

const openai = new OpenAI({
    apiKey: process.env.OPENAI_API_KEY!
});

const tools = [
    {
        type: "function",
        function: {
            name: "convert_currency",
            description: "Convert an amount from one currency to another using current exchange rates",
            parameters: {
                type: "object",
                properties: {
                    from_currency: {
                        type: "string",
                        description: "The currency to convert from (e.g., USD, EUR, GBP)"
                    },
                    to_currency: {
                        type: "string",
                        description: "The currency to convert to (e.g., USD, EUR, GBP)"
                    },
                    amount: {
                        type: "number",
                        description: "The amount to convert"
                    }
                },
                required: ["from_currency", "to_currency", "amount"]
            }
        }
    }
];


export async function POST(req: Request) {
    try {
        const { messages } = await req.json();

        const completion = await openai.chat.completions.create({
            model: 'gpt-4',
            messages,
            tools,
            tool_choice: 'auto',
        });

        const responseMessage = completion.choices[0].message;

        // Check if the model wants to call the currency conversion function
        if (responseMessage.tool_calls) {
            const toolCall = responseMessage.tool_calls[0];
            const functionArgs = JSON.parse(toolCall.function.arguments);

            // Get exchange rate and calculate conversion
            const rate = await getExchangeRate(
                functionArgs.from_currency,
                functionArgs.to_currency
            );

            const convertedAmount = functionArgs.amount * rate;

            // Format the result
            const result = {
                from_amount: functionArgs.amount,
                from_currency: functionArgs.from_currency,
                to_amount: convertedAmount,
                to_currency: functionArgs.to_currency,
                rate: rate
            };

            // Let the model format the response
            const secondResponse = await openai.chat.completions.create({
                model: 'gpt-4',
                messages: [
                    ...messages,
                    responseMessage,
                    {
                        role: 'tool',
                        tool_call_id: toolCall.id,
                        name: 'convert_currency',
                        content: JSON.stringify(result)
                    }
                ]
            });

            return NextResponse.json({ content: secondResponse.choices[0].message.content });
        }

        return NextResponse.json({ content: responseMessage.content });
    } catch (error) {
        console.error('Error:', error);
        return NextResponse.json(
            { error: 'Internal Server Error' },
            { status: 500 }
        );
    }
}