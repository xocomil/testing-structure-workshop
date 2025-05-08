import { TestBed } from '@angular/core/testing';
import { TMNTService } from './tmnt.service';
import { TMNTCharacter } from '../models/tmnt-character.model';
import { firstValueFrom } from 'rxjs';

describe('TMNTService', () => {
  let service: TMNTService;

  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [TMNTService]
    });
    service = TestBed.inject(TMNTService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  it('should return all characters', async () => {
    const characters = await firstValueFrom(service.getAllCharacters());
    expect(characters.length).toBe(5);
    expect(characters[0].name).toBe('Leonardo');
  });

  it('should return a character by id', async () => {
    const character = await firstValueFrom(service.getCharacterById(2));
    expect(character).toBeTruthy();
    expect(character?.name).toBe('Raphael');
    expect(character?.color).toBe('red');
  });

  it('should return undefined for non-existent character id', async () => {
    const character = await firstValueFrom(service.getCharacterById(999));
    expect(character).toBeUndefined();
  });

  it('should filter characters by minimum high score', async () => {
    const characters = await firstValueFrom(service.getCharactersByHighScore(9000));
    expect(characters.length).toBe(3);
    expect(characters.every(char => char.highScore >= 9000)).toBe(true);
  });

  it('should return top characters by high score', async () => {
    const topCharacters = await firstValueFrom(service.getTopCharacters(2));
    expect(topCharacters.length).toBe(2);
    expect(topCharacters[0].name).toBe('Splinter');
    expect(topCharacters[1].name).toBe('Leonardo');
  });

  it('should return top 3 characters by default', async () => {
    const topCharacters = await firstValueFrom(service.getTopCharacters());
    expect(topCharacters.length).toBe(3);
    expect(topCharacters[0].highScore).toBeGreaterThanOrEqual(topCharacters[1].highScore);
    expect(topCharacters[1].highScore).toBeGreaterThanOrEqual(topCharacters[2].highScore);
  });
});
