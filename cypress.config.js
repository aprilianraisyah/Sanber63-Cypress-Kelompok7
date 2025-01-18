const { defineConfig } = require("cypress");
const fs = require('fs');
const path = require('path');

module.exports = defineConfig({
  e2e: {
    baseUrl: 'https://magento.softwaretestingboard.com/customer/account/login/',
    watchForFileChanges: false,
    setupNodeEvents(on, config) {
      on('task', {
        updateEmailInUsersJson({ randomEmail, randomPassword }) {
            const filePath = path.resolve('cypress/fixtures/myAccount/users.json'); // Path to your JSON file
            const users = JSON.parse(fs.readFileSync(filePath, 'utf8'));

            // Update email in the JSON file
            users[0].email = randomEmail;
            users[0].password = randomPassword; // Update password if necessary

            // Write the updated content back to the file
            fs.writeFileSync(filePath, JSON.stringify(users, null, 2), 'utf8');
            return null; // Task successful
        }
    });
    },
  },
  viewportWidth: 1280,
  viewportHeight: 720,
});
