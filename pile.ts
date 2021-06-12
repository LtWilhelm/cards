import { Card, Suit } from "./card.ts";
import { Game, suits } from "./game.ts";

export class Pile {
  id: string;
  cards: Card[];
  game: Game;

  constructor(game: Game, ...cards: Card[]) {
    this.cards = cards;
    if (!this.cards.length) this.cards = suits.flatMap(s => {
      const cards: Card[] = [];

      for (let r = 1; r <= 52; r++) {
        cards.push(new Card(s, r));
      }

      return cards;
    })
    this.game = game;

    this.id = this.game.getNewPileId().toString();
  }

  shuffle() {
    this.cards.sort(() => Math.random() - .5);
    return this;
  }

  shuffleAndAddTo(pile: Pile, top = false, deletePile = false) {
    pile.shuffle();
    this.cards = top ? pile.cards.concat(this.cards) : this.cards.concat(pile.cards);
    pile.cards = [];
    deletePile && this.game.removePile(pile.id);
    return this;
  }

  shuffleInto(pile: Pile, deletePile = false) {
    this.cards = this.cards.concat(pile.cards);
    pile.cards = [];
    deletePile && this.game.removePile(pile.id);
    return this.shuffle();
  }

  addCard(card: Card, top = false) {
    this.cards[top ? 'unshift' : 'push'](card);
    return this;
  }

  drawCard() {
    return this.cards.shift();
  }
  cheat() {
    return this.cards.pop();
  }

  /**
   * 
   * @param color color of card to remove
   * @param rank numbered rank of card to remove (i.e. 1, 2, 3...), A == 1, K == 13
   * @returns first card found matching color and rank and removes it from the pile or undefined if pile does not contain the given card
   */
  removeCard(color: string, rank: number): Card | undefined;
  /**
   * 
   * @param suit suit of card to remove
   * @param rank numbered rank of card to remove (i.e. 1, 2, 3...), A == 1, K == 13
   * @returns first card found matching suit and rank and removes it from the pile or undefined if pile does not contain the given card
   */
  removeCard(suit: Suit, rank: number): Card | undefined;
  removeCard(suit: string | Suit, rank: number) {
    const i = this.cards.findIndex(c => (c.suit === suit || c.color === suit) && c.rank === rank)
    if (i > -1) {
      const card = this.cards.splice(i, 1)[0];
      return card;
    }
  }
}