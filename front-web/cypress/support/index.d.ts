// load type definitions from Cypress module
/// <reference types="cypress" />

type User = {
  username: string
  email: string
  review: string
}

type MovieProps = "10.000 A.C." | "Valente" | "Cruella"

declare namespace Cypress {
  interface Chainable {
    /**
     * Custom command to visit google page
     * @example cy.google()
     */
    google(): Chainable<Window>

    /**
    * Custom command to get element by data-cy
    * @example cy.getByDataCy('selector')
    */
    getByDataCy(selector: string): Chainable<Element>

    /**
    * Custom command to make login
    * @example cy.signIn('hello@cypress.io', 'cypress123')
    */
     signIn(username: string, password: string): Chainable<Element>

    /**
    * Custom command to test pagination
    * @example cy.shouldRenderPagination('number of page is active', 'number of total pages')
    */
     shouldRenderPagination(active: number, total: number): Chainable<Element>

    /**
    * Custom command to test movies page components renderization
    * @example cy.shouldRenderMoviesCard()
    */
     shouldRenderMoviesCard(): Chainable<Element>

    /**
    * Custom command to test movie page details components renderization
    * @example cy.shouldRenderMovie('Avatar', true)
    */
     shouldRenderMovie(movie: MovieProps, isMember?: boolean): Chainable<Element>
    /**
    * Custom command to send random review text
    * @example cy.shouldSendTextReview(user)
    */
     shouldSendTextReview(user: User): Chainable<Element>
  }
}
