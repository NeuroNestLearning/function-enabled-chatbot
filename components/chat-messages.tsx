import {Message} from '../types/chat';
import {Bot, User} from 'lucide-react';

interface Props {
    messages: Message[];
    isLoading: boolean
}

export default function ChatMessages({messages, isLoading}: Props) {
    return (
        <div className="flex-1 overflow-y-auto p-4 space-y-4">
            {messages.map((message, index) => (
                message.role !== 'system' && (
                    <div
                        key={index}
                        className={`flex items-start ${
                            message.role === 'assistant' ? 'bg-gray-700' : 'bg-gray-600'
                        } rounded-lg p-4`}
                    >
                        <div className="flex items-center justify-center h-8 w-8 rounded-full bg-gray-500 mr-4">
                            {message.role === 'assistant' ? (
                                <Bot className="h-5 w-5 text-white"/>
                            ) : (
                                <User className="h-5 w-5 text-white"/>
                            )}
                        </div>
                        <div className="flex-1 space-y-2">
                            <p className="text-white">{message.content}</p>
                            {message.role === 'assistant' && message.source && (
                                <p className="text-sm text-gray-400">Source: {message.source}</p>
                            )}
                        </div>
                    </div>
                )
            ))}
            {isLoading && (
                <div className="flex items-center space-x-2 text-gray-500">
                    <div className="w-2 h-2 bg-gray-400 rounded-full animate-bounce"/>
                    <div
                        className="w-2 h-2 bg-gray-400 rounded-full animate-bounce"
                        style={{animationDelay: '0.2s'}}
                    />
                    <div
                        className="w-2 h-2 bg-gray-400 rounded-full animate-bounce"
                        style={{animationDelay: '0.4s'}}
                    />
                </div>
            )}
        </div>
    );
}