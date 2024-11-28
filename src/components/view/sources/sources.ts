import './sources.css';
import { checkForNull, INewsSources } from '../../../types/index';

class Sources {
    draw(data: Array<INewsSources>): void {
        const fragment: DocumentFragment = document.createDocumentFragment();
        const sourceItemTemp: HTMLTemplateElement | null = document.querySelector('#sourceItemTemp');
        const allSouces: HTMLDivElement | null = document.querySelector('.sources');
        if (sourceItemTemp === null) {
            throw new Error('Error');
        }
        data.forEach((item: INewsSources) => {
            const sourceClone: Node = sourceItemTemp.content.cloneNode(true);
            if (!(sourceClone instanceof DocumentFragment)) {
                throw new Error('error');
            }
            const sourceItemName: HTMLSpanElement | null = sourceClone.querySelector('.source__item-name');
            const sourcesItem: HTMLDivElement | null = sourceClone.querySelector('.source__item');
            checkForNull(sourceItemName).textContent = item.name;
            checkForNull(sourcesItem).setAttribute('data-source-id', item.id);
            fragment.append(sourceClone);
        });
        checkForNull(allSouces).append(fragment);
    }
}

export default Sources;
