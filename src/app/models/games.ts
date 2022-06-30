export interface Game {
    id: number;
    background_image: string;
    name: string;
    released: string;
    metacritic_url: string;
    website: string;
    description: string;
    metacritic: number;
    genres: Array<Genre>;
    parents_platforms: Array<ParentPlatform>;
    publishers: Array<Publishers>;
    rating: Array<Rating>;
    screenshots: Array<Screenshots>;
    trailers: Array<Trailer>;
    tags: Array<Tag>;
}

export interface APIResponse<T> {
    results: Array<T>;
}

interface Genre {
    name: string;
}

interface ParentPlatform {
    platform: {
        name: string;
    };
}

interface Publishers {
    name: string;
}

interface Rating {
    id: number;
    count: number;
    title: string;
}

interface Screenshots {
    image: string;
}

interface Trailer {
    data: {
        max: string;
    };
}

interface Tag {
    name: string;
}