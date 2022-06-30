export interface New {
    title: string;
    authors: string;
    publish_date: string;
    deck: string;
    body: string;
    site_detail_url: string;
    image: any;
    categories: Array<Category>
    associations: Array<Association>;
}

export interface APINewResponse<T> {
    results: Array<T>;
}

interface Category {
    name: string
}

interface Association {
    id: number;
    name: string;
    api_details_url: string;
}