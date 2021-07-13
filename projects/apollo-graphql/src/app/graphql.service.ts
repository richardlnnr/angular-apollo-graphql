import { Injectable } from '@angular/core';
import { ApolloQueryResult, FetchPolicy, WatchQueryFetchPolicy } from '@apollo/client/core';
import { Apollo, gql, QueryRef } from 'apollo-angular';
import { EmptyObject } from 'apollo-angular/types';
import { Observable } from 'rxjs';
import { PokemonListResponse, PokemonResponse } from './domain/pokemon';

@Injectable({
  providedIn: 'root',
})
export class GraphqlService {
  private pokemonByIdQuery = gql`
    query pokemon($id: String) {
      pokemon(id: $id) {
        id
        number
        name
        classification
        types
        resistant
        weaknesses
        fleeRate
        maxCP
        maxHP
        image
      }
    }
  `;

  constructor(private apollo: Apollo) {}

  getPokemons(): Observable<ApolloQueryResult<PokemonListResponse>> {
    return this.apollo.query<PokemonListResponse>({
      query: gql`
        query pokemons {
          pokemons(first: 30) {
            id
            name
          }
        }
      `,
    });
  }

  getPokemonsByIdQuery(
    id: string,
    fetchPolicy: FetchPolicy = 'cache-first'
  ): Observable<ApolloQueryResult<PokemonResponse>> {
    return this.apollo.query<PokemonResponse>({
      query: this.pokemonByIdQuery,
      variables: {
        id,
      },
      fetchPolicy
    });
  }

  getPokemonsByIdWatchQuery(
    id: string,
    fetchPolicy: WatchQueryFetchPolicy = 'cache-first'
  ): QueryRef<PokemonResponse, EmptyObject> {
    return this.apollo.watchQuery<PokemonResponse>({
      query: this.pokemonByIdQuery,
      variables: {
        id,
      },
      fetchPolicy
    });
  }

  fetchMore(pokemonByIdQuery: QueryRef<PokemonResponse, EmptyObject>, id: string) {
    pokemonByIdQuery.fetchMore({
        variables: {
          id
        },
        updateQuery: (prev, { fetchMoreResult }) => {
            if (!fetchMoreResult) {
                return prev;
            }
            return {
              pokemon: fetchMoreResult.pokemon,
            };
        },
    });
}

}
