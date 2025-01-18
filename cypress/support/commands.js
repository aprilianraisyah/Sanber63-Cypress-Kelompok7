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

// Login
Cypress.Commands.add('userLogin', (email, password, loginBtn) => {
    cy.get('#email').type(email)
    cy.get('#pass').type(password)
    cy.get('#send2').click()
})

Cypress.Commands.add('klik', (locator) => {
    cy.get(locator).should('be.visible').click()
})

Cypress.Commands.add('input', (locator, value) => {
    cy.get(locator)
        .should('be.visible')
        .clear()
        .type(value)
})

Cypress.Commands.add('verifyContainText', (locator, value) => {
    cy.get(locator)
        .should('be.visible')
        .should('contain.text', value)
})

Cypress.Commands.add('verifyErrorState', (fieldLocator, errorTextLocator, errorText) => {
    cy.get(fieldLocator).should('have.css', 'border-color', 'rgb(237, 131, 128)')
    cy.get(errorTextLocator).should('be.visible').should('contain', errorText)
})

Cypress.Commands.add('verifySnackbar', (snackbarLocator, snackbarTextLocator, text) => {
    cy.get(snackbarLocator).should('be.visible')
    cy.verifyContainText(snackbarTextLocator, text)
})

Cypress.Commands.add('verifyElementIsVisible', (locator) => {
    cy.get(locator).should('be.visible')
})