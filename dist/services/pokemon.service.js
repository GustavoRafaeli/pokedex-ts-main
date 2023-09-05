export class PokemonService {
    selecionarPokemonPorNome(nome) {
        const url = `https://pokeapi.co/api/v2/pokemon/${nome}`;
        return fetch(url)
            .then((res) => this.processarResposta(res))
            .then((obj) => this.mapearPokemon(obj));
    }
    selecionarPokemons() {
        const url = `https://pokeapi.co/api/v2/pokemon/`;
        return fetch(url)
            .then((res) => this.processarResposta(res))
            .then((obj) => this.mapearListaPokemons(obj.results));
    }
    processarResposta(resposta) {
        if (resposta.ok)
            return resposta.json();
        throw new Error('Pokémon não encontrado!');
    }
    mapearPokemon(obj) {
        return {
            id: obj.id,
            nome: obj.name,
            spriteUrl: obj.sprites.front_default
        };
    }
    mapearListaPokemons(objetos) {
        const pokemons = objetos.map(obj => this.selecionarPokemonPorNome(obj.name));
        return Promise.all(pokemons);
    }
}
