import uniqid from 'uniqid';

export default class ListaCompras {
    constructor() {
        this.itens = [];
    }

    adicionaItem(quantidade, unidade, ingrediente) {
        const item = {
            id: uniqid(),
            quantidade,
            unidade,
            ingrediente
        }
        this.itens.push(item);
        return item;
    }

    deletaItem(id) {
        const index = this.itens.findIndex(item => item.id === id);

        // ex. splice() => [2,4,8].splice(1, 2) = nova array [4, 8] e array original [2]
        // ex. slice()  => [2,4,8].slice(1 ,2) = 4 e array original [2,4,8]
        this.itens.splice(index, 1);
    }

    atualizaQuantidades(id, novaQuantidade) {
        this.itens.find(item => item.id === id).quantidade = novaQuantidade;
    }
};