import { TestBed } from '@angular/core/testing';
import { Subject } from 'rxjs';
import {
  emptyTmntCharacter,
  TMNTCharacter,
} from '../models/tmnt-character.model';
import { TMNTService } from '../services/tmnt.service';
import { AppStore } from './app.component.store';

describe('AppStore', () => {
  const getAllCharacters$ = new Subject<TMNTCharacter[]>();
  const getTopCharacters$ = new Subject<TMNTCharacter[]>();

  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [
        AppStore,
        {
          provide: TMNTService,
          useValue: {
            getAllCharacters: () => getAllCharacters$,
            getTopCharacters: () => getTopCharacters$,
          },
        },
      ],
    });
  });

  it('should create the store', () => {
    const appStore = TestBed.inject(AppStore);

    expect(appStore).toBeTruthy();
  });

  it('should load all characters', () => {
    const appStore = TestBed.inject(AppStore);

    const characters: TMNTCharacter[] = [
      {
        id: 1,
        name: 'Leonardo',
        color: 'blue',
        weapon: 'sword',
        highScore: 100,
        skills: ['leadership', 'strategy'],
      },
      {
        id: 2,
        name: 'Michelangelo',
        color: 'orange',
        weapon: 'nunchaku',
        highScore: 200,
        skills: ['party dude', 'comedy'],
      },
    ];

    getAllCharacters$.next(characters);

    expect(appStore.allCharacters()).toEqual(characters);
  });

  it('should load top characters', () => {
    const appStore = TestBed.inject(AppStore);

    const characters: TMNTCharacter[] = [
      {
        id: 1,
        name: 'Leonardo',
        color: 'blue',
        weapon: 'sword',
        highScore: 100,
        skills: ['leadership', 'strategy'],
      },
      {
        id: 2,
        name: 'Michelangelo',
        color: 'orange',
        weapon: 'nunchaku',
        highScore: 200,
        skills: ['party dude', 'comedy'],
      },
    ];

    getTopCharacters$.next(characters);

    expect(appStore.topCharacters()).toEqual(characters);
  });

  it('should select a character', () => {
    const appStore = TestBed.inject(AppStore);

    const character: TMNTCharacter = {
      id: 2,
      name: 'Michelangelo',
      color: 'orange',
      weapon: 'nunchaku',
      highScore: 200,
      skills: ['party dude', 'comedy'],
    };

    appStore.selectCharacter(character);
    expect(appStore.selectedCharacter()).toEqual(character);
  });

  it('should deselect a character', () => {
    const appStore = TestBed.inject(AppStore);

    const character: TMNTCharacter = {
      id: 2,
      name: 'Michelangelo',
      color: 'orange',
      weapon: 'nunchaku',
      highScore: 200,
      skills: ['party dude', 'comedy'],
    };

    appStore.selectCharacter(character);
    appStore.deselectCharacter();

    expect(appStore.selectedCharacter()).toEqual(emptyTmntCharacter());
  });
});
