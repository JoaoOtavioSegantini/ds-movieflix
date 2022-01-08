/// <reference path="../support/index.d.ts" />

import { createUserReview } from '../support/generate'

describe('Movie Details Page', function () {

  beforeEach(function () {
    cy.intercept('POST', "**/oauth/token").as('login')
    cy.intercept('GET', "**/genres").as('filter')
    cy.intercept('GET', "**/movies?*").as('movies')
    cy.intercept('GET', "**/movies/**").as('movie')
    cy.intercept('POST', "**/reviews").as('review')

    cy.request({ method: 'POST', failOnStatusCode: false, url: 'http://localhost:8080/reviews' })

    cy.fixture('login').then(function (login) {
      this.login = login;
    })

    cy.fixture('details').then(function (movie) {
      this.movie = movie;
    })
  })
  it('should render details of movie when user member is authenticated', function () {
    cy.visit('/')
    cy.signIn(this.login.member, this.login.passMember)
    cy.wait(['@login', '@filter', '@movies'])
    cy.visit('/movies/15')
    cy.wait('@movie')
    cy.findByRole('link', { name: /movieflix/i }).should('exist')
    cy.findByText(/sair/i).should('exist')
    cy.wait('@movie')
    cy.shouldRenderMovie('10.000 A.C.', true)

    cy.findByText(/sair/i).click()
    cy.url().should('eq', `${Cypress.config().baseUrl}/`)
  })
  it('should render details of movie when user visitor is authenticated', function () {
    cy.visit('/')
    cy.signIn(this.login.visitor, this.login.passVisitor)
    cy.wait(['@login', '@filter', '@movies'])
    cy.visit('/movies/15')
    cy.wait('@movie')
    cy.findByRole('link', { name: /movieflix/i }).should('exist')
    cy.findByText(/sair/i).should('exist')
    cy.shouldRenderMovie('10.000 A.C.')

    cy.findByText(/sair/i).click()
    cy.url().should('eq', `${Cypress.config().baseUrl}/`)

  })
  it('should render details of movie when user visitor is authenticated and label Ver tudo is visible', function () {
    cy.visit('/')
    cy.signIn(this.login.visitor, this.login.passVisitor)
    cy.wait(['@login', '@filter', '@movies'])
    cy.visit('/movies/4')
    cy.wait('@movie')
    cy.findByRole('link', { name: /movieflix/i }).should('exist')
    cy.findByText(/sair/i).should('exist')
    cy.shouldRenderMovie('Cruella')
    cy.findByText(/Ver tudo/i).should('exist')
    cy.findByText(/Ver tudo/i).click()
    cy.findByText(/resumir/i).should('exist')
    cy.findByText(/Ver tudo/i).should('not.exist')
    cy.findByText(/sair/i).click()
    cy.url().should('eq', `${Cypress.config().baseUrl}/`)

  })
  it('should render details of movie when user member is authenticated and label Ver tudo is visible', function () {
    cy.visit('/')
    cy.signIn(this.login.member, this.login.passMember)
    cy.wait(['@login', '@filter', '@movies'])
    cy.visit('/movies/4')
    cy.wait('@movie')
    cy.findByRole('link', { name: /movieflix/i }).should('exist')
    cy.findByText(/sair/i).should('exist')
    cy.shouldRenderMovie('Cruella', true)
    cy.findByText(/Ver tudo/i).should('exist')
    cy.findByText(/Ver tudo/i).click()
    cy.findByText(/resumir/i).should('exist')
    cy.findByText(/Ver tudo/i).should('not.exist')
    cy.findByText(/sair/i).click()
    cy.url().should('eq', `${Cypress.config().baseUrl}/`)

  })
  it('should send review in details of movie when user member is authenticated', function () {
    cy.visit('/')
    cy.signIn(this.login.member, this.login.passMember)
    cy.wait(['@login', '@filter', '@movies'])
    cy.visit('/movies/22')
    cy.wait('@movie')
    cy.findByRole('link', { name: /movieflix/i }).should('exist')
    cy.findByText(/sair/i).should('exist')
    cy.shouldRenderMovie('Valente', true)
    cy.findByText(/Ver tudo/i).should('exist')
    cy.findByText(/Ver tudo/i).click()
    cy.findByText(/resumir/i).should('exist')
    cy.findByText(/Ver tudo/i).should('not.exist')
    const user = createUserReview()
    cy.shouldSendTextReview(user)
    cy.wait('@review')
    cy.wait(1500)
    cy.findByText('Avaliação do filme Valente enviada com sucesso!').should('exist')
    cy.findByText(user.review).should('exist')
    cy.findAllByText('Alex Brown').should('exist').should('have.length.at.least', 1)
    cy.findAllByAltText('estrela amarela').should('exist')
    cy.findByText(/sair/i).click()
    cy.url().should('eq', `${Cypress.config().baseUrl}/`)

  })
  it('should dont send review in details of movie when user type empty review', function () {
    cy.visit('/')
    cy.signIn(this.login.user, this.login.password)
    cy.wait(['@login', '@filter', '@movies'])
    cy.visit('/movies/22')
    cy.wait('@movie')
    cy.findByRole('link', { name: /movieflix/i }).should('exist')
    cy.findByText(/sair/i).should('exist')
    cy.shouldRenderMovie('Valente', true)
    cy.findByText(/Ver tudo/i).should('exist')
    cy.findByText(/Ver tudo/i).click()
    cy.findByText(/resumir/i).should('exist')
    cy.findByText(/Ver tudo/i).should('not.exist')

    const review = ' '
    cy.findByPlaceholderText(/deixe sua avaliação aqui/i).type(review)
    cy.findByText(/salvar avaliação/i).click()
    cy.findByText('Não é permitido inserir uma avaliação com um texto vazio! Para salvar uma avaliação, por favor insira um texto.').should('exist')
    cy.findByRole('button').click()
    cy.findByText('Não é permitido inserir uma avaliação com um texto vazio! Para salvar uma avaliação, por favor insira um texto.').should('not.exist')
    cy.findByText('João Otávio').should('not.exist')
    cy.findByText(/sair/i).click()
    cy.url().should('eq', `${Cypress.config().baseUrl}/`)

  })
  it('should redirect to home in details of movie when user statusCode is 401', function () {
    cy.intercept('POST', "**/reviews", { statusCode: 401, }).as('reviews')

    cy.visit('/')
    cy.signIn(this.login.user, this.login.password)
    cy.wait(['@login', '@filter', '@movies'])
    cy.visit('/movies/22')
    cy.wait(2500)
    const review = 'o FILME me impressionou!!!'
    cy.findByPlaceholderText(/deixe sua avaliação aqui/i).type(review)
    cy.findByText(/salvar avaliação/i).click()
    cy.wait('@reviews').then((interception) => {
      expect(interception.response.statusCode).to.eq(401)
    })

    cy.url().should('eq', `${Cypress.config().baseUrl}/`)
    cy.wait(1000)
    cy.findByText('Request failed with status code 401').should('exist')
  })
  it('should redirect to home in details of movie when user token expired', function () {

    cy.visit('/')
    cy.signIn(this.login.user, this.login.password)
    cy.wait(['@login', '@filter', '@movies'])
    cy.visit('/movies/22')
    cy.wait(2500)
    const now = Date.now() + 864000000
    cy.clock(now)
    cy.reload()

    cy.url().should('eq', `${Cypress.config().baseUrl}/`)
  })
})
