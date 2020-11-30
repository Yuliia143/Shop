export interface ProductInterface {
    id: number;
    imgUrl?: string;
    rating: number;
    category: string;
    title: string;
    stock: number;
    price: number;
    deliveryTime: number;
    country: string;
    buyProperties: string;
    tags?: string;
    previousPrice?: number;
    freshness?: string;
    farm?: string;
    deliveryArea?: string;
    color?: string;
    sizes?: string;
    description: [];
    reviews?: [];
    questions?: [];
}
