import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';
import { TMNTCharacter } from '../models/tmnt-character.model';

@Injectable({
  providedIn: 'root'
})
export class TMNTService {
  private characters: TMNTCharacter[] = [
    {
      id: 1,
      name: 'Leonardo',
      color: 'blue',
      weapon: 'Katana Swords',
      skills: ['Leadership', 'Strategy', 'Ninjutsu'],
      highScore: 9500,
      imageUrl: 'https://example.com/leonardo.jpg',
      description: 'The leader of the team who wears a blue mask and wields two katana.'
    },
    {
      id: 2,
      name: 'Raphael',
      color: 'red',
      weapon: 'Sai',
      skills: ['Strength', 'Aggression', 'Hand-to-hand combat'],
      highScore: 8900,
      imageUrl: 'https://example.com/raphael.jpg',
      description: 'The hot-headed member who wears a red mask and uses sai as his weapons.'
    },
    {
      id: 3,
      name: 'Donatello',
      color: 'purple',
      weapon: 'Bo Staff',
      skills: ['Intelligence', 'Technology', 'Engineering'],
      highScore: 9200,
      imageUrl: 'https://example.com/donatello.jpg',
      description: 'The tech genius who wears a purple mask and uses a bo staff.'
    },
    {
      id: 4,
      name: 'Michelangelo',
      color: 'orange',
      weapon: 'Nunchaku',
      skills: ['Agility', 'Cooking', 'Skateboarding'],
      highScore: 8700,
      imageUrl: 'https://example.com/michelangelo.jpg',
      description: 'The fun-loving member who wears an orange mask and uses nunchaku.'
    },
    {
      id: 5,
      name: 'Splinter',
      color: 'brown',
      weapon: 'Walking Stick',
      skills: ['Wisdom', 'Martial Arts Master', 'Meditation'],
      highScore: 9800,
      imageUrl: 'https://example.com/splinter.jpg',
      description: 'The wise rat sensei who trained the turtles in ninjutsu.'
    }
  ];

  constructor() { }

  getAllCharacters(): Observable<TMNTCharacter[]> {
    return of(this.characters);
  }

  getCharacterById(id: number): Observable<TMNTCharacter | undefined> {
    const character = this.characters.find(char => char.id === id);
    return of(character);
  }

  getCharactersByHighScore(minScore: number): Observable<TMNTCharacter[]> {
    const filteredCharacters = this.characters.filter(char => char.highScore >= minScore);
    return of(filteredCharacters);
  }

  getTopCharacters(count: number = 3): Observable<TMNTCharacter[]> {
    const sortedCharacters = [...this.characters]
      .sort((a, b) => b.highScore - a.highScore)
      .slice(0, count);
    return of(sortedCharacters);
  }
}
