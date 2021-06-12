import { Suit, suitToColor } from "./card.ts";
import { Pile } from "./pile.ts";

export const suits: Suit[] = ['diamonds', 'clubs', 'hearts', 'spades']

export class Game {
  piles: Pile[];
  private validationArray?: string[];

  constructor() {
    this.piles = [new Pile(this)];
  }

  removePile(id: string) {
    this.piles = this.piles.filter(p => p.id !== id);
    return this;
  }

  validatePiles(validator?: (pile: Pile) => string) {
    if (!validator) validator = (pile: Pile) => {

      const cardCounts: any = {};
      pile.cards.forEach(c => {
        const key = c.suit ? c.suit + c.color + c.rank : c.color + c.rank;
        cardCounts[key] ? cardCounts[key]++ : cardCounts[key] = 0;
      });

      if (!this.validationArray) this.validationArray = suits.flatMap(s => {
        const suitArray = []

        for (let r = 1; r <= 52; r++) {
          suitArray.push(s + suitToColor + r);
        }

        return suitArray;
      })
      return this.validationArray.reduce((a, b) => {
        if (cardCounts[b] as number > 1) a += b;
        if (cardCounts[b] as number < 1) a += `!${b}`;
        return a;
      }, '');
    }
    const combined = new Pile(this, ...this.piles.flatMap(p => p.cards));
    const message = validator(combined);
    return {
      valid: !message,
      message
    };
  }

  setValidationArray(va: string[]) {
    this.validationArray = va;
  }

  private lastPileId = 0;

  getNewPileId() {
    return this.lastPileId++;
  }
}