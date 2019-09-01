import { camposDOM } from './base';
import { corrigeTitulosDasReceitas } from './buscaView';

export const mudaImagemBtnFavorito = isFavorito => {
    const stringClasseIcone = isFavorito ? 'icon-heart' : 'icon-heart-outlined';
    document.querySelector('.recipe__love use').setAttribute('href', `img/icons.svg#${stringClasseIcone}`);
};

export const mudaImagemMenuFavorito = totalFavoritos => {
    camposDOM.menuFavoritos.style.visibility = totalFavoritos > 0 ? 'visible' : 'hidden';
};

export const carregaFavoritoNaLista = favorito => {
    const carregaItemHTML = `
        <li>
            <a class="likes__link" href="#${favorito.id}">
                <figure class="likes__fig">
                    <img src="${favorito.img}" alt="${favorito.titulo}">
                </figure>
                <div class="likes__data">
                    <h4 class="likes__name">${corrigeTitulosDasReceitas(favorito.titulo)}</h4>
                    <p class="likes__author">${favorito.autor}</p>
                </div>
            </a>
        </li>
    `;
    camposDOM.listaMenuFavoritos.insertAdjacentHTML('beforeend', carregaItemHTML);
};

export const deletaItemLista = id => {
    const item = document.querySelector(`.likes__link[href="#${id}"]`).parentElement;

    if (item) item.parentElement.removeChild(item);
};