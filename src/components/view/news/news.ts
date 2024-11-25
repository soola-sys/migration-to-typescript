import { INewsArticles } from '../../../types/index';
import { processDesc } from '../../../types/index';
import './news.css';

class News {
    draw(data: Array<INewsArticles>): void {
        const news = data.length >= 10 ? data.filter((_item, idx) => idx < 10) : data;

        const fragment = document.createDocumentFragment() as DocumentFragment;
        const htmlNews = document.querySelector('.news') as HTMLDivElement;
        // const newsItemTemp = document.querySelector('#newsItemTemp') as HTMLTemplateElement;
        const newsItemTemp = document.querySelector('#newsItemTemp') as HTMLTemplateElement;
        if (newsItemTemp === null) {
            throw new Error('Error');
        }
        news.forEach((item, idx) => {
            const newsClone = newsItemTemp.content.cloneNode(true) as HTMLDivElement;
            if (newsClone === null) {
                throw new Error('error');
            }
            const newsItem = newsClone.querySelector('.news__item');
            const metaPhoto = newsClone.querySelector('.news__meta-photo') as HTMLDivElement;
            const newsMetaAuthor = newsClone.querySelector('.news__meta-author') as HTMLLIElement;
            const newsMetaDate = newsClone.querySelector('.news__meta-date') as HTMLLIElement;
            const newsDescTitle = newsClone.querySelector('.news__description-title');
            const newsDescSource = newsClone.querySelector('.news__description-source');
            const newsDescContent = newsClone.querySelector('.news__description-content');
            const newsReadMore = newsClone.querySelector('.news__read-more a') as HTMLParagraphElement;
            if (newsItem === null) {
                throw new Error('Something has gone very, very wrong.');
            }
            if (idx % 2) newsItem.classList.add('alt');
            if (metaPhoto === null) {
                throw new Error('error');
            }
            if (newsMetaAuthor === null) {
                throw new Error(`error in ${newsMetaAuthor}`);
            }
            if (newsMetaDate === null) {
                throw new Error(`error in ${newsMetaDate}`);
            }
            if (newsDescSource === null) {
                throw new Error(`error in ${newsDescSource}`);
            }
            if (htmlNews === null) {
                throw new Error(`error in ${htmlNews}`);
            }
            metaPhoto.style.backgroundImage = `url(${item.urlToImage || 'img/news_placeholder.jpg'})`;
            newsMetaAuthor.textContent = item.author || item.source.name;
            newsMetaDate.textContent = item.publishedAt.slice(0, 10).split('-').reverse().join('-');
            processDesc(newsDescTitle).textContent = item.title;
            processDesc(newsDescContent).textContent = item.source.name;
            processDesc(newsReadMore).textContent = item.description;
            newsReadMore.setAttribute('href', item.url);
            fragment.append(newsClone);
        });
        htmlNews.innerHTML = '';
        htmlNews.appendChild(fragment);
    }
}

export default News;
