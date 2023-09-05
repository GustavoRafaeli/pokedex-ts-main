import { PokemonService } from '../../services/pokemon.service';
import './pokemon-listagem.css';
export class PokemonListagem {
    constructor() {
        this.pokemonService = new PokemonService();
        this.registrarElementos();
        this.registrarEventos();
        this.pokemonService.selecionarPokemons()
            .then(pokemons => this.gerarGridPokemons(pokemons));
    }
    gerarGridPokemons(pokemons) {
        const pnlGrid = document.createElement('div');
        pnlGrid.classList.add('grid-pokemons');
        for (let pokemon of pokemons) {
            const card = this.obterCard(pokemon);
            pnlGrid.appendChild(card);
        }
        this.pnlConteudo.appendChild(pnlGrid);
    }
    obterCard(pokemon) {
        const id = document.createElement("p");
        const imagem = document.createElement("img");
        const nomePokemon = document.createElement("p");
        id.textContent = pokemon.id.toString();
        nomePokemon.textContent = pokemon.nome;
        imagem.src = pokemon.spriteUrl;
        const cardPokemon = document.createElement('div');
        cardPokemon.classList.add('card-pokemon');
        cardPokemon.addEventListener('click', (sender) => {
            window.location.href = `pokemon-detalhes.html?nome=${pokemon.nome}`;
        });
        cardPokemon.appendChild(id);
        cardPokemon.appendChild(imagem);
        cardPokemon.appendChild(nomePokemon);
        return cardPokemon;
    }
    registrarElementos() {
        this.formPrincipal = document.getElementById("formPrincipal");
        this.txtPesquisa = document.getElementById("txtPesquisa");
        this.pnlConteudo = document.getElementById("pnlConteudo");
    }
    registrarEventos() {
        this.formPrincipal
            .addEventListener('submit', (sender) => this.buscar(sender));
    }
    buscar(sender) {
        sender.preventDefault();
        if (!this.txtPesquisa.value)
            return;
        const nome = this.txtPesquisa.value;
        this.txtPesquisa.value = '';
        this.pesquisarPokemonPorNome(nome);
    }
    pesquisarPokemonPorNome(nome) {
        this.pokemonService.selecionarPokemonPorNome(nome)
            .then(poke => this.redirecionarUsuario(poke.nome))
            .catch((erro) => this.exibirNotificacao(erro));
    }
    redirecionarUsuario(nome) {
        window.location.href = `pokemon-detalhes.html?nome=${nome}`;
    }
    exibirNotificacao(erro) {
        const divNotificacao = document.createElement('div');
        divNotificacao.textContent = erro.message;
        divNotificacao.classList.add('notificacao');
        divNotificacao
            .addEventListener('click', (sender) => {
            sender.target.remove();
        });
        document.body.appendChild(divNotificacao);
        setTimeout(() => {
            divNotificacao.remove();
        }, 5000);
    }
}
window.addEventListener('load', () => new PokemonListagem());
