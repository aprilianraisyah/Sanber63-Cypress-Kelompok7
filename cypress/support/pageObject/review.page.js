class reviewPage {
    whatsNew = '#ui-id-3';
    productItems = '.products-grid > .product-items';
    productName = ':nth-child(1) > .product-item-info > .product-item-photo > .product-image-container > .product-image-wrapper > .product-image-photo';
    reviewsTab = '#tab-label-reviews-title';
    reviewForm = '#review-form';
    fiveStars = '#Rating_5_label';
    fourStars = '#Rating_4_label';
    threeStars = '#Rating_3_label';
    twoStars = '#Rating_2_label';
    oneStars = '#Rating_1_label';
    nicknameField = 'input[id=nickname_field]';
    summaryField = 'input[id=summary_field]';
    reviewField = 'textarea[id=review_field]';
    submitReview = '.actions-primary > .action';
    successMessage = 'div[data-ui-id=message-success]'; // You submitted your review for moderation.
    ratingError = 'div.mage-error:nth-of-type(2)';
    nicknameFieldError = 'div[id=nickname_field-error]';
    summaryFieldError = 'div[id=summary_field-error]';
    reviewFieldError = 'div[id=review_field-error]';

    
    // Action & Assertion

    clickWhatsNew () {
        cy.get(this.whatsNew).click();
    }

    clickProductName () {
        cy.get(this.productItems).scrollIntoView();
        cy.get(this.productName).click();
    }

    clickTabReviews () {
        cy.get(this.reviewsTab).click();
        cy.wait(2000);
        cy.get(this.reviewForm).scrollIntoView();
    }

    scrollReviewForm () {
        cy.get(this.reviewForm).scrollIntoView();
    }

    clickFiveStars () {
        cy.get(this.fiveStars).click({force: true});
    }

    clickFourStars () {
        cy.get(this.fourStars).click({force: true});
    }

    clickThreeStars () {
        cy.get(this.threeStars).click({force: true});
    }

    clickTwoStars () {
        cy.get(this.twoStars).click({force: true});
    }

    clickOneStars () {
        cy.get(this.oneStars).click({force: true});
    }

    inputNickname (nickname) {
        cy.inputText(this.nicknameField, nickname);
    }

    clearNicknameField () {
        cy.get(this.nicknameField).clear();
    }

    inputSummary (summary) {
        cy.inputText(this.summaryField, summary);
    }

    clearSummaryField () {
        cy.get(this.summaryField).clear();
    }

    inputReview (review) {
        cy.inputText(this.reviewField, review);
    }

    clearReviewField () {
        cy.get(this.reviewField).clear();
    }

    clickSubmitReview () {
        cy.get(this.submitReview).click({force: true});
    }

    verifySuccessMessage (message) {
        cy.get(this.successMessage).should('include.text', message)
    }

    verifyErrorMessageRatings (errorMessage) {
        cy.get(this.ratingError).should('have.text', errorMessage)
    }

    verifyErrorMessageNickname (errorMessage) {
        cy.get(this.nicknameFieldError).should('be.visible')
        cy.get(this.nicknameFieldError).should('have.text', errorMessage)
    }

    verifyErrorMessageSummary (errorMessage) {
        cy.get(this.summaryFieldError).should('be.visible')
        cy.get(this.summaryFieldError).should('have.text', errorMessage)
    }

    verifyErrorMessageReviews (errorMessage) {
        cy.get(this.reviewFieldError).should('be.visible')
        cy.get(this.reviewFieldError).should('have.text', errorMessage)
    }
}

export default new reviewPage();