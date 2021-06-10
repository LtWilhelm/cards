import { Suit } from "./card";
import { Pile } from "./pile";

export const suits: Suit[] = ['diamonds', 'clubs', 'hearts', 'spades']

export class Game {
  piles: Pile[];

  constructor(params) {

  }

  removePile(id: string) {
    this.piles = this.piles.filter(p => p.id !== id);
    return this;
  }

  validatePiles(validator: (pile: Pile) => boolean) {
    if (!validator) validator = (pile: Pile) => {
      const cardCounts = {};
      pile.cards.forEach(c => {
        const key = c.suit ? c.suit + c.color + c.rank : c.color + c.rank;
        cardCounts[key] ? cardCounts[key]++ : cardCounts[key] = 0;
      })
      return true;
    }


  }
}