import {OpenAI} from 'openai';
import {getTavilySearchResults} from '../../../../lib/tavily';
import {NextResponse} from 'next/server';

const openai = new OpenAI({
    apiKey: process.env.OPENAI_API_KEY!
});

const tools = [
    {
        type: "function",
        function: {
            name: "search",
            description: "Search for real-time information on the internet",
            parameters: {
                type: "object",
                properties: {
                    query: {
                        type: "string",
                        description: "The search query"
                    },
                    search_depth: {
                        type: "string",
                        enum: ["basic", "advanced"],
                        description: "The depth of search to perform",
                        default: "basic"
                    }
                },
                required: ["query"]
            }
        }
    }
];

export async function POST(req: Request) {
    try {
        const {messages} = await req.json();

        const completion = await openai.chat.completions.create({
            model: 'gpt-4',
            messages,
            tools,
            tool_choice: 'auto',
        });

        const responseMessage = completion.choices[0].message;

        // Check if the model wants to call the search function
        if (responseMessage.tool_calls) {
            const toolCall = responseMessage.tool_calls[0];
            const functionArgs = JSON.parse(toolCall.function.arguments);
            const searchResults = await getTavilySearchResults(
                functionArgs.query,
                functionArgs.search_depth || 'basic'
            );

            // Let the model process the search results
            const secondResponse = await openai.chat.completions.create({
                model: 'gpt-4',
                messages: [
                    ...messages,
                    responseMessage,
                    {
                        role: 'tool',
                        tool_call_id: toolCall.id,
                        name: 'search',
                        content: JSON.stringify(searchResults)
                    }
                ]
            });

            return NextResponse.json({
                content: secondResponse.choices[0].message.content,
                sources: searchResults.results?.map(r => r.url) || []
            });
        }

        return NextResponse.json({content: responseMessage.content});
    } catch (error) {
        console.error('Error:', error);
        return NextResponse.json(
            {error: 'Internal Server Error'},
            {status: 500}
        );
    }
}