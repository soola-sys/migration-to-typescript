import { INewsArticles } from '../../../types/index';
import { checkForNull } from '../../../types/index';
import './news.css';

class News {
    draw(data: Array<INewsArticles>): void {
        const news = data.length >= 10 ? data.filter((_item, idx) => idx < 10) : data;

        const fragment: DocumentFragment = document.createDocumentFragment();
        const htmlNews: HTMLDivElement | null = document.querySelector('.news');
        const newsItemTemp: HTMLTemplateElement | null = document.querySelector('#newsItemTemp');
        if (newsItemTemp === null) {
            throw new Error('Error');
        }
        news.forEach((item: INewsArticles, idx: number) => {
            const newsClone: Node = newsItemTemp.content.cloneNode(true);
            if (!(newsClone instanceof DocumentFragment)) {
                throw new Error('error');
            }
            const newsItem: HTMLDivElement | null = newsClone.querySelector('.news__item');
            const metaPhoto: HTMLDivElement | null = newsClone.querySelector('.news__meta-photo');
            const newsMetaAuthor: HTMLLIElement | null = newsClone.querySelector('.news__meta-author');
            const newsMetaDate: HTMLLIElement | null = newsClone.querySelector('.news__meta-date');
            const newsDescTitle: HTMLHeadingElement | null = newsClone.querySelector('.news__description-title');
            // const newsDescSource: HTMLHeadingElement | null = newsClone.querySelector('.news__description-source');
            const newsDescContent: HTMLParagraphElement | null = newsClone.querySelector('.news__description-content');
            const newsReadMore: HTMLParagraphElement | null = newsClone.querySelector('.news__read-more a');
            if (idx % 2) checkForNull(newsItem).classList.add('alt');

            checkForNull(metaPhoto).style.backgroundImage = `url(${item.urlToImage || 'img/news_placeholder.jpg'})`;
            checkForNull(newsMetaAuthor).textContent = item.author || item.source.name;
            checkForNull(newsMetaDate).textContent = item.publishedAt.slice(0, 10).split('-').reverse().join('-');
            checkForNull(newsDescTitle).textContent = item.title;
            checkForNull(newsDescContent).textContent = item.source.name;
            checkForNull(newsReadMore).textContent = item.description;
            checkForNull(newsReadMore).setAttribute('href', item.url);
            fragment.append(newsClone);
        });
        checkForNull(htmlNews).innerHTML = '';
        checkForNull(htmlNews).appendChild(fragment);
    }
}

export default News;
