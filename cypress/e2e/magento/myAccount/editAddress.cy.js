import pageObject from "../../../support/myAccount/pageObject"
import users from '../../../fixtures/myAccount/users.json'
const value = require("../../../fixtures/myAccount/values.json")

const PageObject = new pageObject()
const user = users[0]
const telephone = "081291381921"
const company = "BUMN"
const street = "Jalan Assalamualaiku Waalaikumussalam"
const street2 = "Rumah Ibu Kos"
const street3 = "Rahasia"
const city = "Jakarta"
const postalCode = "67157"

beforeEach(() => {
    Cypress.config('defaultCommandTimeout', 15000); // Set timeout menjadi 10 detik untuk semua perintah

    //Login
    cy.visit('/')
    cy.login(user.email, user.password)
    cy.verifyContainText(PageObject.signedInUser, value.welcomeText)

    //Buka My Account 
    cy.klik(PageObject.chevronSignedInUser)
    cy.klik(PageObject.contextMenuMyAccount)
    cy.verifyContainText(PageObject.pageBase, value.myAccount)

    //masuk Edit Address 
    cy.klik(PageObject.manageAddressBtn)
})

describe('Edit Address', () => {
    it('Negative - Klik save tanpa mengisi required fields', () => {
        cy.get(PageObject.telephoneField).clear()
        cy.get(PageObject.streetAddressField).clear()
        cy.get(PageObject.cityField).clear()
        cy.get(PageObject.postalCodeField).clear()
        cy.klik(PageObject.saveAddressBtn)
        cy.verifyErrorState(PageObject.telephoneField, PageObject.telephoneFieldError, value.requiredFieldErrorText)
        cy.verifyErrorState(PageObject.streetAddressField, PageObject.streetAddressFieldError, value.requiredFieldErrorText)
        cy.verifyErrorState(PageObject.cityField, PageObject.cityFieldError, value.requiredFieldErrorText)
    })

    it('Mengisi semua fields', () => {
        cy.input(PageObject.companyField, company)
        cy.input(PageObject.telephoneField, telephone)
        cy.input(PageObject.streetAddressField, street)
        cy.input(PageObject.street2Field, street2)
        cy.input(PageObject.street3Field, street3)
        cy.input(PageObject.cityField, city)
        cy.get(PageObject.stateField).select('Alabama')
        cy.input(PageObject.postalCodeField, postalCode)
        cy.klik(PageObject.saveAddressBtn)
        cy.verifySnackbar(PageObject.snackBarSuccess, PageObject.snackBarSuccessText, value.successUpdateAddressMessage)
        cy.verifyContainText(PageObject.pageBase, value.addressBook)
        cy.verifyContainText(PageObject.defaultBillingAddress, company)
        cy.verifyContainText(PageObject.defaultBillingAddress, telephone)
        cy.verifyContainText(PageObject.defaultBillingAddress, street)
        cy.verifyContainText(PageObject.defaultBillingAddress, street2)
        cy.verifyContainText(PageObject.defaultBillingAddress, street3)
        cy.verifyContainText(PageObject.defaultBillingAddress, city)
        cy.verifyContainText(PageObject.defaultBillingAddress, postalCode)
    })

    it('Hanya mengisi required fields', () => {
        cy.get(PageObject.companyField).clear()
        cy.get(PageObject.street2Field).clear()
        cy.get(PageObject.street3Field).clear()
        cy.klik(PageObject.saveAddressBtn)
        cy.verifySnackbar(PageObject.snackBarSuccess, PageObject.snackBarSuccessText, value.successUpdateAddressMessage)
        cy.verifyContainText(PageObject.pageBase, value.addressBook)
        cy.verifyContainText(PageObject.defaultBillingAddress, telephone)
        cy.verifyContainText(PageObject.defaultBillingAddress, street)
        cy.verifyContainText(PageObject.defaultBillingAddress, city)
        cy.verifyContainText(PageObject.defaultBillingAddress, postalCode)
    })
})

