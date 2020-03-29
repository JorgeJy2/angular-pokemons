import { Component, OnInit, Inject } from '@angular/core';
import { MatBottomSheetRef, MAT_BOTTOM_SHEET_DATA } from '@angular/material/bottom-sheet';
import { Pokemon } from 'src/app/models/Pokemon.model';
import { PokemonsService } from 'src/app/services/pokemons.service';
import { Specie } from 'src/app/models/PokemonSpecie.model';
import { PokemonDetail } from 'src/app/models/Pokemon.detail';

@Component({
  selector: 'app-detail-pokemon',
  templateUrl: './detail-pokemon.component.html',
  styleUrls: ['./detail-pokemon.component.scss']
})
export class DetailPokemonComponent implements OnInit {

  public pokemon: Pokemon;
  public detailPokemon: PokemonDetail;
  public specie: Specie;

  constructor(
    private pokemonsService: PokemonsService,
    private bottomSheetRef: MatBottomSheetRef<DetailPokemonComponent>,
    @Inject(MAT_BOTTOM_SHEET_DATA) public data: any) {
    this.pokemon = data.pokemon;
    this.detailPokemon = data.detailPokemon;
    this.specie = data.specie;
  }

  ngOnInit() {
  }

  public openLink(event: MouseEvent): void {
    this.bottomSheetRef.dismiss();
    event.preventDefault();
  }
}
