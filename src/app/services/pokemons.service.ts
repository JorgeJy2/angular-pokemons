import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Pokemon, ResponsePokemons } from '../models/Pokemon.model';

export const POKEMON_API = 'https://pokeapi.co/api/v2';

@Injectable({
  providedIn: 'root'
})
export class PokemonsService {

  constructor(private http: HttpClient) { }

  // LOGIC
  private getRandomNumber(limit: number): number {
    // Mach to lenght petition:  (LIMIT_POKEMONS - 1 )
    return Math.floor(Math.random() * ((limit - 1) - 0 + 1) + 0);
  }

  public getAllPokemons(offset: number, limit: number): Promise<Pokemon[]> {
    return new Promise((resolve, reject) => {
      this.http
        .get(`${POKEMON_API}/pokemon/?offset=${offset}&limit=${limit}`).subscribe(
          (pokemonsResponse: ResponsePokemons) => {
            console.log(pokemonsResponse);
            pokemonsResponse.results.forEach(pokemon => {
              let splitUr = pokemon.url.split('/');
              let positionPokemon = splitUr[splitUr.length - 2];
              pokemon.imageUrl = positionPokemon.length == 1 ? `00${positionPokemon}` : `0${positionPokemon}`;
              pokemon.imageUrl = `https://assets.pokemon.com/assets/cms2/img/pokedex/detail/${pokemon.imageUrl}.png`
              pokemon.backgroundColor = `background-color-${this.getRandomNumber(limit)}`;
            });
            resolve(pokemonsResponse.results);
          },
          error =>  reject(error)
        );
    });
  }
}
