import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { PokemonComponent } from './pokemon.component';
import { PokemonCardModule } from '../pokemon-card/pokemon-card.module';
import {MatProgressSpinnerModule} from '@angular/material/progress-spinner';


@NgModule({
  declarations: [
    PokemonComponent
  ],
  imports: [
    CommonModule,
    PokemonCardModule,
    MatProgressSpinnerModule
  ],
  exports: [
    PokemonComponent
  ]
})
export class PokemonModule { }
