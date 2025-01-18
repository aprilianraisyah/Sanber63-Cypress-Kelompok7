import pageObject from "../../../support/myAccount/pageObject"
import users from '../../../fixtures/myAccount/users.json'
const value = require("../../../fixtures/myAccount/values.json")
import { faker } from '@faker-js/faker'

const PageObject = new pageObject()
const user = users[0]
let pengguna
const firstName = faker.name.firstName()
const lastName = faker.name.lastName()
const fullName = `${firstName} ${lastName}`
const randomEmail = faker.internet.email()
const randomPassword = faker.internet.password(12, true)

beforeEach(() => {
    Cypress.config('defaultCommandTimeout', 15000);

    //buat baca ulang file json setelah update emailnya berhasil. kalo ga gitu jadi kena error, soalnya masih manggil email yg lama buat login
    cy.readFile('cypress/fixtures/myAccount/users.json').then((data) => {
        pengguna = data[0];
        //Login
        cy.visit('/')
        cy.userLogin(pengguna.email, pengguna.password)
        cy.verifyContainText(PageObject.signedInUser, value.welcomeText)
    });

    //Buka My Account 
    cy.klik(PageObject.chevronSignedInUser)
    cy.klik(PageObject.contextMenuMyAccount)
    cy.verifyContainText(PageObject.pageBase, value.myAccount)

    //Masuk halaman edit 
    cy.klik(PageObject.editBtn)
    cy.verifyContainText(PageObject.pageBase, value.editAccount)
})

describe('Edit Account Information - First name & Last Name', () => {
    it('Positive - Berhasil edit First Name', () => {
        cy.input(PageObject.firstNameField, firstName)
        cy.klik(PageObject.saveBtn)
        cy.verifySnackbar(PageObject.snackBarSuccess, PageObject.snackBarSuccessText, value.successUpdateMessage)
        cy.verifyContainText(PageObject.signedInUser, firstName)
    })

    it('Negative - Mengosongkan first name', () => {
        cy.get(PageObject.firstNameField).clear()
        cy.klik(PageObject.saveBtn)
        cy.verifyErrorState(PageObject.firstNameField, PageObject.firstNameFieldError, value.requiredFieldErrorText)
    })

    it('Negative - Hanya menginputkan spasi pada field firstname', () => {
        cy.input(PageObject.firstNameField, "            ")
        cy.klik(PageObject.saveBtn)
        cy.verifyErrorState(PageObject.firstNameField, PageObject.firstNameFieldError, value.requiredFieldErrorText)
    })

    it('Negative - Menginputkan Special Char pada First Name', () => {
        cy.input(PageObject.firstNameField, firstName + "!@#")
        cy.klik(PageObject.saveBtn)
        cy.verifySnackbar(PageObject.snackBarError, PageObject.snackBarErrorText, value.firstNameInvalid)
    })

    it('Positive - Berhasil edit Last Name', () => {
        cy.input(PageObject.lastNameField, lastName)
        cy.klik(PageObject.saveBtn)
        cy.verifySnackbar(PageObject.snackBarSuccess, PageObject.snackBarSuccessText, value.successUpdateMessage)
        cy.verifyContainText(PageObject.signedInUser, lastName)
    })

    it('Negative - Mengosongkan Last Name', () => {
        cy.get(PageObject.lastNameField).clear()
        cy.klik(PageObject.saveBtn)
        cy.verifyErrorState(PageObject.lastNameField, PageObject.lastNameFieldError, value.requiredFieldErrorText)
    })

    it('Negative - Hanya menginputkan spasi pada field Last Name', () => {
        cy.input(PageObject.lastNameField, "     ")
        cy.klik(PageObject.saveBtn)
        cy.verifyErrorState(PageObject.lastNameField, PageObject.lastNameFieldError, value.requiredFieldErrorText)
    })

    it('Negative - Menginputkan Special Char pada Last Name', () => {
        cy.input(PageObject.lastNameField, firstName + "!@#")
        cy.klik(PageObject.saveBtn)
        cy.verifySnackbar(PageObject.snackBarError, PageObject.snackBarErrorText, value.lastNameInvalid)
    })

    it('Positive - Berhasil edit First Name dan Last Name', () => {
        cy.input(PageObject.firstNameField, firstName)
        cy.input(PageObject.lastNameField, lastName)
        cy.klik(PageObject.saveBtn)
        cy.verifySnackbar(PageObject.snackBarSuccess, PageObject.snackBarSuccessText, value.successUpdateMessage)
        cy.verifyContainText(PageObject.signedInUser, fullName)
    })

    it('Negative - Menginputkan Special Char pada First Name dan Last Name', () => {
        cy.input(PageObject.firstNameField, firstName + "!@#")
        cy.input(PageObject.lastNameField, lastName + "!@#")
        cy.klik(PageObject.saveBtn)
        cy.verifySnackbar(PageObject.snackBarError, PageObject.snackBarErrorText, value.firstNameInvalid)
        cy.verifySnackbar(PageObject.snackBarError, PageObject.snackBarErrorText, value.lastNameInvalid)
    })

})

