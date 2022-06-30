export interface Shop {
    title: string;
    price: string;
    old_price: string;
    discount: string;
    currency_tag: string;
    rating: string;
    release_date: string;
    img: string;
    url: string;
    currency: string;
}

export interface APIShopResponse<T> {
    results: Array<T>;
}
