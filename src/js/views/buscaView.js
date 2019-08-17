import { camposDOM, criaLoader } from './base';

export const getInput = () => camposDOM.buscaInput.value;

export const limpaInput = () => {
    camposDOM.buscaInput.value = '';
};

export const limpaResultados = () => {
    camposDOM.buscaListaResultados.innerHTML = '';
    camposDOM.buscaPaginasResultados.innerHTML = '';
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

/* Cria botão para paginação dos resultados a esquerda da pagina
 *  tipoBotao => 'prev' = pagina anterior / 'next' = próxima página
 */
const criaBotaoPaginacao = (paginaAtual, tipoBotao) => `
    <button class="btn-inline results__btn--${tipoBotao}" data-goto=${tipoBotao === 'prev' ? paginaAtual - 1 : paginaAtual + 1}>
        <span>Page ${tipoBotao === 'prev' ? paginaAtual - 1 : paginaAtual + 1}</span>
        <svg class="search__icon">
            <use href="img/icons.svg#icon-triangle-${tipoBotao === 'prev' ? 'left' : 'right'}"></use>
        </svg>        
    </button>
`;

const carregaBotoes = (paginaAtual, totalResultados, resultadosPorPagina) => {
    const totalPaginas = Math.ceil(totalResultados / resultadosPorPagina);

    let botaoPaginacao;
    if (paginaAtual === 1 && totalPaginas > 1) {
        botaoPaginacao = criaBotaoPaginacao(paginaAtual, 'next');
    } else if (paginaAtual < totalPaginas) {
        botaoPaginacao = `
            ${criaBotaoPaginacao(paginaAtual, 'prev')}
            ${criaBotaoPaginacao(paginaAtual, 'next')}
        `;
    } else if (paginaAtual === totalPaginas && totalPaginas > 1) {
        botaoPaginacao = criaBotaoPaginacao(paginaAtual, 'prev');
    };

    camposDOM.buscaPaginasResultados.insertAdjacentHTML('afterbegin', botaoPaginacao);
};

export const carregaResultadosBusca = (receitas, pagina = 1, resultadosPorPagina = 10) => {
    const inicio = (pagina - 1) * resultadosPorPagina;
    const final = pagina * resultadosPorPagina;

    receitas.slice(inicio, final).forEach(carregaReceita);

    carregaBotoes(pagina, receitas.length, resultadosPorPagina);
};