import basePage from "../../../support/basePage.js";
import reviewPage from "../../../support/pageObject/review.page.js";
const reviewsInfo = require('../../../fixtures/productReviews/reviews.json');
const userLogin = require('../../../fixtures/userLogin.json');

describe('Product Reviews Feature', () => {

  describe('Positive Case - Product Reviews Feature', () => {

    beforeEach( 'Success Login and Access Product', function () {
      basePage.open();
      basePage.verifyUrlBasePage();
      cy.login(userLogin.email, userLogin.password);
      reviewPage.clickWhatsNew();
      reviewPage.clickProductName();
    });

    it('Success Reviews an Product with 1 stars', () => {
      reviewPage.clickTabReviews();
      reviewPage.clickOneStars();
      reviewPage.inputNickname(reviewsInfo.nickname);
      reviewPage.inputSummary(reviewsInfo.summary);
      reviewPage.inputReview(reviewsInfo.review);
      reviewPage.clickSubmitReview();
      reviewPage.verifySuccessMessage(reviewsInfo.success_message);
    });

    it('Success Reviews an Product with 2 stars', () => {
      reviewPage.clickTabReviews();
      reviewPage.clickTwoStars();
      reviewPage.inputNickname(reviewsInfo.nickname);
      reviewPage.inputSummary(reviewsInfo.summary);
      reviewPage.inputReview(reviewsInfo.review);
      reviewPage.clickSubmitReview();
      reviewPage.verifySuccessMessage(reviewsInfo.success_message);
    });
    
    it('Success Reviews an Product with 3 stars', () => {
      reviewPage.clickTabReviews();
      reviewPage.clickThreeStars();
      reviewPage.inputNickname(reviewsInfo.nickname);
      reviewPage.inputSummary(reviewsInfo.summary);
      reviewPage.inputReview(reviewsInfo.review);
      reviewPage.clickSubmitReview();
      reviewPage.verifySuccessMessage(reviewsInfo.success_message);
    });

    it('Success Reviews an Product with 4 stars', () => {
      reviewPage.clickTabReviews();
      reviewPage.clickFourStars();
      reviewPage.inputNickname(reviewsInfo.nickname);
      reviewPage.inputSummary(reviewsInfo.summary);
      reviewPage.inputReview(reviewsInfo.review);
      reviewPage.clickSubmitReview();
      reviewPage.verifySuccessMessage(reviewsInfo.success_message);
    });

    it('Success Reviews an Product with 5 stars', () => {
      reviewPage.clickTabReviews();
      reviewPage.clickFiveStars();
      reviewPage.inputNickname(reviewsInfo.nickname);
      reviewPage.inputSummary(reviewsInfo.summary);
      reviewPage.inputReview(reviewsInfo.review);
      reviewPage.clickSubmitReview();
      reviewPage.verifySuccessMessage(reviewsInfo.success_message);
    });


  })

  describe.only('Negative Case - Product Reviews Feature', () => {
    
    beforeEach( 'Success Login and Access Product', function () {
      basePage.open();
      basePage.verifyUrlBasePage();
      cy.login(userLogin.email, userLogin.password);
      reviewPage.clickWhatsNew();
      reviewPage.clickProductName();
    });

    it('Failed Review an Product all Form is Empty', () => {
      reviewPage.clickTabReviews();
      reviewPage.clearNicknameField();
      reviewPage.clearSummaryField();
      reviewPage.clearReviewField();
      reviewPage.clickSubmitReview();
      reviewPage.verifyErrorMessageRatings(reviewsInfo.rating_message);
      reviewPage.verifyErrorMessageNickname(reviewsInfo.field_message);
      reviewPage.verifyErrorMessageSummary(reviewsInfo.field_message);
      reviewPage.verifyErrorMessageReviews(reviewsInfo.field_message)
    });

    it('Failed Review an Product Have No Rating', () => {
      reviewPage.clickTabReviews();
      reviewPage.inputNickname(reviewsInfo.nickname);
      reviewPage.inputSummary(reviewsInfo.summary);
      reviewPage.inputReview(reviewsInfo.review);
      reviewPage.clickSubmitReview();
      reviewPage.verifyErrorMessageRatings(reviewsInfo.rating_message);
    });

    it('Failed Review an Product Have No Nickname', () => {
      reviewPage.clickTabReviews();
      reviewPage.clickFiveStars();
      reviewPage.clearNicknameField();
      reviewPage.inputSummary(reviewsInfo.summary);
      reviewPage.inputReview(reviewsInfo.review);
      reviewPage.clickSubmitReview();
      reviewPage.verifyErrorMessageNickname(reviewsInfo.field_message);
    });

    it('Failed Review an Product Have No Summary', () => {
      reviewPage.clickTabReviews();
      reviewPage.clickFiveStars();
      reviewPage.inputNickname(reviewsInfo.nickname);
      reviewPage.clearSummaryField();
      reviewPage.inputReview(reviewsInfo.review);
      reviewPage.clickSubmitReview();
      reviewPage.verifyErrorMessageSummary(reviewsInfo.field_message);
    });

    it('Failed Review an Product Have No Review', () => {
      reviewPage.clickTabReviews();
      reviewPage.clickFiveStars();
      reviewPage.inputNickname(reviewsInfo.nickname);
      reviewPage.inputSummary(reviewsInfo.summary);
      reviewPage.clearReviewField();
      reviewPage.clickSubmitReview();
      reviewPage.verifyErrorMessageReviews(reviewsInfo.field_message)
    });

  })
})