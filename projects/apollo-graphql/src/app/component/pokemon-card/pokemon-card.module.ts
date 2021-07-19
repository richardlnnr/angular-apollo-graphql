import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { PokemonCardComponent } from './pokemon-card.component';
import { MatCardModule } from '@angular/material/card';
import { MatButtonModule } from '@angular/material/button';

@NgModule({
  declarations: [PokemonCardComponent],
  imports: [CommonModule, MatCardModule, MatButtonModule],
  exports: [PokemonCardComponent],
})
export class PokemonCardModule {}
