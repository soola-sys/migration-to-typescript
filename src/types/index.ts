interface Sources {
    id: null | string;
    name: string;
}
export type IArticleOrSources<T extends INewsArticles[]> = T extends INewsArticles
    ? INewsArticleResponse
    : INewsSourcesResponse;

export interface IEnvOptions {
    apiKey?: string;
}

export function getEnv(input: string | undefined): string {
    if (input == undefined) {
        throw new Error(`${input} is undefined`);
    } else {
        return input;
    }
}

export interface IOptions {
    sources?: string | null;
}

export type Callback<T> = (data: T) => void;

export enum responseStatuses {
    Ok = 'ok',
    Error = 'error',
}

// export enum EnpointTypes {
//     Everything = 'everything',
//     Sources = 'sources',
// }

export interface INewsArticles {
    source: Sources;
    author: string | null;
    title: string;
    description: string;
    url: string;
    urlToImage: string | null;
    publishedAt: string;
    content: string;
}

export interface INewsArticleResponse {
    status: responseStatuses;
    totalResults?: number;
    articles?: INewsArticles[];
}
export interface INewsSourcesResponse {
    status: responseStatuses;
    sources?: INewsSources[];
}
export interface INewsSources {
    id: string;
    name: string;
    description: string;
    url: string;
    category: string;
    language: string;
    country: string;
}

export function assertIsDefined(value: EventTarget | null): asserts value is HTMLElement {
    if (!(value instanceof HTMLElement)) {
        throw new Error('error');
    }
}

export function checkForNull<Type>(value: Type | null): Type {
    if (value === null) {
        throw new Error(`error ${value}`);
    } else {
        return value;
    }
}
