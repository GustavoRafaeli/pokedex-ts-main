import { PokemonService } from "../../services/pokemon.service";
import "./pokemon-detalhes.css";
class PokemonDetalhes {
    constructor() {
        this.pokemonService = new PokemonService();
        this.registrarElementos();
        this.registrarEventos();
        const url = new URLSearchParams(window.location.search);
        const nome = url.get("nome");
        this.pesquisarPokemonPorNome(nome);
    }
    pesquisarPokemonPorNome(nome) {
        this.pokemonService
            .selecionarPokemonPorNome(nome)
            .then((poke) => this.gerarCard(poke))
            .catch((erro) => this.exibirNotificacao(erro));
    }
    registrarElementos() {
        this.formPrincipal = document.getElementById("formPrincipal");
        this.txtPesquisa = document.getElementById("txtPesquisa");
        this.btnVoltar = document.getElementById("btnVoltar");
        this.pnlConteudo = document.getElementById("pnlConteudo");
    }
    registrarEventos() {
        this.formPrincipal.addEventListener("submit", (e) => this.buscar(e));
        this.btnVoltar.addEventListener("click", () => (window.location.href = "index.html"));
    }
    buscar(sender) {
        var _a;
        sender.preventDefault();
        this.limparCard();
        if (!((_a = this.txtPesquisa) === null || _a === void 0 ? void 0 : _a.value))
            return;
        this.pesquisarPokemonPorNome(this.txtPesquisa.value);
        this.txtPesquisa.value = "";
    }
    limparCard() {
        var _a;
        (_a = this.pnlConteudo.querySelector(".card-pokemon")) === null || _a === void 0 ? void 0 : _a.remove();
    }
    gerarCard(pokemon) {
        const id = document.createElement("p");
        const imagem = document.createElement("img");
        const nomePokemon = document.createElement("p");
        id.textContent = pokemon.id.toString();
        if (pokemon.spriteUrl)
            imagem.src = pokemon.spriteUrl;
        nomePokemon.innerHTML = pokemon.nome;
        const pnlPokemon = document.createElement("div");
        pnlPokemon.classList.add("card-pokemon");
        pnlPokemon.hidden = false;
        pnlPokemon.appendChild(id);
        pnlPokemon.appendChild(imagem);
        pnlPokemon.appendChild(nomePokemon);
        this.pnlConteudo.appendChild(pnlPokemon);
    }
    exibirNotificacao(err, segundosTimeout = 5) {
        const divNotificacao = this.gerarNotificacao(err.message);
        document.body.appendChild(divNotificacao);
        setTimeout(() => divNotificacao.remove(), segundosTimeout * 1000);
    }
    gerarNotificacao(mensagem) {
        const divNotificacao = document.createElement("div");
        divNotificacao.textContent = mensagem;
        divNotificacao.classList.add("notificacao");
        divNotificacao.addEventListener("click", (sender) => sender.target.remove());
        return divNotificacao;
    }
}
window.addEventListener("load", () => new PokemonDetalhes());
