import { Component, OnInit } from '@angular/core';
import { Pokemon } from './models/Pokemon.model';
import { MatSnackBar } from '@angular/material/snack-bar';
import { PaginatorPokemonService } from './services/paginator-pokemon.service';
import { MatBottomSheet } from '@angular/material/bottom-sheet';
import { DetailPokemonComponent } from './components/detail-pokemon/detail-pokemon.component';
import { PokemonsService } from './services/pokemons.service';
import { PokemonDetail } from './models/Pokemon.detail';
import { Specie } from './models/PokemonSpecie.model';
import { NgxSpinnerService } from 'ngx-spinner';

const ANIMATION_LEFT = 'fadeInLeftBig';
const ANIMATION_RIGHT = 'fadeInRightBig';
const MESSAGE_NO_MORE_POKEMONS = 'No existen pokemones anteriores';
const MESSAGE_OK = 'Entiendo';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})


export class AppComponent implements OnInit {

  public pokemons: Pokemon[];
  public nameAnimation: string;

  constructor(
    private pokemonService: PokemonsService,
    private paginatorPokemon: PaginatorPokemonService,
    private spinner: NgxSpinnerService,
    private snackBar: MatSnackBar,
    private bottomSheet: MatBottomSheet) {

    this.pokemons = [];
    this.nameAnimation = ANIMATION_RIGHT;
  }

  ngOnInit(): void {
    this.getPokemons();
  }

  // VIEW
  public getNextPokemons(): void {
    this.getPokemons();
    this.nameAnimation = ANIMATION_RIGHT;
  }

  public getAftherPokemons(): void {
    if (!this.paginatorPokemon.hasBefore()) {
      this.showMessage(MESSAGE_NO_MORE_POKEMONS);
      return;
    }
    this.getBeforePokemons();
    this.nameAnimation = ANIMATION_LEFT;
  }

  // Messages
  private showMessage(message: string): void {
    this.snackBar.open(message, MESSAGE_OK, { duration: 2000 });
  }

  // API REST

  // Load in variable  the valuen LIMIT_POKEMON number
  private getPokemons(): void {
    this.paginatorPokemon.getNext().then(
      (response: Pokemon[]) => this.pokemons = response,
      error => this.showMessage(error)
    );
  }

  private getBeforePokemons(): void {
    this.paginatorPokemon.getBefore().then(
      (response: Pokemon[]) => this.pokemons = response,
      error => this.showMessage(error)
    );
  }

  public openBottomSheet(pokemon: Pokemon): void {
    this.spinner.show();
    this.pokemonService.getPokemon(pokemon.name).then((detailPokemon: PokemonDetail) => {
      this.pokemonService.getSpecie(pokemon.name).then((specie: Specie) => {
        this.spinner.hide();
        this.bottomSheet.open(DetailPokemonComponent, { data: { pokemon, detailPokemon, specie } });
      }, err => {
        this.spinner.hide();
        console.error(err);
      } );
    }, err => {
      this.spinner.hide();
      console.error(err);
    });
  }
}
