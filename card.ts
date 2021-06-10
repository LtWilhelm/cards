export type Suit = keyof typeof suitToColor;

export enum suitToColor {
  hearts = 'red',
  diamonds = 'red',
  clubs = 'black',
  spades = 'black'
}

export class Card {
  suit: Suit;
  color: string;
  rank: number;

  constructor(color: string, rank: number);
  constructor(suit: Suit, rank: number);
  constructor(suit: Suit | string, rank: number) {
    if (suitToColor[suit]) {
      this.suit = suit as Suit;
      this.color = suitToColor[suit];
    } else {
      this.color = suit;
    }
    this.rank = rank;
  }
}