describe('Edit Account Information - Email', () => {
    it('Negative - Edit Email dengan mengosongkan field email dan current password', () => {
        cy.klik(PageObject.checkboxChangeEmail)
        cy.verifyElementIsVisible(PageObject.emailField).clear()
        cy.klik(PageObject.saveBtn)
        cy.verifyErrorState(PageObject.emailField, PageObject.emailError, value.requiredFieldErrorText)
        cy.verifyErrorState(PageObject.currentPasswordField, PageObject.currentPasswordError, value.requiredFieldErrorText)
    })

    it('Negative - Edit Email tanpa input current password', () => {
        cy.klik(PageObject.checkboxChangeEmail)
        cy.input(PageObject.emailField, randomEmail)
        cy.klik(PageObject.saveBtn)
        cy.verifyErrorState(PageObject.currentPasswordField, PageObject.currentPasswordError, value.requiredFieldErrorText)
    })

    it('Negative - Edit Email dengan invalid email format', () => {
        cy.klik(PageObject.checkboxChangeEmail)
        cy.input(PageObject.emailField, randomEmail + "!!!")
        cy.klik(PageObject.saveBtn)
        cy.verifyErrorState(PageObject.emailField, PageObject.emailError, value.emailFormatValidation)
        cy.verifyErrorState(PageObject.currentPasswordField, PageObject.currentPasswordError, value.requiredFieldErrorText)
    })

    it('Negative - Edit Email dengan invalid password', () => {
        cy.klik(PageObject.checkboxChangeEmail)
        cy.input(PageObject.emailField, randomEmail)
        cy.input(PageObject.currentPasswordField, user.email)
        cy.klik(PageObject.saveBtn)
        cy.verifySnackbar(PageObject.snackBarError, PageObject.snackBarErrorText, value.wrongPasswordMessage)
    })

    it('Positive - Berhasil edit Email dan me-replace credential dengan email baru di users.json', () => {
        cy.klik(PageObject.checkboxChangeEmail)
        cy.input(PageObject.emailField, randomEmail)
        cy.input(PageObject.currentPasswordField, user.password)
        cy.klik(PageObject.saveBtn)
        cy.url().should('eq', value.loginPageURL)
        cy.verifySnackbar(PageObject.snackBarSuccess, PageObject.snackBarSuccessText, value.successUpdateMessage)
        cy.userLogin(randomEmail, user.password)
        // Update email in users.json
        cy.task('updateEmailInUsersJson', { randomEmail, randomPassword: user.password })

        cy.readFile('cypress/fixtures/myAccount/users.json').then((updatedData) => {
            const updatedEmail = updatedData[0].email;
        })
    })

})

describe('Edit Account Information - Password', () => {
    it('Negative - Edit password dengan mengosongkan semua field password', () => {
        cy.klik(PageObject.checkboxChangePassword)
        cy.klik(PageObject.saveBtn)
        cy.verifyErrorState(PageObject.currentPasswordField, PageObject.currentPasswordError, value.requiredFieldErrorText)
        cy.verifyErrorState(PageObject.newPasswordField, PageObject.newPasswordError, value.requiredFieldErrorText)
        cy.verifyErrorState(PageObject.passwordConfirmation, PageObject.passwordConfirmationError, value.requiredFieldErrorText)
    })

    it('Negative - Edit password dengan current password yg tidak sesuai', () => {
        cy.klik(PageObject.checkboxChangePassword)
        cy.input(PageObject.currentPasswordField, randomPassword)
        cy.input(PageObject.newPasswordField, randomPassword)
        cy.input(PageObject.passwordConfirmation, randomPassword)
        cy.klik(PageObject.saveBtn)
        cy.verifySnackbar(PageObject.snackBarError, PageObject.snackBarErrorText, value.wrongPasswordMessage)
    })

    it('Negative - Edit password dengan password confirmation yg tidak sesuai', () => {
        cy.klik(PageObject.checkboxChangePassword)
        cy.input(PageObject.currentPasswordField, randomPassword)
        cy.input(PageObject.newPasswordField, randomPassword)
        cy.input(PageObject.passwordConfirmation, user.password)
        cy.klik(PageObject.saveBtn)
        cy.verifyErrorState(PageObject.passwordConfirmation, PageObject.passwordConfirmationError, value.wrongConfirmationPassword)
    })

    it('Positive - Berhasil edit password dan me-replace credential dengan password baru di users.json ', () => {
        cy.klik(PageObject.checkboxChangePassword)
        cy.input(PageObject.currentPasswordField, user.password)
        cy.input(PageObject.newPasswordField, randomPassword)
        cy.input(PageObject.passwordConfirmation, randomPassword)
        cy.klik(PageObject.saveBtn)
        cy.url().should('eq', value.loginPageURL)
        cy.verifySnackbar(PageObject.snackBarSuccess, PageObject.snackBarSuccessText, value.successUpdateMessage)
        cy.userLogin(randomEmail, randomPassword)
        // Update email in users.json
        cy.task('updateEmailInUsersJson', { randomEmail, randomPassword })
    })

})

