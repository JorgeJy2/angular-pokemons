import { Component, OnInit } from '@angular/core';
import { PokemonsService } from './services/pokemons.service';
import { ResponsePokemons } from './models/Pokemon.model';
import { MatSnackBar } from '@angular/material/snack-bar';

const LIMIT_POKEMONS = 4;
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

  public responsePokemons: ResponsePokemons;
  private offSetPokemons = 0;
  public nameAnimation: string;

  constructor(private servicePokemon: PokemonsService, private _snackBar: MatSnackBar) {
    this.responsePokemons = new ResponsePokemons();
    this.nameAnimation = ANIMATION_RIGHT;
  }

  ngOnInit(): void {
    this.getPokemons(this.offSetPokemons);
  }

  // VIEW
  public getNextPokemons(): void {
    this.getPokemons(this.offSetPokemons += LIMIT_POKEMONS);
    this.nameAnimation = ANIMATION_RIGHT;
  }

  public getAftherPokemons(): void {
    if (this.offSetPokemons <= 0) {
      this.showMessage(MESSAGE_NO_MORE_POKEMONS);
      return;
    }
    this.getPokemons(this.offSetPokemons -= LIMIT_POKEMONS);
    this.nameAnimation = ANIMATION_LEFT;
  }

  // Messages 
  private showMessage(message: string): void {
    this._snackBar.open(message, MESSAGE_OK, { duration: 2000 });
  }


  // LOGIC
  public getRandomNumber(): number {
    // Mach to leng petition (LIMIT_POKEMONS - 1 )
    return Math.floor(Math.random() * ((LIMIT_POKEMONS - 1 ) - 0 + 1) + 0);
  }

  // API REST

  // Load in variable  the valuen LIMIT_POKEMON number 
  private getPokemons(offset: number): void {
    this.servicePokemon.getAllPokemons(offset, LIMIT_POKEMONS).subscribe(
      (response: ResponsePokemons) => {
        this.responsePokemons = response;
        this.responsePokemons.results.forEach(pokemon => {
          let splitUr = pokemon.url.split('/');
          let positionPokemon = splitUr[splitUr.length - 2];
          pokemon.imageUrl = positionPokemon.length == 1 ? `00${positionPokemon}` : `0${positionPokemon}`;
          pokemon.imageUrl = `https://assets.pokemon.com/assets/cms2/img/pokedex/detail/${pokemon.imageUrl}.png`
        });
      }
    );
  }
}
