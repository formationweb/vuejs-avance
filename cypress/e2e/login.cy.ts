describe('Login Page', () => {
    beforeEach(() => {
        cy.visit('/login')
    })

    it('Tester le formulaire de login', () => {
        cy.intercept('POST', 'https://apprendre.angular.fr/api/fake/login', {
            statusCode: 200,
            body: {
                token: 'aaa'
            }
        }).as('loginRequest')

        cy.get('input[type="text"]').type('host@example.com')
        cy.get('input[type="password"]').type('password123')

        cy.get('button').click()

        cy.wait('@loginRequest')

        cy.url().should('eq', Cypress.config().baseUrl + '/')

        cy.window().then((window) => {
            expect(window.localStorage.getItem('token')).to.eq('aaa')
        })
    })
})