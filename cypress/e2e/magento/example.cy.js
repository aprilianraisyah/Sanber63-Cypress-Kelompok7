import pageObject from "../../support/myAccount/pageObject"
import users from '../../fixtures/myAccount/users.json'
import { faker } from '@faker-js/faker'

const PageObject = new pageObject()
const user = users[0]
const firstName = faker.name.firstName()
const lastName = faker.name.lastName()
const randomEmail = faker.internet.email();
const randomPassword = faker.internet.password(12, true);

describe('Edit Account Information', () => {
  it('Edit First Name', () => {
      //Login
      cy.visit('/')
      cy.login(user.email, user.password)
      cy.verifyContainText(PageObject.signedInUser, "Welcome")

      //Buka My Account 
      cy.get(':nth-child(2) > .customer-welcome > .customer-name > .action').click()
      cy.get(':nth-child(2) > .customer-welcome > .customer-menu > .header > :nth-child(1) > a').click()
      cy.verifyContainText('.base', "My Account")

  })})