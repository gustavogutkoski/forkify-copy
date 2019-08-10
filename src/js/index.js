import Busca from './models/Busca';

/* States globais do app
 * - Busca obj
 * - Receita atual obj
 * - Lista de compras obj
 * - Receitas marcadas com like
 */

const state = {};

const controllerBusca = async () => {
    // pega query da view
    const query = 'pizza'; // implementar depois

    if (query) {
        // cria novo obj busca e adiciona no state
        state.busca = new Busca(query);

        // prepara UI para os resultados

        // procura por receitas
        await state.busca.getResultadoBusca();

        // monta resultados na UI
        console.log(state.busca.resultado);

    }    
}

document.querySelector('.search').addEventListener('submit', evento => {
    evento.preventDefault();
    controllerBusca();
});