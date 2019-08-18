import axios from 'axios';
import { chave, proxy } from '../config';

export default class Busca {
    constructor(query) {
        this.query = query;
    }

    async getResultadoBusca() {        
        try {
            const resultado = await axios(`${proxy}https://www.food2fork.com/api/search?key=${chave}&q=${this.query}`);
            this.resultado = resultado.data.recipes;
            
        } catch (error) {
            alert(error);
        }
    }
}
