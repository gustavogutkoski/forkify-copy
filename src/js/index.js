import Busca from './models/Busca';
import * as buscaView from './views/buscaView';
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
        
        // procura por receitas
        await state.busca.getResultadoBusca();

        // monta resultados na UI
        buscaView.carregaResultadosBusca(state.busca.resultado);
        buscaView.limpaInput();
        limpaLoader();

    }    
}

camposDOM.buscaForm.addEventListener('submit', evento => {
    evento.preventDefault();
    controllerBusca();
});