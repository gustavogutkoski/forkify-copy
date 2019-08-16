import { camposDOM, criaLoader } from './base';

export const getInput = () => camposDOM.buscaInput.value;

export const limpaInput = () => {
    camposDOM.buscaInput.value = '';
};

export const limpaResultados = () => {
    camposDOM.buscaListaResultados.innerHTML = '';
};

/* Return the title of the recipe + '...' when the title is too long
 * Obs: It's set 17 on limiteMaxCaracter because it's the max lenght that can be write with this layout
 *
 * Ex.:
 * 'Pasta with garlic and oil'
 * 
 * inc: 0 / inc + atual.lenght = 5 / novoTitulo = ['Pasta']
 * inc: 5 / inc + atual.lenght = 9 / novoTitulo = ['Pasta', 'with']
 * inc: 14 / inc + atual.lenght = 20 / novoTitulo = ['Pasta', 'with']
 * inc: 20 / inc + atual.lenght = 23 / novoTitulo = ['Pasta', 'with']
 * inc: 23 / inc + atual.lenght = 26 / novoTitulo = ['Pasta', 'with']
 * 
 */
const corrigeTitulosDasReceitas = (titulo, limiteMaxCaracter = 17) => {
    const novoTitulo = [];

    if (titulo.length > limiteMaxCaracter) {
        titulo.split(' ').reduce((inc, atual) => {
            if (inc + atual.length <= limiteMaxCaracter) {
                novoTitulo.push(atual);
            }
            return inc + atual.length;
        }, 0);
    }

    return `${novoTitulo.join(' ')} ...`;
};

const carregaReceita = receita => {
    const insereItemHTML = `
    <li>
        <a class="results__link" href="${receita.recipe_id}">
            <figure class="results__fig">
                <img src="${receita.image_url}" alt="${receita.title}">
            </figure>
            <div class="results__data">
                <h4 class="results__name">${corrigeTitulosDasReceitas(receita.title)}</h4>
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