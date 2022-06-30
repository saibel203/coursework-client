export interface Esport {
    
}

export interface UpcomingTournaments {
    begin_at: string;
    end_at: string;
    videogame: object;
    teams: Array<Team>;
    matches: Array<Match>;
}

export interface APIEsportResponse<T> {
    results: Array<T>;
}

interface Team {
    name: string;
    image_url: string;
}

interface Match {
    begin_at: string;
    name: string;
    official_stream_url: string;
}