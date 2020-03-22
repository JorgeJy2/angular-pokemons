import { Component, OnInit } from '@angular/core';
import { PokemonsService } from './services/pokemons.service';
import { ResponsePokemons } from './models/Pokemon.model';
import { MatSnackBar } from '@angular/material/snack-bar';

const LIMIT_POKEMONS = 10;

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})


export class AppComponent  implements OnInit{
  
  public responsePokemons: ResponsePokemons;
  private offSetPokemons = 0;

  constructor (private servicePokemon: PokemonsService,private _snackBar: MatSnackBar) {
    this.responsePokemons = new ResponsePokemons();
  }

  ngOnInit(): void {
    this.getPokemons( this.offSetPokemons,LIMIT_POKEMONS);
      this._snackBar.open('hola', 'entiendo', {
        duration: 2000,
      });
  }
  
  // VIEW
  public getNextPokemons() {
    this.offSetPokemons += LIMIT_POKEMONS;
    this.getPokemons(this.offSetPokemons, LIMIT_POKEMONS);
  }

  // API REST

  // Load in variable  the valuen LIMIT_POKEMON number 
  private getPokemons(offset: number, limit: number): void {
    this.servicePokemon.getAllPokemons(offset,limit).subscribe(
      (response: ResponsePokemons) => {
        this.responsePokemons = response;
        this.responsePokemons.results.forEach( pokemon => {
          let splitUr = pokemon.url.split('/');
          let positionPokemon = splitUr[ splitUr.length -2];
          pokemon.imageUrl = positionPokemon.length == 1 ?  `00${positionPokemon}` : `0${positionPokemon}`;
        });
      }
    );
  }
}
