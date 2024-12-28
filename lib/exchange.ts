export async function getExchangeRate(fromCurrency: string, toCurrency: string): Promise<number> {
    const response = await fetch(
      //  `https://api.exchangerate.host/convert?from=${fromCurrency}&to=${toCurrency}`
        `https://open.er-api.com/v6/latest/${fromCurrency}`
    );

    if (!response.ok) {
        throw new Error('Failed to fetch exchange rate');
    }

    const data = await response.json();

    if (!data.result) {
        throw new Error('Invalid exchange rate data');
    }

    const result = data.rates[toCurrency];

    if (!result) {
        throw new Error('No rates found');
    }

    return result;
}