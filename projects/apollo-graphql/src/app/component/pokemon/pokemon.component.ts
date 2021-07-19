import { Component, Input, OnDestroy, OnInit } from '@angular/core';
import { WatchQueryFetchPolicy } from '@apollo/client/core';
import { QueryRef } from 'apollo-angular';
import { EmptyObject } from 'apollo-angular/types';
import { Subscription } from 'rxjs';
import { Pokemon, PokemonResponse } from '../../domain/pokemon';
import { GraphqlService } from '../../graphql.service';

@Component({
  selector: 'app-pokemon',
  templateUrl: './pokemon.component.html',
  styleUrls: ['./pokemon.component.scss'],
})
export class PokemonComponent implements OnInit, OnDestroy {
  pokemonList!: Pokemon[];
  currentPokemon!: Pokemon;
  page = 0;
  queryRef!: QueryRef<PokemonResponse, EmptyObject>;
  private subs: Subscription = new Subscription();
  loading = false;

  @Input() fetchPolicy?: WatchQueryFetchPolicy;
  @Input() useLoadMore: boolean = false;

  constructor(private service: GraphqlService) {}

  ngOnInit(): void {
    this.service.getPokemons().subscribe((r) => {
      this.pokemonList = r.data.pokemons;
      this.getPokemonDetail();
    });
  }

  previousPokemon() {
    if (this.page === 0) {
      return;
    }

    this.page--;
    this.getMoreData();
  }

  nextPokemon() {
    this.page++;
    this.getMoreData();
  }

  private get currentPokemonId(): string {
    return this.pokemonList[this.page].id;
  }

  private getMoreData() {
    if (this.useLoadMore) {
      this.fetchMore();
    } else {
      this.getPokemonDetail();
    }
  }

  private getPokemonDetail(): void {
    this.queryRef = this.service.getPokemonsById(
      this.currentPokemonId,
      this.fetchPolicy
    );
    this.subs.add(
      this.queryRef.valueChanges.subscribe((p) => {
        this.loading = p.loading;
        this.currentPokemon = p.data?.pokemon;
      })
    );
  }

  private fetchMore() {
    this.service.fetchMore(this.queryRef, this.currentPokemonId);
  }

  ngOnDestroy() {
    this.subs.unsubscribe();
    console.log('');
  }
}
