export type Suit = keyof typeof suitToColor;

export enum suitToColor {
  hearts = 'red',
  diamonds = 'red',
  clubs = 'black',
  spades = 'black'
}

export class Card {
  suit?: Suit;
  color: string;
  rank: number;

  constructor(color: string, rank: number);
  constructor(suit: Suit, rank: number);
  constructor(suit: Suit | string, rank: number) {
    if (suit && suitToColor[suit as keyof typeof suitToColor]) {
      this.suit = suit as Suit;
      this.color = suitToColor[suit as keyof typeof suitToColor];
    } else {
      this.color = suit;
    }
    this.rank = rank;
  }
}