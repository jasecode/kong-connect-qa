<!-- GETTING STARTED -->
## Getting Started

### Prerequisites
* npm
  ```sh
  npm install npm@latest -g
  ```
* Create a .env file with the following credentials for https://konnect.konghq.com
  ```sh
  USERNAME=<email>
  PASSWORD=<password>
  ENVIRONMENT=production
  ```


### Installation

_Below is an example of how you can instruct your audience on installing and setting up your app. This template doesn't rely on any external dependencies or services._

1. Clone the repo
   ```sh
   git clone git@github.com:jasecode/kong-connect-qa.git
   ```
2. Install NPM packages
   ```sh
   npm install
   ```
3. Run tests
   ```js
   npm run test:e2e
   ```

### Design Consideration
* Chosen to use Cypress due to fast setup, and a faster feedback loop of debugging when tests go wrong.

* Cypress has easy configurability, commands.js for custom commands, and easy way to make requests/interceptions.

* Added a `.env` file configuration - so we don't check in username and password to the repo for security reasons.

* Used API to delete Service - for faster cleanup. 

Things to improve
* Refactor to methods
* Page Object - for easier reuse of selectors, methods etc.
* Integrate fixtures to differ between environments (prod, staging, preprod).
* Debug why 'login via API' doesn't work - use that to login to reduce test runtime.
* Intercept the responses to get the 'serviceId' instead of doing the URL workaround to get the 'serviceId'.