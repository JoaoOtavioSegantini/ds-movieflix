/// <reference path="../support/index.d.ts" />


describe('Movies Page', function () {

  beforeEach(function () {
    cy.intercept('POST', "**/oauth/token").as('login')
    cy.intercept('GET', "**/genres").as('filter')
    cy.intercept('GET', "**/movies?*").as('movies')

    cy.fixture('login.json').then(function (login) {
      this.login = login;
    })
  })

  it('should render movies page components', function () {
    cy.visit('/')

    cy.signIn(this.login.member, this.login.passMember)
    cy.wait('@login')
    cy.url().should('eq', `${Cypress.config().baseUrl}/movies`)
    cy.findByText(/sair/i).should('exist')
    cy.findByText(/filtrar por categoria/i).should('exist')
    cy.findByRole('link', { name: /movieflix/i }).should('exist')
    cy.shouldRenderMoviesCard()
    cy.shouldRenderPagination(1, 3)
    cy.findByText(/sair/i).click()
    cy.url().should('eq', `${Cypress.config().baseUrl}/`)
    cy.wait(1500)
  })
  it('should filter movies by category when genre is selected', function ()  {
    cy.signIn(this.login.member, this.login.passMember)
    cy.wait('@login')
    cy.findByText(/filtrar por categoria/i).click()
    cy.findByText('Terror').click()
    cy.wait(['@filter','@movies'])
    cy.get('.list-of-movies').within(() => {
      cy.findAllByRole('link').should('have.length', 2)
    })
    cy.shouldRenderPagination(1, 1)
    cy.wait(3000).then(() => cy.findByText(/sair/i).click())
    cy.wait(1000)
    cy.url().should('eq', `${Cypress.config().baseUrl}/`)
  })
  it('should filter movies when pagination is changed', function () {
    cy.visit('/')
    cy.signIn(this.login.member, this.login.passMember)
    cy.wait('@login')
    cy.findByText('2').click()
    cy.wait(['@filter','@movies'])

    cy.get('.list-of-movies').within(() => {
      cy.wait(1000)
      cy.findAllByRole('link').should('have.length', 12)
    })
    cy.shouldRenderPagination(2, 3)
    cy.wait(2000).then(() => cy.findByText(/sair/i).click())
    cy.url().should('eq', `${Cypress.config().baseUrl}/`)
  })
})
