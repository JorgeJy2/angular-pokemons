import { Injectable } from '@angular/core';
import { Pokemon } from '../models/Pokemon.model';
import { PokemonsService } from './pokemons.service';


const LIMIT_POKEMONS = 4;

@Injectable({
  providedIn: 'root'
})
export class PaginatorPokemonService {

  private pokemonPointer: number;
  private offset: number;
  private pokemons: Pokemon[];

  constructor(private pokemonsService: PokemonsService) {
    this.pokemons = [];
    this.pokemonPointer = 0;
    this.offset = 0;
  }

  // Service
  public getNext(): Promise<Pokemon[]> {
    if (((this.pokemonPointer * (LIMIT_POKEMONS)) < this.pokemons.length) && this.pokemons.length !== 0) {
      console.log('this pokemon load from memory');
      return new Promise((resolve, reject) => {
        try {
          let pokemonsLenght = this.pokemonPointer * LIMIT_POKEMONS;
          resolve(this.pokemons.slice(pokemonsLenght, pokemonsLenght + (LIMIT_POKEMONS)))
          this.pokemonPointer++;
        } catch (error) {
          reject(error);
        }
      });
    }

    console.log('try get  pokemon load from service');
    return new Promise((resolve, reject) => {
      this.pokemonsService.getAllPokemons(this.offset, LIMIT_POKEMONS)
        .then((pokemons: Pokemon[]) => {
          console.log('this pokemon load from service');
          this.pokemons.push(...pokemons);
          this.pokemonPointer++;
          this.offset += LIMIT_POKEMONS;
          resolve(pokemons);
        }).catch(error => {
          reject(error);
        });
    });
  }

  public hasBefore(): boolean {
    // Is more tha one besause one is on view and this no count.
    return (this.pokemonPointer > 1);
  }

  public getBefore(): Promise<Pokemon[]> {
    return new Promise((resolve, reject) => {
      let pokemonsLenght = this.pokemonPointer * LIMIT_POKEMONS;
      resolve(this.pokemons.slice(pokemonsLenght - (LIMIT_POKEMONS * 2), pokemonsLenght - LIMIT_POKEMONS));
      this.pokemonPointer--;
    });
  }
}
