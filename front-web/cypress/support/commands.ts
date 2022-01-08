// ***********************************************
// This example commands.js shows you how to
// create various custom commands and overwrite
// existing commands.
//
// For more comprehensive examples of custom
// commands please read more here:
// https://on.cypress.io/custom-commands
// ***********************************************
//
//
// -- This is a parent command --
// Cypress.Commands.add('login', (email, password) => { ... })
//
//
// -- This is a child command --
// Cypress.Commands.add('drag', { prevSubject: 'element'}, (subject, options) => { ... })
//
//
// -- This is a dual command --
// Cypress.Commands.add('dismiss', { prevSubject: 'optional'}, (subject, options) => { ... })
//
//
// -- This will overwrite an existing command --
// Cypress.Commands.overwrite('visit', (originalFn, url, options) => { ... })

// Add Testing Library Commands
import '@testing-library/cypress/add-commands';
import { generateList } from '../../src/core/utils/list'
import { User } from './generate';

Cypress.Commands.add('google', () => cy.visit('https://www.google.com'))

Cypress.Commands.add('getByDataCy', (selector, ...args) => {
  return cy.get(`[data-cy="${selector}"]`, ...args)
})

Cypress.Commands.add('signIn', (username, password) => {
  cy.findByPlaceholderText(/email/i).clear()
  cy.findByPlaceholderText(/email/i).type(username)
  cy.findByPlaceholderText(/senha/i).clear()
  cy.findByPlaceholderText(/senha/i).type(password)
  cy.findByRole('button', { name: /logar/i }).click()
})

Cypress.Commands.add('shouldRenderMoviesCard', () => {
  cy.get('.list-of-movies').within(() => {
    cy.findAllByTitle(/loading/i).should('have.length', 4)
    cy.wait(1000)
    cy.findAllByRole('link').should('have.length', 12)
    cy.findAllByText(/^007.*/).should('have.length.at.least', 3)
    cy.findAllByText('2008').should('have.length.greaterThan', 1)
    cy.findByText('No passado pré-histórico, DLeh é um caçador').should('exist')
    cy.get('a:nth-child(4) > div > div > .card-image > img').should('have.attr', 'src').should('include', 'https://www.themoviedb.org/t/p/w533_and_h300_bestv2/9MFV2ki6kvc06XOiM7VCvbtlj5z.jpg')
  })
})

Cypress.Commands.add('shouldRenderPagination', (page, total: number) => {
  if (page === 0 || total === 0) return
  cy.findByText(`${page}`).should('have.class', 'active')
  cy.findByLabelText(`Page ${page} is your current page`).should('exist')
  const items: [number] = generateList(total)
  items.map(item => (
    cy.findByText(`${item + 1}`).should('exist')
  ))
})

Cypress.Commands.add('shouldRenderMovie', function (name: string, isMember = false) {
  if (name === '10.000 A.C.') {
    cy.findByText(this.movie.AC.year).should('exist')
    cy.findByText(this.movie.AC.subtitle).should('exist')
    cy.findByText(this.movie.AC.description).should('exist')
    cy.findByRole('img').should('exist').should('have.attr', 'src')
      .should('include', this.movie.AC.img_scr)
  }

  if (name === 'Valente') {
    cy.findByText(this.movie.Valente.year).should('exist')
    cy.findByText(this.movie.Valente.subtitle).should('exist')
    cy.findByText(this.movie.Valente.description).should('exist')
    cy.findAllByRole('img').first().should('exist').should('have.attr', 'src')
      .should('include', this.movie.Valente.img_src)

  }

  if (name === 'Cruella') {
    cy.findByText(this.movie.Cruella.year).should('exist')
    cy.findByText(this.movie.Cruella.subtitle).should('exist')
    cy.findByText(this.movie.Cruella.description).should('exist')
    cy.findByRole('img').should('exist').should('have.attr', 'src')
      .should('include', this.movie.Cruella.img_src)
  }

  if (isMember) {
    cy.findByPlaceholderText(/deixe sua avaliação aqui/i).should('exist').should('not.be.disabled')
    cy.findByText(/salvar avaliação/i).should('exist').should('not.be.disabled')
    cy.findByTitle('Somente membros podem salvar uma avaliação').should('not.exist')

    cy.findByTestId('avaliation-save-input-main')
      .should('have.attr', 'title')
      .should('eq', '')

    cy.findByTestId('review-onsave')
      .should('not.have.class', 'invalid-save-review')
      .should('not.have.css', 'cursor', 'not-allowed')
      .should('have.attr', 'title')
      .should('eq', '')
  } else {
    cy.findByPlaceholderText(/deixe sua avaliação aqui/i).should('exist').should('be.disabled')
    cy.findAllByTitle('Somente membros podem salvar uma avaliação').should('have.length', 2)

    cy.findByTestId('avaliation-save-input-main').should('have.attr', 'title')
      .should('eq', 'Somente membros podem salvar uma avaliação')

    cy.findByTestId('review-onsave')
      .should('have.class', 'invalid-save-review')
      .should('have.css', 'cursor', 'not-allowed')
      .should('have.attr', 'title')
      .should('eq', 'Somente membros podem salvar uma avaliação')
  }

})

Cypress.Commands.add('shouldSendTextReview', (user: User) => {
  cy.findByPlaceholderText(/deixe sua avaliação aqui/i).type(user.review)
  cy.findByText(/salvar avaliação/i).click()
})
