export interface sqlQuery {
    limit: number;
    offset: number;
    order:Array <Array <string>>;
    raw: boolean;
    where?: undefined | object;
    attributes?: undefined | Array<string>;
}

export interface article {
    id: number;
    title: string;
    tag: string;
    content: string;
    hash: string;
    is_top: number;
    create_time: number;
    update_time: number;
}


export interface articlePlusTime extends article {
    time: number;
}
