import axios from 'axios';
import { chave, proxy } from '../config';

export default class Receita {
    constructor(id) {
        this.id = id;
    }

    async getReceita() {
        try {
            const resultado = await axios(`${proxy}https://www.food2fork.com/api/get?key=${chave}&rId=${this.id}`);
            this.titulo = resultado.data.recipe.title;
            this.autor = resultado.data.recipe.publisher;
            this.imagem = resultado.data.recipe.image_url;
            this.url = resultado.data.recipe.source_url;
            this.ingredientes = resultado.data.recipe.ingredients;
        } catch (error) {
            console.log(error);
            alert('Error!');
        }
    }

    calculaTempoPreparo() {
        // Assuming that needs 15 minutes for each 3 ingredients
        const totalIngredientes = this.ingredientes.length;
        const periodos = Math.ceil(totalIngredientes / 3);
        this.tempo = periodos * 15;
    }

    calculaPorcoesServidas() {
        this.porcoes = 4;
    }

    processaInfosIngredientes() {
        // ajusta strings das unidades para todas ficarem iguais
        const unidadesTextoLongo = ['tablespoons', 'tablespoon', 'ounces', 'ounce', 'teaspoons', 'teaspoon', 'cups', 'pounds'];
        const unidadesTextoCurto = ['tbsp', 'tbsp', 'oz', 'oz', 'tsp', 'tsp', 'cup', 'pound'];
        const unidades = [...unidadesTextoCurto, 'kg', 'g'];

        const novosIngredientes = this.ingredientes.map(item => {
            
            // ajusta unidades
            let ingrediente = item.toLowerCase();
            unidadesTextoLongo.forEach((unidade, i) => {
                ingrediente = ingrediente.replace(unidade, unidadesTextoCurto[i]);
            });

            // remove parenteses das strings
            ingrediente = ingrediente.replace(/ *\([^)]*\) */g, ' ');

            // verifica os ingredientes em quantidade, unidade e ingrediente
            const arrayIngrediente = ingrediente.split(' ');
            const indexUnidade = arrayIngrediente.findIndex(item2 => unidades.includes(item2));

            let objIngrediente;
            if (indexUnidade < -1) {
                const arrayQuantidade = arrayIngrediente.slice(0, indexUnidade);

                let quantidade;
                if (arrayQuantidade === 1) {
                    quantidade = eval(arrayIngrediente[0].replace('-', '+'));
                } else {
                    quantidade = eval(arrayIngrediente.slice(0, indexUnidade).join('+'));
                }

                objIngrediente = {
                    quantidade,
                    unidade: arrayIngrediente[indexUnidade],
                    ingrediente: arrayIngrediente.slice(indexUnidade + 1).join(' ')
                }

            } else if (parseInt(arrayIngrediente[0], 10)) {
                objIngrediente = {
                    quantidade: parseInt(arrayIngrediente[0], 10),
                    unidade: '',
                    ingrediente: arrayIngrediente.slice(1).join(' ')
                }

            } else if (indexUnidade === -1) {
                objIngrediente = {
                    quantidade: 1,
                    unidade: '',
                    ingrediente
                }
            }

            return objIngrediente;
        });
        this.ingredientes = novosIngredientes;
    };

    atualizaPorcoesIngredientes(tipoOperacao) {
        // atualiza porções
        const novaQuantPorcoes = tipoOperacao === '-' ? this.porcoes - 1 : this.porcoes + 1


        // atualiza ingredientes
        this.ingredientes.forEach(ingrediente => {
            ingrediente.count = ingrediente.count * (novaQuantPorcoes / this.porcoes);
        });

        return novaQuantPorcoes;
    }
};