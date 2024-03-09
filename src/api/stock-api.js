const basePath = "https://finnhub.io/api/v1"
const token = "cnliic9r01qk2u6r3d6gcnliic9r01qk2u6r3d70"
//https://finnhub.io/api/v1/search?q=apple&token=cnliic9r01qk2u6r3d6gcnliic9r01qk2u6r3d70

export const searchSymbols = async (query) =>{
    const url = `${basePath}/search?q=${query}&token=${token}`
    const response = await fetch(url);
    
    if(!response.ok){
        const message = `An error has occured! : ${response.status}`
        throw new Error(message);
    }

    return await response.json();
}

export const fetchStockDetails = async (stockSymbol) =>{
    const url = `${basePath}/stock/profile2?symbol=${stockSymbol}&token=${token}`
    const response = await fetch(url);

    if(!response.ok){
        const message = `An error has occured! : ${response.status}`
        throw new Error(message);
    }

    return await response.json();
}

export const fetchQuote = async (stockSymbol) =>{
    const url = `${basePath}/quote?symbol=${stockSymbol}&token=${token}`
    const response = await fetch(url);

    if(!response.ok){
        const message = `An error has occured! : ${response.status}`
        throw new Error(message);
    }

    return await response.json();
}

export const fetchHistoricalData =  async (stockSymbol,resolution,from,to) =>{
    // const url = `${basePath}/stock/candle?symbol=${stockSymbol}&resolution=${resolution}&from=${from}&to=${to}&token=${token}`

    const url = `https://finnhub.io/api/v1/quote?symbol=${stockSymbol}&token=cnliic9r01qk2u6r3d6gcnliic9r01qk2u6r3d70`

    const response = await fetch(url);

    if(!response.ok){
        const message = `An error has occured! : ${response.status}`
        throw new Error(message);
    }
    return await response.json();
}
