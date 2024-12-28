"use client";

import {useState} from 'react';
import ChatMessages from '../../components/chat-messages';
import ChatInput from '../../components/chat-input';
import {Message} from '../../types/chat';
import {ChevronLeft, Home} from "lucide-react";
import Link from "next/link";

const suggestedPrompts = [
    {
        text: "What are the latest news headlines today?",
        icon: "📰",
        prompt: "What are the latest news headlines today?"
    },

    {
        text: "What are the top investment opportunities this week?",
        icon: "📊",
        prompt: "Provide a comprehensive analysis of current market trends and potential investment opportunities this week. Examine various asset classes including stocks, bonds, real estate, and emerging markets. Generate a complete market analysis."
    }
];

export default function SearchPage() {
    const [messages, setMessages] = useState<Message[]>([
        {
            role: 'system',
            content: "I'm an AI assistant that can help you find real-time information about any topic using Tavily search."
        }
    ]);
    const [isLoading, setIsLoading] = useState(false);

    const handleSendMessage = async (message: string) => {
        try {
            setIsLoading(true);

            // Add user message to chat
            const newMessages = [
                ...messages,
                {role: 'user', content: message} as Message
            ];
            setMessages(newMessages);

            // Send to API route
            const response = await fetch('/api/chat/search', {
                method: 'POST',
                headers: {'Content-Type': 'application/json'},
                body: JSON.stringify({messages: newMessages})
            });

            if (!response.ok) throw new Error('Failed to fetch response');

            const data = await response.json();

            // Add AI response to chat
            setMessages(prevMessages => [
                ...prevMessages,
                {role: 'assistant', content: data.content} as Message
            ]);
        } catch (error) {
            console.error('Error:', error);
            // Handle error appropriately
        } finally {
            setIsLoading(false);
        }
    };

    return (
        <div className="mx-auto p-10 h-screen flex flex-col">
            <div className="flex flex-col mb-4 justify-center text-black">
                <div className="flex gap-4 items-center">
                    <Link className="flex items-center" href={"/"}
                    ><ChevronLeft color={"white"}/> <Home color={"white"}/></Link>
                    <h1 className="text-3xl font-bold text-white">Real-time Search Chat</h1></div>
                <p className="text-gray-400">
                    Ask any question to get current information
                </p>
            </div>

            <div className="flex-1 overflow-hidden flex flex-col bg-gray-800 rounded-lg">
                {messages.length === 1 &&  <p className="text-gray-400 pl-4 pt-2 text-2xl">
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