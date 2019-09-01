import { camposDOM } from './base';
import { Fraction } from 'fractional';

export const limpaReceita = () => {
    camposDOM.receita.innerHTML = '';
};

const formataQuantidade = quantidade => {
    if (quantidade) {
        // quantidade = 2.5 --> 2 1/2
        // quantidade = 0.5 --> 1/2
        const [inteiro, decimal] = quantidade.toString().split('.').map(item => parseInt(item, 10));

        if (!decimal) return inteiro;

        if (inteiro === 0) {
            const fracao = new Fraction(quantidade);
            return `${fracao.numerator}/${fracao.denominator}`;
        } else {
            const fracao = new Fraction(quantidade - inteiro);
            return `${inteiro} ${fracao.numerator}/${fracao.denominator}`;
        }
    }
    return '?';
};

const criaIngrediente = ingrediente => `
    <li class="recipe__item">
        <svg class="recipe__icon">
            <use href="img/icons.svg#icon-check"></use>
        </svg>

        <div class="recipe__count">${formataQuantidade(ingrediente.quantidade)}</div>

        <div class="recipe__ingredient">
            <span class="recipe__unit">${ingrediente.unidade}</span>
            ${ingrediente.ingrediente}
        </div>
    </li>
`;

export const renderizaReceita = (receita, isFavorito) => {
    const carregaHTML = `
        <figure class="recipe__fig">
            <img src="${receita.imagem}" alt="${receita.titulo}" class="recipe__img">
            <h1 class="recipe__title">
                <span>${receita.titulo}</span>
            </h1>
        </figure>
        
        <div class="recipe__details">
            <div class="recipe__info">
                <svg class="recipe__info-icon">
                    <use href="img/icons.svg#icon-stopwatch"></use>
                </svg>
                <span class="recipe__info-data recipe__info-data--minutes">${receita.tempo}</span>
                <span class="recipe__info-text"> minutes</span>
            </div>

            <div class="recipe__info">
                <svg class="recipe__info-icon">
                    <use href="img/icons.svg#icon-man"></use>
                </svg>
                <span class="recipe__info-data recipe__info-data--people">${receita.porcoes}</span>
                <span class="recipe__info-text"> servings</span>

                <div class="recipe__info-buttons">
                    <button class="btn-tiny btn-decrease">
                        <svg>
                            <use href="img/icons.svg#icon-circle-with-minus"></use>
                        </svg>
                    </button>
                    <button class="btn-tiny btn-increase">
                        <svg>
                            <use href="img/icons.svg#icon-circle-with-plus"></use>
                        </svg>
                    </button>
                </div>

            </div>
            <button class="recipe__love">
                <svg class="header__likes">
                    <use href="img/icons.svg#icon-heart${isFavorito ? '' : '-outlined'}"></use>
                </svg>
            </button>
        </div>



        <div class="recipe__ingredients">
            <ul class="recipe__ingredient-list">
                ${receita.ingredientes.map(item => criaIngrediente(item)).join('')}
            </ul>

            <button class="btn-small recipe__btn recipe__btn--add">
                <svg class="search__icon">
                    <use href="img/icons.svg#icon-shopping-cart"></use>
                </svg>
                <span>Add to shopping list</span>
            </button>
        </div>

        <div class="recipe__directions">
            <h2 class="heading-2">How to cook it</h2>
            <p class="recipe__directions-text">
                This recipe was carefully designed and tested by
                <span class="recipe__by">${receita.autor}</span>. Please check out directions at their website.
            </p>
            <a class="btn-small recipe__btn" href="${receita.url}" target="_blank">
                <span>Directions</span>
                <svg class="search__icon">
                    <use href="img/icons.svg#icon-triangle-right"></use>
                </svg>

            </a>
        </div>
    `;

    camposDOM.receita.insertAdjacentHTML('afterbegin', carregaHTML);
};


export const atualizaPorcoesEIngredientesUI = receita => {
    document.querySelector('.recipe__info-data--people').textContent = receita.porcoes;

    const itemQuantidade = Array.from(document.querySelectorAll('.recipe__count'));
    itemQuantidade.forEach((item, i) => {
        item.textContent = formataQuantidade(receita.ingredientes[i].quantidade);
    });
};
