export const camposDOM = {
    buscaForm: document.querySelector('.search'),
    buscaInput: document.querySelector('.search__field'),
    buscaResultados: document.querySelector('.results'),
    buscaListaResultados: document.querySelector('.results__list'),
    buscaPaginasResultados: document.querySelector('.results__pages'),
    receita: document.querySelector('.recipe'),
    listaCompras: document.querySelector('.shopping__list')
};

export const camposDOMString = {
    loader: 'loader'
};

export const criaLoader = parentClass => {
    const loader = `
        <div class="${camposDOMString.loader}">
            <svg>
                <use href="img/icons.svg#icon-cw"></use>
            </svg>
        </div>
    `;
    parentClass.insertAdjacentHTML('afterbegin', loader);
};

export const limpaLoader = () => {
    const loader = document.querySelector(`.${camposDOMString.loader}`);

    if (loader) {
        loader.parentElement.removeChild(loader);
    }
}