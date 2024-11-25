interface Sources {
    id: null | string;
    name: string;
}

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
export interface INewsSources {
    id: string;
    name: string;
    description: string;
    url: string;
    category: string;
    language: string;
    country: string;
}

export function assertIsDefined<T>(value: T): asserts value is NonNullable<T> {
    if (!(value instanceof HTMLDivElement)) {
        throw new Error('error');
    }
}

export function processDesc<Type>(value: Type | null): Type {
    if (value === null) {
        throw new Error(`error ${value}`);
    } else {
        return value;
    }
}
