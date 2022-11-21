export type GoodsItem = {
    title: string;
    price: number;
    imageUrl: string;
    types: number[];
    id: string;
    rating: number;
}

export enum Status {
    LOADING = 'loading',
    SUCCESS = 'success',
    ERROR = 'error',
}

export interface GoodsSliceState {
    items: GoodsItem[];
    status: Status;
}

export type SearchGoodsParams = {
    sortBy: string;
    order: string;
    category: string;
    search: string;
    currentPage: string;
}