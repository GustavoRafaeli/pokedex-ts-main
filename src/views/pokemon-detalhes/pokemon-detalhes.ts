import { PokemonService } from "../../services/pokemon.service";
import { Pokemon } from "../../models/pokemon";
import "./pokemon-detalhes.css";

class PokemonDetalhes {
  formPrincipal: HTMLFormElement;
  txtPesquisa: HTMLInputElement;
  btnVoltar: HTMLButtonElement;

  pnlConteudo: HTMLDivElement;

  private pokemonService: PokemonService;

  constructor() {
    this.pokemonService = new PokemonService();

    this.registrarElementos();
    this.registrarEventos();

    const url = new URLSearchParams(window.location.search);

    const nome = url.get("nome") as string;

    this.pesquisarPokemonPorNome(nome);
  }

  private pesquisarPokemonPorNome(nome: string): void {
    this.pokemonService
      .selecionarPokemonPorNome(nome)
      .then((poke) => this.gerarCard(poke))
      .catch((erro: Error) => this.exibirNotificacao(erro));
  }

  registrarElementos(): void {
    this.formPrincipal = document.getElementById(
      "formPrincipal"
    ) as HTMLFormElement;
    this.txtPesquisa = document.getElementById(
      "txtPesquisa"
    ) as HTMLInputElement;
    this.btnVoltar = document.getElementById("btnVoltar") as HTMLButtonElement;
    this.pnlConteudo = document.getElementById("pnlConteudo") as HTMLDivElement;
  }

  registrarEventos(): void {
    this.formPrincipal.addEventListener("submit", (e) => this.buscar(e));

    this.btnVoltar.addEventListener(
      "click",
      () => (window.location.href = "index.html")
    );
  }

  buscar(sender: Event): void {
    sender.preventDefault();

    this.limparCard();

    if (!this.txtPesquisa?.value) return;

    this.pesquisarPokemonPorNome(this.txtPesquisa.value);
    this.txtPesquisa.value = "";
  }

  limparCard() {
    this.pnlConteudo.querySelector(".card-pokemon")?.remove();
  }

  private gerarCard(pokemon: Pokemon): void {
    const id = document.createElement("p");
    const imagem = document.createElement("img");
    const nomePokemon = document.createElement("p");

    id.textContent = pokemon.id.toString();

    if (pokemon.spriteUrl) imagem.src = pokemon.spriteUrl;

    nomePokemon.innerHTML = pokemon.nome;

    const pnlPokemon = document.createElement("div");
    pnlPokemon.classList.add("card-pokemon");

    pnlPokemon.hidden = false;
    pnlPokemon.appendChild(id);
    pnlPokemon.appendChild(imagem);
    pnlPokemon.appendChild(nomePokemon);

    this.pnlConteudo.appendChild(pnlPokemon);
  }

  private exibirNotificacao(err: Error, segundosTimeout: number = 5): void {
    const divNotificacao = this.gerarNotificacao(err.message);

    document.body.appendChild(divNotificacao);

    setTimeout(() => divNotificacao.remove(), segundosTimeout * 1000);
  }

  private gerarNotificacao(mensagem: string): HTMLDivElement {
    const divNotificacao = document.createElement("div");

    divNotificacao.textContent = mensagem;
    divNotificacao.classList.add("notificacao");

    divNotificacao.addEventListener("click", (sender) =>
      (sender.target as HTMLElement).remove()
    );

    return divNotificacao;
  }
}

window.addEventListener("load", () => new PokemonDetalhes());
