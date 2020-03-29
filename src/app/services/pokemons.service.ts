import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Pokemon, ResponsePokemons } from '../models/Pokemon.model';
import { Specie } from '../models/PokemonSpecie.model';
import { PokemonDetail } from '../models/Pokemon.detail';

const POKEMON_API = 'https://pokeapi.co/api/v2/';
const POKEMONS = 'pokemon/';
const URL_IMG = 'https://assets.pokemon.com/assets/cms2/img/pokedex/detail/';
const DETAIL_IMG = 'https://pokeres.bastionbot.org/images/pokemon/';
// const URL_IMG = 'https://assets.pokemon.com/assets/cms2/img/pokedex/detail/';
// https://assets.pokemon.com/assets/cms2/img/pokedex/full/001.png
const POKEMON = 'pokemon/';
const SPECIES = 'pokemon-species/'

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
        .get(`${POKEMON_API}${POKEMONS}?offset=${offset}&limit=${limit}`).subscribe(
          (pokemonsResponse: ResponsePokemons) => {
            pokemonsResponse.results.forEach(pokemon => {
              const splitUr = pokemon.url.split('/');
              const positionPokemon = splitUr[splitUr.length - 2];
              pokemon.imageUrl = positionPokemon.length == 1 ? `00${positionPokemon}` : `0${positionPokemon}`;
              pokemon.imageUrl = `${URL_IMG}${pokemon.imageUrl}.png`
              pokemon.detailImmageUrl = `${DETAIL_IMG}${positionPokemon}.png`;
              pokemon.backgroundColor = `background-color-${this.getRandomNumber(limit)}`;
            });
            resolve(pokemonsResponse.results);
          },
          error => reject(error)
        );
    });
  }

  public getPokemon(namePokemon: string): Promise<PokemonDetail> {
    return new Promise((resolve, reject) => {
      this.http.get(`${POKEMON_API}${POKEMON}${namePokemon}`).subscribe((response: any) => {
        const pokemonDetail: PokemonDetail = new PokemonDetail();
        pokemonDetail.height  = response.height / 10;
        pokemonDetail.weigth  = response.weight / 10;
        pokemonDetail.spritesImagesUrl = response.sprites;
        resolve(pokemonDetail);
      }, reject);
    });
  }


  public getSpecie(namePokemon: string): Promise<Specie> {
    return new Promise((resolve, reject) => {
      this.http.get(`${POKEMON_API}${SPECIES}${namePokemon}`).subscribe((response: any) => {
        const specie: Specie = new Specie();
        for (const flavor_text_entrie of response.flavor_text_entries) {
          if (flavor_text_entrie.language.name == 'es') {
            specie.description = flavor_text_entrie.flavor_text;
            break;
          }
        }
        for (const genus of response.genera) {
          if (genus.language.name == 'es') {
            specie.genus = genus.genus;
            break;
          }
        }
        resolve(specie);
      }, reject);
    });
  }
}
