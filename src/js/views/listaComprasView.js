import { camposDOM } from './base';

export const carregaItemHTML = item => {
    const itemHTML = `
        <li class="shopping__item" data-itemid=${item.id}>
            <div class="shopping__count">
                <input type="number" value="${item.quantidade}" step="${item.quantidade}" class="shopping__count-value">
                <p>${item.unidade}</p>
            </div>
            <p class="shopping__description">${item.ingrediente}</p>
            <button class="shopping__delete btn-tiny">
                <svg>
                    <use href="img/icons.svg#icon-circle-with-cross"></use>
                </svg>
            </button>
        </li>
    `;

    camposDOM.listaCompras.insertAdjacentHTML('beforeend', itemHTML);
};

export const deletaItemHTML = id => {
    const item = document.querySelector(`[data-itemid="${id}"]`);
    item.parentElement.removeChild(item);
};