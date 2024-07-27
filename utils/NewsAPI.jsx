import {newsAPIKey} from './API_KEY'



const apiBaseURL = "https://newsapi.org/v2";

export const topHeadlinesURL = `${apiBaseURL}/top-headlines?sources=bbc-news&apiKey=${newsAPIKey}`;
export const recommendedNewsURL = `${apiBaseURL}/top-headlines?sources=the-hindu&apiKey=${newsAPIKey}`;
export const sportsURL = `${apiBaseURL}/top-headlines?country=in&category=sports&apiKey=${newsAPIKey}`;

export const discoverNewsUrl = (discover) => `${apiBaseURL}/top-headlines?sources=${discover}&apiKey=${newsAPIKey}`;

export const topSportsHeadlinesURL =  `${apiBaseURL}/top-headlines?sources=bbc-sport&apiKey=${newsAPIKey}`;

export const selectedSportsUrl = (sports) => `${apiBaseURL}/everything?q=${sports}&apiKey=${newsAPIKey}`;


export const searchNewsURL = (query) => `${apiBaseURL}/everything?q=${query}&apiKey=${newsAPIKey}`;

const newsAPICall = async (endpoints, params) => {

    try {
        
        fetch(topHeadlinesURL, {
            'method' : 'GET',
        }).then(response => response.json()).then(res => {
            const articles = res.articles;
            // // console.log(articles);
            return articles;
        })

        
    } catch (error) {
        console.log(error);
        return {};
    }
};

export const fetchTopHeadlines = async () => {
    // // console.log("I'm here!")
    const resp = await newsAPICall(topHeadlinesURL);
    // // console.log(resp);    
    return await resp;
}

export const fetchRecommendedNews = async () => {
    return await newsAPICall(recommendedNewsURL)
}

export const fetchSports = async () => {
    return await newsAPICall(sportsURL);
}

export const fetchDiscoverNews = async () => {
    return await newsAPICall(discoverNewsUrl);
}

export const fetchSearchNews = async (query) => {
    const endpoint = searchNewsURL(query)
    return await newsAPICall(endpoint);
}