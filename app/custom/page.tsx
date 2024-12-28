"use client";

import {useState} from 'react';
import ChatMessages from '../../components/chat-messages';
import ChatInput from '../../components/chat-input';
import {Message} from '../../types/chat';
import Link from "next/link";
import {ChevronLeft, Home} from "lucide-react";


const suggestedPrompts = [
    {
        text: "Convert 100 USD to EUR",
        icon: "📰",
        prompt: "Convert 100 USD to EUR"
    },

    {
        text: "How much is 50 GBP in JPY?",
        icon: "📊",
        prompt: "How much is 50 GBP in JPY?"
    }
];

export default function CustomPage() {
    const [messages, setMessages] = useState<Message[]>([
        {
            role: 'system',
            content: "I'm an AI assistant that can help you convert currencies using real-time exchange rates. Try asking something like 'Convert 100 USD to EUR' or 'How much is 50 GBP in JPY?'"
        }
    ]);
    const [isLoading, setIsLoading] = useState(false);

    const handleSendMessage = async (message: string) => {
        try {
            setIsLoading(true);

            const newMessages = [
                ...messages,
                {role: 'user', content: message} as Message
            ];
            setMessages(newMessages);

            const response = await fetch('/api/chat/currency', {
                method: 'POST',
                headers: {'Content-Type': 'application/json'},
                body: JSON.stringify({messages: newMessages})
            });

            if (!response.ok) throw new Error('Failed to fetch response');

            const data = await response.json();

            setMessages(prevMessages => [
                ...prevMessages,
                {role: 'assistant', content: data.content} as Message
            ]);
        } catch (error) {
            console.error('Error:', error);
            setMessages(prevMessages => [
                ...prevMessages,
                {
                    role: 'assistant',
                    content: 'Sorry, I encountered an error while processing your request. Please try again.'
                } as Message
            ]);
        } finally {
            setIsLoading(false);
        }
    };

    return (
        <div className="mx-auto p-4 h-screen flex flex-col">
            <div className="flex flex-col mb-4 justify-center text-black">
                <div className="flex gap-4 items-center">
                    <Link className="flex items-center" href={"/"}
                    ><ChevronLeft color={"white"}/> <Home color={"white"}/></Link>
                    <h1 className="text-3xl font-bold text-white">Currency Converter</h1></div>
                <p className="text-gray-400">
                    Ask me to convert any currency using live exchange rates
                </p>
            </div>

            <div className="flex-1 overflow-hidden flex flex-col bg-gray-800 rounded-lg">
                {messages.length === 1 && <p className="text-gray-400 pl-4 pt-2 text-2xl">
                    Try one of these samples or ask a question!
                </p>}
                {messages.length === 1 && <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mb-4 md:mb-8 p-4">
                    {(suggestedPrompts).map((prompt, index) => (
                        <button
                            key={index}
                            onClick={async () => {
                                await handleSendMessage(prompt.prompt);
                            }}
                            className={`bg-gray-700 p-4 rounded-lg text-left transition-colors min-h-[100px] hover:bg-gray-700}`}>
                            <span className="text-2xl mr-2">{prompt.icon}</span>
                            {prompt.text}
                        </button>
                    ))}
                </div>}
                <ChatMessages messages={messages} isLoading={isLoading}/>
                <ChatInput
                    onSendMessage={handleSendMessage}
                    isLoading={isLoading}
                />
            </div>
        </div>
    );
}