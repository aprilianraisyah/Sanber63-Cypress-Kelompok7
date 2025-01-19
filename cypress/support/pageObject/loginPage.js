class LoginPage {
    // Navigasi ke halaman login
    visit() {
        cy.visit('customer/account/login/referer/aHR0cHM6Ly9tYWdlbnRvLnNvZnR3YXJldGVzdGluZ2JvYXJkLmNvbS8%2C/');
    }

    // Mengisi email
    fillEmail(email) {
        const emailField = cy.get('#email');
        emailField.clear();
        if (email) {
            emailField.type(email);
        }
    }

    // Mengisi password
    fillPassword(password) {
        const passwordField = cy.get('#pass');
        passwordField.clear();
        if (password) {
            passwordField.type(password);
        }
    }

    // Klik tombol login
    clickLogin() {
        cy.get('#send2').click();
    }

    // Verifikasi pesan error
    verifyErrorMessage(expectedMessage) {
        cy.get('.mage-error').should('contain.text', expectedMessage);
    }

    // Verifikasi berhasil masuk halaman My Account
    verifyMyAccountPage() {
        cy.get('.page-title').should('contain.text', 'My Account');
    }

    // Klik logout
    clickLogout() {
        cy.get('.header .logout').should('be.visible').click();
    }

    // Verifikasi tetap di halaman login
    verifyLoginPage() {
        cy.url().should('include', '/customer/account/login');
        cy.get('#email').should('be.visible');
    }
}

export default LoginPage;