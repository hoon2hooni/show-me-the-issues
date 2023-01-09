/// <reference types="cypress" />

declare global {
  namespace Cypress {
    interface Chainable {
      dataCy<E extends Node = HTMLElement>(value: string): Chainable<JQuery<E>>;
    }
  }
}

export {};
