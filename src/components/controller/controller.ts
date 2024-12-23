import AppLoader from './appLoader';
import { INewsArticleResponse, INewsSourcesResponse, Callback, checkForNull, assertIsDefined } from '../../types/index';
class AppController extends AppLoader {
    getSources(callback: Callback<INewsSourcesResponse>) {
        super.getResp(
            {
                endpoint: 'sources',
            },
            callback
        );
    }

    getNews(e: Event, callback: Callback<INewsArticleResponse>): void {
        let target: EventTarget | null = e.target;
        const newsContainer: EventTarget | null = e.currentTarget;
        while (target !== newsContainer) {
            assertIsDefined(target);
            assertIsDefined(newsContainer);
            if (checkForNull(target).classList.contains('source__item')) {
                const sourceId: string | null = checkForNull(target).getAttribute('data-source-id');
                if (checkForNull(newsContainer).getAttribute('data-source') !== sourceId) {
                    newsContainer.setAttribute('data-source', checkForNull(sourceId));
                    super.getResp(
                        {
                            endpoint: 'everything',
                            options: {
                                sources: sourceId,
                            },
                        },
                        callback
                    );
                }
                return;
            }
            target = target.parentNode;
        }
    }
}

export default AppController;
