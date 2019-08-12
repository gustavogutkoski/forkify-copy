import { camposDOM } from './base';

export const getInput = () => camposDOM.buscaInput.value;

export const limpaInput = () => {
    camposDOM.buscaInput.value = '';
};

export const limpaResultados = () => {
    camposDOM.buscaListaResultados.innerHTML = '';
};

const carregaReceita = receita => {
    const insereItemHTML = `
    <li>
        <a class="results__link" href="${receita.recipe_id}">
            <figure class="results__fig">
                <img src="${receita.image_url}" alt="${receita.title}">
            </figure>
            <div class="results__data">
                <h4 class="results__name">${receita.title}</h4>
                <p class="results__author">${receita.publisher}</p>
            </div>
        </a>
    </li>
    `;
    camposDOM.buscaListaResultados.insertAdjacentHTML('beforeend', insereItemHTML);
};

export const carregaResultadosBusca = receitas => {
    receitas.forEach(carregaReceita);
}