import { CommonModule } from '@angular/common';
import { Component, inject } from '@angular/core';
import { RouterModule } from '@angular/router';
import { TMNTCharacter } from './models/tmnt-character.model';
import { AppStore } from './store/app.component.store';

@Component({
  imports: [RouterModule, CommonModule],
  selector: 'app-root',
  template: `
    <div class="container mx-auto p-4">
      <h1 class="text-3xl font-bold mb-6">Teenage Mutant Ninja Turtles</h1>

      <div class="mb-6">
        <h2 class="text-xl font-semibold mb-2">Top Characters by High Score</h2>
        <div class="grid grid-cols-1 md:grid-cols-3 gap-4">
          @for (character of appStore.topCharacters(); track character.id) {
            <div class="card bg-base-100 shadow-xl">
              <div class="card-body">
                <h3 class="card-title">{{ character.name }}</h3>
                <div
                  class="badge"
                  [ngStyle]="{
                    'background-color': character.color,
                    color: 'white',
                  }"
                >
                  {{ character.color }}
                </div>
                <p><strong>Weapon:</strong> {{ character.weapon }}</p>
                <p><strong>High Score:</strong> {{ character.highScore }}</p>
                <div class="card-actions justify-end">
                  <button
                    class="btn btn-primary"
                    (click)="showDetails(character)"
                  >
                    Details
                  </button>
                </div>
              </div>
            </div>
          }
        </div>
      </div>

      <div class="mb-6">
        <h2 class="text-xl font-semibold mb-2">All Characters</h2>
        <div class="overflow-x-auto">
          <table class="table w-full">
            <thead>
              <tr>
                <th>Name</th>
                <th>Color</th>
                <th>Weapon</th>
                <th>High Score</th>
                <th>Actions</th>
              </tr>
            </thead>
            <tbody>
              @for (character of appStore.allCharacters(); track character.id) {
                <tr>
                  <td>{{ character.name }}</td>
                  <td>
                    <div
                      class="badge"
                      [ngStyle]="{
                        'background-color': character.color,
                        color: 'white',
                      }"
                    >
                      {{ character.color }}
                    </div>
                  </td>
                  <td>{{ character.weapon }}</td>
                  <td>{{ character.highScore }}</td>
                  <td>
                    <button
                      class="btn btn-sm btn-primary"
                      (click)="showDetails(character)"
                    >
                      Details
                    </button>
                  </td>
                </tr>
              }
            </tbody>
          </table>
        </div>
      </div>

      @let character = appStore.selectedCharacter();
      @if (appStore.characterSelected()) {
        <div class="card bg-base-100 shadow-xl mb-6">
          <div class="card-body">
            <h2 class="card-title">{{ character.name }} Details</h2>
            <div
              class="badge mb-2"
              [ngStyle]="{
                'background-color': character.color,
                color: 'white',
              }"
            >
              {{ character.color }}
            </div>
            <p><strong>Weapon:</strong> {{ character.weapon }}</p>
            <p><strong>High Score:</strong> {{ character.highScore }}</p>
            <p><strong>Skills:</strong> {{ character.skills.join(', ') }}</p>
            @if (character.description) {
              <p>
                <strong>Description:</strong>
                {{ character.description }}
              </p>
            }
            <div class="card-actions justify-end">
              <button
                class="btn btn-secondary"
                (click)="appStore.deselectCharacter()"
              >
                Close
              </button>
            </div>
          </div>
        </div>
      }
    </div>
    <router-outlet></router-outlet>
  `,
  styles: [],
  providers: [AppStore],
})
export class AppComponent {
  protected readonly title = 'testing-structure-workshop';

  protected appStore = inject(AppStore);

  protected showDetails(character: TMNTCharacter): void {
    this.appStore.selectCharacter(character);
  }
}
