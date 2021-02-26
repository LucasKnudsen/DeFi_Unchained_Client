describe('User can access news tab', () => {
  describe('successfully as authenticated user', () => {
    beforeEach(() => {
      cy.server()
      cy.route({
        method: "GET",
        url: "http://localhost:3000/api/markets?*",
        response: 'fixture:market_cap.json',
      })
      cy.route({
        method: "GET",
        url: "http://localhost:3000/api/currencies",
        response: 'fixture:currencies.json',
      })
      cy.route({
        method: "POST",
        url: "http://localhost:3000/api/auth",
        response: "fixture:registered_user.json",
        headers: {
          uid: 'user@email.com'
        }
      });
      cy.visit('/')
    })

    it('user can register and then see content of Crypto News tab', () => {
      cy.get('.ui.pointing.secondary.menu').within(() => {
        cy.get('a').eq(1).click()
      })
      cy.get('[data-cy="register-button"]').click()
      cy.get('[data-cy="registration-form"]').within(() => {
        cy.get('[data-cy="email-field"]').type('user@email.com')
        cy.get('[data-cy="password-field"]').type('password')
        cy.get('[data-cy="password-confirmation-field"]').type('password')
        cy.get('[data-cy="submit"]').click()
      })
      cy.get('[data-cy="news-header"]').should('contain', 'Latest Crypto News')
      cy.get('[data-cy="news-list-wrapper]').find('[data-cy="news-article"]').should('have.length', 7)
    })
  })
})