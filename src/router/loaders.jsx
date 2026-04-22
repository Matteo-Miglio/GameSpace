export async function getAllGamesLoader({ request }) {
    const url = new URL(request.url);
    const page = url.searchParams.get("page") || "1";

    const response = await fetch(
        `https://api.rawg.io/api/games?key=${import.meta.env.VITE_API_KEY}&dates=2010-01-01,2018-12-31&page_size=28&page=${page}`
    );
    
    if (!response.ok) throw new Error("Errore database: impossibile recuperare i giochi.");

    const json = await response.json();

    return {
        games: json.results,
        currentPage: parseInt(page),
        hasNextPage: !!json.next
    };
}

export async function getSearchedGames({ params }) {
    const promise = await fetch(`https://api.rawg.io/api/games?key=${import.meta.env.VITE_API_KEY}&search=${params.slug}`)
    
    if (!promise.ok) throw new Error("Errore ricerca: segnale interrotto.");
    
    const json = await promise.json()
    return json.results;
}

export async function getAllGenres() {
    const promise = await fetch(`https://api.rawg.io/api/genres?key=${import.meta.env.VITE_API_KEY}`)
    
    if (!promise.ok) throw new Error("Errore generi: archivio non raggiungibile.");
    
    const json = await promise.json()
    return json.results;
}


export async function getFilteredBuGenreGames({ params, request }) {
    const url = new URL(request.url);
    const page = url.searchParams.get("page") || "1";

    const res = await fetch(
        `https://api.rawg.io/api/games?key=${import.meta.env.VITE_API_KEY}&genres=${params.slug}&page=${page}&page_size=28`
    );
    
    if (!res.ok) throw new Error("Errore durante il caricamento dei giochi.");
    
    const json = await res.json();

    return {
        games: json.results,
        currentPage: parseInt(page),
        hasNextPage: !!json.next
    };
}



export async function getGameDetails({ params }) {
    const promise = await fetch(`https://api.rawg.io/api/games/${params.id}?key=${import.meta.env.VITE_API_KEY}`);

    if (!promise.ok) throw new Error("Errore critico: file di gioco non trovato.");
    
    const json = await promise.json();

    const trailers = await fetch(`https://api.rawg.io/api/games/${params.id}/movies?key=${import.meta.env.VITE_API_KEY}`);
    const trailersData = await trailers.json();

    const screenshotsRes = await fetch(`https://api.rawg.io/api/games/${params.id}/screenshots?key=${import.meta.env.VITE_API_KEY}`);
    const screenshotsData = await screenshotsRes.json();

    const seriesRes = await fetch(`https://api.rawg.io/api/games/${params.id}/game-series?key=${import.meta.env.VITE_API_KEY}`);
    const seriesData = await seriesRes.json();

    return {json, screenshots: screenshotsData.results, trailers: trailersData.results, series: seriesData.results};
}