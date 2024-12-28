export async function getTavilySearchResults(query: string) {
    const response = await fetch('https://api.tavily.com/search', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({
            query,
            api_key: process.env.TAVILY_API_KEY,
            search_depth: 'advanced',
            include_answer: true,
            max_results: 5
        })
    });

    if (!response.ok) {
        throw new Error('Failed to fetch search results');
    }

    return response.json();
}