import LoginPage from '../../../support/pageObject/loginPage';
import users from '../../../fixtures/myAccount/users.json';

const loginPage = new LoginPage();

describe('Login Tests with Page Object', () => {
    beforeEach(() => {
        loginPage.visit();
    });

    it('Positive - Login successfully with valid credentials', () => {
        const user = users[0];
        loginPage.fillEmail(user.email);
        loginPage.fillPassword(user.password);
        loginPage.clickLogin();
        cy.get('.message').should('contain.text', 'This is a demo store to test your test automaiton scripts',
            'No orders will be fulfilled. If you are facing any issue, email us at hello@softwaretestingboard.com.');
    });

    it('Negative - Login failed with empty fields', () => {
        loginPage.fillEmail('');
        loginPage.fillPassword('');
        loginPage.clickLogin();
        loginPage.verifyErrorMessage('This is a required field.');
    });

    it('Negative - Login failed with invalid email', () => {
        loginPage.fillEmail('invalid_email@example.com');
        loginPage.fillPassword('wongpassword');
        loginPage.clickLogin();
        loginPage.verifyErrorMessage('The account sign-in was incorrect or your account is disabled temporarily.');
    });

    it('Negative - Login failed with empty password', () => {
        const user = users[0];
        loginPage.fillEmail(user.email);
        loginPage.fillPassword('');
        loginPage.clickLogin();
        loginPage.verifyErrorMessage('This is a required field.');
    });
});