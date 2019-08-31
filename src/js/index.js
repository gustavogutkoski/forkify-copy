import Busca from './models/Busca';
import Receita from './models/Receita';
import * as buscaView from './views/buscaView';
import * as receitaView from './views/receitaView';
import { camposDOM, criaLoader, limpaLoader } from './views/base';

/* States globais do app
 * - Busca obj
 * - Receita atual obj
 * - Lista de compras obj
 * - Receitas marcadas com like
 */

const state = {};

const controllerBusca = async () => {
    // pega query da view
    const query = buscaView.getInput();

    if (query) {
        // cria novo obj busca e adiciona no state
        state.busca = new Busca(query);

        // prepara UI para os resultados
        buscaView.limpaInput();
        buscaView.limpaResultados();
        criaLoader(camposDOM.buscaResultados);
        
        try {
            // procura por receitas
            await state.busca.getResultadoBusca();
    
            // monta resultados na UI
            limpaLoader();
            buscaView.carregaResultadosBusca(state.busca.resultado);            
        } catch (error) {
            alert('Something went wrong with the search!');
            limpaLoader();
        }

    }    
}

camposDOM.buscaForm.addEventListener('submit', evento => {
    evento.preventDefault();
    controllerBusca();
});

camposDOM.buscaPaginasResultados.addEventListener('click', evento => {
    const btn = evento.target.closest('.btn-inline');
    if (btn) {        
        const pagina = parseInt(btn.dataset.goto, 10);
        buscaView.limpaResultados();
        buscaView.carregaResultadosBusca(state.busca.resultado, pagina);
    }    
});

const controllerReceita = async () => {
    // pega ID da URL
    const id = window.location.hash.replace('#', '');

    if (id) {
        // prepara UI
        receitaView.limpaReceita();
        criaLoader(camposDOM.receita);

        // marca item selecionado na lista das receitas
        if (state.busca) {
            buscaView.marcaItemSelecionado(id);    
        }
        // cria novo obj Receita
        state.receita = new Receita(id);

        try {
            // recebe infos da receita e carrega os ingredientes
            await state.receita.getReceita();
            state.receita.processaInfosIngredientes();
    
            // calcula porções e tempo
            state.receita.calculaTempoPreparo();
            state.receita.calculaPorcoesServidas();
    
            // carrega receita pra UI
            limpaLoader();
            receitaView.renderizaReceita(state.receita);
        } catch (error) {
            alert('Error processing recipe!');
        }
    }
};

['hashchange', 'load'].forEach(evento => window.addEventListener(evento, controllerReceita));


camposDOM.receita.addEventListener('click', item => {
    if (item.target.matches('.btn-decrease', '.btn-decrease *')) {
        if (state.receita.porcoes > 1) {
            state.receita.atualizaPorcoesIngredientes('-');
        }
    } else if (item.target.matches('.btn-increase', '.btn-increase *')) {
        state.receita.atualizaPorcoesIngredientes('+');
        
    }
    receitaView.atualizaPorcoesEIngredientesUI(state.receita);
});