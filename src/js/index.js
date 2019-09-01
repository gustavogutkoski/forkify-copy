import Busca from './models/Busca';
import Receita from './models/Receita';
import ListaCompras from './models/ListaCompras';
import Favoritos from './models/Favoritos';
import * as buscaView from './views/buscaView';
import * as receitaView from './views/receitaView';
import * as listaComprasView from './views/listaComprasView';
import * as favoritosView from './views/favoritosView';
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
            receitaView.renderizaReceita(
                state.receita, 
                state.favoritos.isFavorito(id));
        } catch (error) {
            alert('Error processing recipe!');
        }
    }
};

['hashchange', 'load'].forEach(evento => window.addEventListener(evento, controllerReceita));

const controllerListaCompras = () => {
    // cria nova lista de compras se não existir nenhuma
    if (!state.listaCompras) state.listaCompras = new ListaCompras();

    // adiciona cada ingrediente na lista e UI
    state.receita.ingredientes.forEach(item => {
        const itemLista = state.lista.adicionaItem(item.quantidade, item.unidade, item.ingrediente);
        listaComprasView.carregaItemHTML(itemLista);
    });
};

const controllerFavoritos = () => {
    // cria nova lista de favoritos se não existir nenhuma
    if (!state.favoritos) state.favoritos = new Favoritos();

    const id = state.receita.id;

    // testa se existe na lista de favoritos
    if (!state.favoritos.isFavorito(id)) {
        // adiciona no state.favoritos
        const novoFavorito = state.favoritos.adicionaFavorito(
            id,
            state.receita.titulo,
            state.receita.autor,
            state.receita.imagem
        );
        // altera img do botão de favorito
            favoritosView.mudaImagemBtnFavorito(true);
        // adiciona favorito na UI
        favoritosView.carregaFavoritoNaLista(novoFavorito);

    } else {
        // remove do state.favoritos
        state.favoritos.deletaFavorito(id);
        // altera img do botão de favorito
        favoritosView.mudaImagemBtnFavorito(false);
        // remove favorito na UI
        favoritosView.deletaItemLista(id);
    }
    favoritosView.mudaImagemMenuFavorito(state.favoritos.getTotalFavoritos());
};

// eventos para adicionar ou remover itens da lista de compras
camposDOM.listaCompras.addEventListener('click', item => {
    const id = item.target.closest('.shopping__list').dataset.itemid;

    if (item.target.matches('.shopping__delete', '.shopping__delete *')) {
        // remove do state
        state.listaCompras.deletaItem(id);

        // remove da UI
        listaComprasView.deletaItemHTML(id);

    // atualiza valores da lista de compras
    } else if (item.target.matches('.shopping__count-value')) {
        const valorInput = parseFloat(item.target.value, 10);
        state.listaCompras.atualizaQuantidades(id, valorInput);
    }
});


// eventos para aumentar ou diminuir porções da receita
camposDOM.receita.addEventListener('click', item => {
    if (item.target.matches('.btn-decrease', '.btn-decrease *')) {
        if (state.receita.porcoes > 1) {
            state.receita.atualizaPorcoesIngredientes('-');
            receitaView.atualizaPorcoesEIngredientesUI(state.receita);
        }
    } else if (item.target.matches('.btn-increase', '.btn-increase *')) {
        state.receita.atualizaPorcoesIngredientes('+');
        receitaView.atualizaPorcoesEIngredientesUI(state.receita);
        
    } else if (item.target.matches('.recipe__btn--add', '.recipe__btn--add *')) {
        controllerListaCompras();
    } else if (item.target.matches('.recipe__love, .recipe__love *')) {
        controllerFavoritos();
    }
});

