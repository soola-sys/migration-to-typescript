import News from './news/news';
import Sources from './sources/sources';
import { INewsArticleResponse, INewsArticles, INewsSources } from '../../types/index';
import { INewsSourcesResponse } from '../../types/index';

export class AppView {
    private news: News;
    private sources: Sources;
    constructor() {
        this.news = new News();
        this.sources = new Sources();
    }

    drawNews(data: INewsArticleResponse): void {
        const values: INewsArticles[] = data?.articles ? data?.articles : [];
        this.news.draw(values.sort((a, b) => new Date(a.publishedAt).getTime() - new Date(b.publishedAt).getTime()));
    }

    drawSources(data: INewsSourcesResponse): void {
        const values: INewsSources[] = data?.sources ? data?.sources : [];
        this.sources.draw(values);
    }
}

export default AppView;
