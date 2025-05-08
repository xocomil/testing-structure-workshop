export type TMNTCharacter = {
  id: number;
  name: string;
  color: string;
  weapon: string;
  skills: string[];
  highScore: number;
  imageUrl?: string;
  description?: string;
};

export const emptyTmntCharacter = (): TMNTCharacter => ({
  id: -1,
  name: '',
  color: '',
  weapon: '',
  skills: [],
  highScore: 0,
});
