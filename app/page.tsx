import Link from 'next/link';
import {ArrowRight, Bot, Search, Code, MessageSquare} from 'lucide-react';

export default function LandingPage() {
  return (
      <div className="min-h-screen bg-gradient-to-b from-gray-50 to-white text-black">
        {/* Hero Section */}
        <div className="relative overflow-hidden">
          <div className="">
            <div className="relative z-10 pb-8 sm:pb-16 md:pb-20 lg:pb-28 xl:pb-32">
              <main className="mt-10 mx-auto px-4 sm:mt-12 sm:px-6 md:mt-16 lg:mt-20 lg:px-8 xl:mt-28">
                <div className="text-center">
                  <h1 className="text-4xl tracking-tight font-extrabold text-gray-900 sm:text-5xl md:text-6xl">
                    <span className="block">NeuroNest, Function-Enabled</span>
                    <span className="block text-emerald-500">AI Chatbot</span>
                  </h1>
                  <p className="mt-3 text-base text-gray-500 sm:mt-5 sm:text-lg sm:max-w-xl sm:mx-auto md:mt-5 md:text-xl">
                    Explore the power of OpenAI's function calling with real-time search capabilities and custom API integration
                  </p>
                </div>

                {/* Architecture Diagram */}
                <div className="mt-16 flex justify-center">
                  <div className="w-full">
                    <div className="bg-white p-8 rounded-lg shadow-lg">
                      <h2 className="text-2xl font-bold text-center mb-8">Architecture Overview</h2>
                      <div className="flex flex-col items-center space-y-8">
                        {/* User Layer */}
                        <div className="flex items-center space-x-4">
                          <div className="w-48 text-center p-4 bg-blue-100 rounded-lg">
                            <MessageSquare className="w-8 h-8 mx-auto mb-2 text-blue-600"/>
                            <span>User Query</span>
                          </div>
                        </div>
                        <ArrowRight className="w-6 h-6 text-gray-400 transform rotate-90"/>
                        {/* Processing Layer */}
                        <div className="flex items-center justify-center space-x-8">
                          <div className="w-48 text-center p-4 bg-green-100 rounded-lg">
                            <Bot className="w-8 h-8 mx-auto mb-2 text-green-600"/>
                            <span>OpenAI Function Calling</span>
                          </div>
                        </div>
                        <ArrowRight className="w-6 h-6 text-gray-400 transform rotate-90"/>
                        {/* Integration Layer */}
                        <div className="flex items-center justify-center space-x-8">
                          <div className="w-48 text-center p-4 bg-purple-100 rounded-lg">
                            <Search className="w-8 h-8 mx-auto mb-2 text-purple-600"/>
                            <span>Tavily Search API</span>
                          </div>
                          <div className="w-48 text-center p-4 bg-yellow-100 rounded-lg">
                            <Code className="w-8 h-8 mx-auto mb-2 text-yellow-600"/>
                            <span>Custom API</span>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>

                {/* Tech Stack */}
                <div className="mt-16">
                  <h2 className="text-2xl font-bold text-center mb-8">Technology Stack</h2>
                  <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mx-auto">
                    <div className="bg-white p-6 rounded-lg shadow-md">
                      <h3 className="font-bold mb-2">Frontend</h3>
                      <ul className="text-gray-600">
                        <li>Next.js 14</li>
                        <li>Tailwind CSS</li>
                        <li>TypeScript</li>
                      </ul>
                    </div>
                    <div className="bg-white p-6 rounded-lg shadow-md">
                      <h3 className="font-bold mb-2">AI Integration</h3>
                      <ul className="text-gray-600">
                        <li>OpenAI Function Calling</li>
                        <li>Tavily Search API</li>
                        <li>Exchange rate API</li>
                        <li>Real-time Data Access</li>
                      </ul>
                    </div>
                    <div className="bg-white p-6 rounded-lg shadow-md">
                      <h3 className="font-bold mb-2">Features</h3>
                      <ul className="text-gray-600">
                        <li>Live Search Integration</li>
                        <li>Custom API Access</li>
                        <li>Streaming Responses</li>
                      </ul>
                    </div>
                  </div>
                </div>

                {/* Features Description */}
                <div className="mt-16">
                  <h2 className="text-2xl font-bold text-center mb-8">Available Features</h2>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mx-auto">
                    <div className="bg-white p-6 rounded-lg shadow-md">
                      <div className="flex items-center mb-4">
                        <Search className="w-6 h-6 text-purple-600 mr-2"/>
                        <h3 className="font-bold">Real-time Search</h3>
                      </div>
                      <p className="text-gray-600">
                        Access current information through Tavily's search API. Get real-time data
                        and latest updates about any topic through natural conversation.
                      </p>
                    </div>
                    <div className="bg-white p-6 rounded-lg shadow-md">
                      <div className="flex items-center mb-4">
                        <Code className="w-6 h-6 text-yellow-600 mr-2"/>
                        <h3 className="font-bold">Custom API Access</h3>
                      </div>
                      <p className="text-gray-600">
                        Interact with a custom API to fetch specific data. Experience how function
                        calling can seamlessly integrate with your existing services.
                      </p>
                    </div>
                  </div>
                </div>

                {/* Action Buttons */}
                <div className="mt-12 text-center flex justify-center gap-10">
                  <Link
                      href="/search"
                      className="inline-flex items-center px-8 py-3 border border-transparent text-base font-medium rounded-md text-white bg-purple-600 hover:bg-purple-700 md:text-lg"
                  >
                    Try Real-time Search
                    <ArrowRight className="ml-2 w-5 h-5"/>
                  </Link>
                  <Link
                      href="/custom"
                      className="inline-flex items-center px-8 py-3 border border-transparent text-base font-medium rounded-md text-white bg-yellow-600 hover:bg-yellow-700 md:text-lg"
                  >
                    Try Custom API
                    <ArrowRight className="ml-2 w-5 h-5"/>
                  </Link>
                </div>
              </main>
            </div>
          </div>
        </div>
      </div>
  );
}