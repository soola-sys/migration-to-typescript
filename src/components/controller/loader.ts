import { IEnvOptions, IEndpoints, IOptions, Callback } from '../../types/index';
import { INewsArticleResponse, INewsSourcesResponse } from '../../types/index';
class Loader {
    private baseLink;
    private options;
    constructor(baseLink: string, options: Partial<IEnvOptions>) {
        this.baseLink = baseLink;
        this.options = options;
    }
    getResp(
        { endpoint, options = {} }: { endpoint: IEndpoints; options: IOptions },
        callback: Callback<INewsArticleResponse | INewsSourcesResponse> = () => {
            console.error('No callback for GET response');
        }
    ) {
        this.load('GET', endpoint, callback, options);
    }
    errorHandler(res: Response): Response {
        if (!res.ok) {
            if (res.status === 401 || res.status === 404)
                console.log(`Sorry, but there is ${res.status} error: ${res.statusText}`);
            throw Error(res.statusText);
        }

        return res;
    }

    makeUrl(options: IOptions = {}, endpoint: IEndpoints): string {
        const urlOptions: Record<string, unknown> = { ...this.options, ...options };
        console.log('UrlOptions', urlOptions);
        let url: string = `${this.baseLink}${endpoint}?`;

        Object.keys(urlOptions).forEach((key) => {
            url += `${key}=${urlOptions[key]}&`;
        });

        return url.slice(0, -1);
    }

    load(
        method: 'GET' | 'POST',
        endpoint: IEndpoints,
        callback: Callback<INewsArticleResponse | INewsSourcesResponse>,
        options: IOptions = {}
    ) {
        fetch(this.makeUrl(options, endpoint), { method })
            .then(this.errorHandler)
            .then((res) => res.json())
            .then((data) => callback(data))
            .catch((err: Error) => console.error(err));
    }
}

export default Loader;
