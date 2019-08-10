import axios from 'axios';

export default class Busca {
    constructor(query) {
        this.query = query;
    }

    async getResultadoBusca() {
        const proxy = 'https://cors-anywhere.herokuapp.com/';
        const chave = 'ed4199fe5f8bb39b36c9b0820513b78b';
        
        try {
            const resultado = await axios(`${proxy}https://www.food2fork.com/api/search?key=${chave}&q=${this.query}`);
            this.resultado = resultado.data.recipes;

            // console.log(this.resultado);
        } catch (error) {
            alert(error);
        }
    }
}
