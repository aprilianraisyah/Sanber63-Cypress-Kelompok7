class basePage {
    open () {
        cy.visit('/')
    }

    verifyUrlBasePage () {
        cy.url().should('include', '/login')
    }
}

export default new basePage();