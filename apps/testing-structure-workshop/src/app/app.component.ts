import { CommonModule } from '@angular/common';
import { Component, inject, OnInit } from '@angular/core';
import { RouterModule } from '@angular/router';
import { TMNTCharacter } from './models/tmnt-character.model';
import { TMNTService } from './services/tmnt.service';

@Component({
  imports: [RouterModule, CommonModule],
  selector: 'app-root',
  template: `
    <div class="container mx-auto p-4">
      <h1 class="text-3xl font-bold mb-6">Teenage Mutant Ninja Turtles</h1>

      <div class="mb-6">
        <h2 class="text-xl font-semibold mb-2">Top Characters by High Score</h2>
        <div class="grid grid-cols-1 md:grid-cols-3 gap-4">
          @for (character of topCharacters; track character.id) {
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
              @for (character of allCharacters; track character.id) {
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

      @if (selectedCharacter) {
        <div class="card bg-base-100 shadow-xl mb-6">
          <div class="card-body">
            <h2 class="card-title">{{ selectedCharacter.name }} Details</h2>
            <div
              class="badge mb-2"
              [ngStyle]="{
                'background-color': selectedCharacter.color,
                color: 'white',
              }"
            >
              {{ selectedCharacter.color }}
            </div>
            <p><strong>Weapon:</strong> {{ selectedCharacter.weapon }}</p>
            <p>
              <strong>High Score:</strong> {{ selectedCharacter.highScore }}
            </p>
            <p>
              <strong>Skills:</strong> {{ selectedCharacter.skills.join(', ') }}
            </p>
            @if (selectedCharacter.description) {
              <p>
                <strong>Description:</strong>
                {{ selectedCharacter.description }}
              </p>
            }
            <div class="card-actions justify-end">
              <button
                class="btn btn-secondary"
                (click)="selectedCharacter = null"
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
})
export class AppComponent implements OnInit {
  title = 'testing-structure-workshop';
  allCharacters: TMNTCharacter[] = [];
  topCharacters: TMNTCharacter[] = [];
  selectedCharacter: TMNTCharacter | null = null;
  private tmntService: TMNTService = inject(TMNTService);

  ngOnInit(): void {
    this.loadCharacters();
  }

  loadCharacters(): void {
    this.tmntService.getAllCharacters().subscribe((characters) => {
      this.allCharacters = characters;
    });

    this.tmntService.getTopCharacters(3).subscribe((characters) => {
      this.topCharacters = characters;
    });
  }

  showDetails(character: TMNTCharacter): void {
    this.selectedCharacter = character;
  }
}
