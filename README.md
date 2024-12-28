# Function-Enabled Chatbot with OpenAI

A demonstration of OpenAI's function calling capabilities integrated with real-time Tavily search and custom API functionality. This project showcases how to build an AI chatbot that can perform actions like searching current information and converting currencies.

### Course Information
This project is part of the **'Building an OpenAI & Tavily Chatbot with Function Calling'** course offered by NeuroNest. You can find more information about the course at: https://app.neuronest.live/course/realtime-openai-tavily-chatbot

## Architecture Overview

### Core Components
- **Next.js 14**: Frontend and API routes
- **OpenAI GPT-4**: Function calling and chat completion
- **Tavily API**: Real-time search functionality
- **Exchange Rate API**: Currency conversion service

### Features
- Real-time search capabilities
- Live currency conversion
- Proper error handling
- Mobile-responsive design

## Prerequisites

- Node.js 18+
- npm or yarn
- Git
- Code editor (VS Code recommended)

## Account Setup

### OpenAI API
1. Visit [OpenAI Platform](https://platform.openai.com)
2. Create an account or sign in
3. Navigate to API Keys section
4. Create a new API key
5. Copy the key for later use

### Tavily API
1. Visit [Tavily](https://tavily.com)
2. Sign up for an account
3. Navigate to API section
4. Generate a new API key
5. Copy the key for later use

## Project Setup

1. **Clone the repository**:
```bash
git clone https://github.com/NeuroNestLearning/function-enabled-chatbot.git
cd function-enabled-chatbot
```

2. **Install dependencies**:
```
npm install
```

3. Environment Configuration Create a **.env.local** file in the root directory with the following variables:
```
OPENAI_API_KEY=your_openai_api_key_here
TAVILY_API_KEY=your_tavily_api_key_here
```

4. Run the development server:
```
npm run dev
```

5. **Access the Application** Open http://localhost:3000 in your browser

### Project Structure
```
function-enabled-chatbot/
├── src/
│   ├── app/
│   │   ├── api/
│   │   │   └── chat/
│   │   │       ├── currency/
│   │   │       │   └── route.ts
│   │   │       └── search/
│   │   │           └── route.ts
│   │   ├── search/
│   │   │   └── page.tsx
│   │   ├── custom/
│   │   │   └── page.tsx
│   │   ├── layout.tsx
│   │   └── page.tsx
│   ├── components/
│   │   ├── chat-input.tsx
│   │   ├── chat-message.tsx
│   │   └── chat-messages.tsx
│   ├── lib/
│   │   ├── exchange.ts
│   │   └── tavily.ts
│   └── types/
│       └── chat.ts
├── public/
├── .env.local
└── package.json
```

## Contributing

1. Fork the repository
2. Create a feature branch
3. Commit your changes
4. Push to the branch
5. Create a Pull Request

## Additional Resources

- [Next.js Documentation](https://nextjs.org/docs)
- [OpenAI API Function Calling Documentation](https://platform.openai.com/docs/guides/function-calling)
- [Tavily API Documentation](https://docs.tavily.com/)
- [Tailwind CSS Documentation](https://tailwindcss.com/docs)