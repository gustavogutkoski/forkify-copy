export default class Favoritos {
    constructor() {
        this.favoritos = [];
    }

    adicionaFavorito(id, titulo, autor, img) {
        const favorito = { id, titulo, autor, img }
        this.favoritos.push(favorito);

        this.persisteInfos();

        return favorito;
    };

    deletaFavorito(id) {
        const index = this.favoritos.findIndex(item => item.id === id);
        this.favoritos.splice(index, 1);

        this.persisteInfos();
    }

    isFavorito(id) {
        return this.favoritos.findIndex(item => item.id === id) !== -1;
    }

    getTotalFavoritos() {
        this.favoritos.length;
    }

    persisteInfos() {
        localStorage.setItem('favoritos', JSON.stringify(this.favoritos));
    }

    getStorage() {
        const storage = JSON.parse(localStorage.getItem('favoritos'));
        if (storage) this.favoritos = storage;
    }
}