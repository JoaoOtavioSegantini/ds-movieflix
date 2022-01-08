/// <reference path="../support/index.d.ts" />

describe('Home Page', function () {

  beforeEach(function () {
    cy.intercept('POST', "**/oauth/token").as('login')

    cy.fixture('example.json').then(function (example) {
      this.example = example;
    })

    cy.fixture('login.json').then(function (login) {
      this.login = login;
    })
  })

  it('should render home components', function () {
    cy.visit('/')
    cy.findByRole('link', { name: /movieflix/i }).should('exist')
    cy.findByRole('heading', { name: /avalie filmes/i }).should('exist')
    cy.findByRole('heading', { name: /diga o que você achou do seu filme favorito/i }).should('exist')
    cy.findByTestId('main-image').should('exist')
    cy.findByRole('button', { name: /logar/i }).should('exist')
    cy.findByTestId('arrowIcon').should('exist')
    cy.findByPlaceholderText(/email/i).should('exist')
    cy.findByPlaceholderText(/senha/i).should('exist')

    cy.findByTestId('visibilityoff').should('exist')
    cy.findAllByPlaceholderText(/senha/i).should('have.attr', 'type', 'password')
    cy.findByTestId('visibilityoff').click()
    cy.findAllByPlaceholderText(/senha/i).should('have.attr', 'type', 'text')
    cy.findByTestId('visibilityon').should('exist')
    cy.findByTestId('visibilityoff').should('not.exist')
    cy.findByTestId('visibilityon').click()

    cy.findByRole('button', { name: /logar/i }).click()
    cy.findAllByText(/campo obrigatório/i).should('have.length', 2)
    cy.findByPlaceholderText(/email/i).type(this.example.email)
    cy.findAllByText(/campo obrigatório/i).should('have.length', 1)
    cy.findByPlaceholderText(/senha/i).type(this.example.body)
    cy.findAllByText(/campo obrigatório/i).should('not.exist')
    cy.findByRole('button', { name: /logar/i }).click()
    cy.wait('@login')
    cy.findByText(/usuário ou senha inválidos!/i).should('exist')
    cy.findByTestId('alert').within(() => {
      cy.findByText(/x/i).click()
    })
    cy.findByText(/usuário ou senha inválidos!/i).should('not.exist')
  })
  it('should login with alex@gmail.com', function () {

    cy.signIn(this.login.member, this.login.passMember)
    cy.wait('@login')
    cy.url().should('eq', `${Cypress.config().baseUrl}/movies`)
    cy.findByTitle('alex@gmail.com').should('exist')

    cy.wait(1500)
    cy.findByText('Bem vindo de volta Alex Brown!').should('exist')
    cy.findByText(/sair/i).should('exist')
  })
  it('should login with maria@gmail.com', function () {
    cy.findByText(/sair/i).click()
    cy.wait(1500)
    cy.signIn(this.login.visitor, this.login.passVisitor)
    cy.wait('@login')
    cy.url().should('eq', `${Cypress.config().baseUrl}/movies`)
    cy.findByTitle('maria@gmail.com').should('exist')

    cy.wait(1500)
    cy.findByText('Bem vindo de volta Maria!').should('exist')
    cy.findByText(/sair/i).should('exist').click()
  })
})


