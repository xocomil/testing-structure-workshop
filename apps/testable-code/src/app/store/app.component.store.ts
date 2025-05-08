// From Michael Small https://gist.github.com/msmallest/c3f4956041a789e3eabff46e97058539

import { computed, inject } from '@angular/core';
import {
  patchState,
  signalStore,
  withComputed,
  withHooks,
  withMethods,
  withProps,
  withState,
} from '@ngrx/signals';
import { rxMethod } from '@ngrx/signals/rxjs-interop';
import { pipe, tap } from 'rxjs';
import {
  emptyTmntCharacter,
  TMNTCharacter,
} from '../models/tmnt-character.model';
import { TMNTService } from '../services/tmnt.service';

type StoreState = {
  allCharacters: TMNTCharacter[];
  topCharacters: TMNTCharacter[];
  selectedCharacter: TMNTCharacter;
};

const initialState = (): StoreState => ({
  allCharacters: [],
  topCharacters: [],
  selectedCharacter: emptyTmntCharacter(),
});

// Link to this for later once you remove this block: https://gist.github.com/msmallest/c3f4956041a789e3eabff46e97058539
/**
 * @description Primer:
 * - Overview:
 *     - For all types of state, local or global. Direct descendent of Component Store.
 *         - Either `{providedIn: 'root'}` or a component's `providers: [Store]`
 *     - All signals become a "deep signal" aka you can drill down to any subproperty as a signal
 *     - (`_`) prefix for private properties (this is actually enforced)
 *     - Various methods like `withProps/withComputed/withMethods/withHooks` build in and custom features from us/libraries
 *         - Built-ins below
 *         - Try to keep things of a certain type all in the same block. Aka if possible all methods in one `withMethods` etc.
 *         - Import custom store features of our own or from libraries, like ngrx-toolkit https://ngrx-toolkit.angulararchitects.io/docs/extensions (withDevtools(), withCallState(), withStorageSync())
 * - withProps()
 *     - DI/observables/static properties/etc
 *     - https://ngrx.io/guide/signals/signal-store/custom-store-properties#custom-store-properties
 * - withComputed()
 *     - https://ngrx.io/guide/signals/signal-store#defining-store-properties
 * - withMethods()
 *     - 3 types of methods
 *         - Pure TS
 *         - rxMethod (like comp store's `this.effect`, we use for HTTP/async https://ngrx.io/guide/signals/rxjs-integration)
 *         - signalMethod (simpler, non-RXJS `rxMethod` https://ngrx.io/guide/signals/signal-method)
 *     - Patch the state with `patchState()`
 *         - `patchState(store, { isLoading: true })`
 *         - `patchState(store, { books, isLoading: false })`
 *         - `patchState(store, (state) => ({ filter: { ...state.filter, query } }));`
 *         - `patchState(store, ({ books }) => ({ books: [...books, book] }))`
 *     - https://ngrx.io/guide/signals/signal-store#defining-store-methods
 * - withHooks()
 *     - Side effects, with `onInit()` and/or `onDestroy()`
 *     - https://ngrx.io/guide/signals/signal-store/lifecycle-hooks#lifecycle-hooks
 *     - `watchState` inside hook if you need fully synchronous tracking of state changes https://ngrx.io/guide/signals/signal-store/state-tracking#using-watchstate
 */
export const AppStore = signalStore(
  // either provide in component's `providers` or use `{providedIn: 'root'}`
  withState(initialState()),
  withProps((store) => {
    return {};
  }),
  withComputed((store) => {
    return {
      characterSelected: computed(() => {
        return store.selectedCharacter().id > 0;
      }),
    };
  }),
  withMethods((store) => {
    return {
      _loadAllCharacters: rxMethod<TMNTCharacter[]>(
        pipe(
          tap((response) => {
            patchState(store, { allCharacters: response });
          }),
        ),
      ),
      _loadTopCharacters: rxMethod<TMNTCharacter[]>(
        pipe(
          tap((response) => {
            patchState(store, { topCharacters: response });
          }),
        ),
      ),
      deselectCharacter() {
        patchState(store, { selectedCharacter: emptyTmntCharacter() });
      },
      selectCharacter(character: TMNTCharacter) {
        patchState(store, { selectedCharacter: character });
      },
    };
  }),
  withHooks((store) => {
    const tmntService = inject(TMNTService);

    return {
      onInit() {
        store._loadAllCharacters(tmntService.getAllCharacters());
        store._loadTopCharacters(tmntService.getTopCharacters(3));
      },
    };
  }),
);
