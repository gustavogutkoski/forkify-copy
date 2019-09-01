export default class Favoritos {
    constructor() {
        this.favoritos = [];
    }

    adicionaFavorito(id, titulo, autor, img) {
        const favorito = { id, titulo, autor, img }
        this.favoritos.push(favorito);
        return favorito;
    };

    deletaFavorito(id) {
        const index = this.favoritos.findIndex(item => item.id === id);
        this.favoritos.splice(index, 1);
    }

    isFavorito(id) {
        return this.favoritos.findIndex(item => item.id === id) !== -1;
    }

    getTotalFavoritos() {
        this.favoritos.length;
    }
}