export interface Article {
    id: number;
    title: string;
    createdAt: number;
    tag: string;
    summary: string;
}

export interface TagMap {
    [key: number]: string
}