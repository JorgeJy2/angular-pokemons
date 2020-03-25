import { Component, OnInit } from '@angular/core';
import { Pokemon } from './models/Pokemon.model';
import { MatSnackBar } from '@angular/material/snack-bar';
import { PaginatorPokemonService } from './services/paginator-pokemon.service';

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

  constructor(private paginatorPokemon: PaginatorPokemonService, private _snackBar: MatSnackBar) {
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
    this._snackBar.open(message, MESSAGE_OK, { duration: 2000 });
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
}
