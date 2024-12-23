import AppController from '../controller/controller';
import { AppView } from '../view/appView';
import { checkForNull, INewsArticleResponse, INewsSourcesResponse } from '../../types/index';

class App {
    private controller: AppController;
    private view: AppView;
    constructor() {
        this.controller = new AppController();
        this.view = new AppView();
    }

    start() {
        const sources: Element | null = document.querySelector('.sources');
        checkForNull(sources).addEventListener('click', (e: Event) =>
            this.controller.getNews(e, (data: INewsArticleResponse) => this.view.drawNews(data))
        );
        this.controller.getSources((data: INewsSourcesResponse) => this.view.drawSources(data));
    }
}

export default App;
