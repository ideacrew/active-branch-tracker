# SonOfYellr

Welcome! You've found the repository for SonOfYellr. In order to develop with this codebase, you need have Node.js >= 12.x installed. Install the project dependencies with `npm install`.

## Develop Locally

Start by serving the Angular application by running `npm run start`. In order to serve data locally run the Firebase emulators with `npx firebase emulators:start`. Finally, seed the db with `npm run seed:db`.


## Testing Firebase

Firebase has a set of emulators to run their cloud-based services locally. This greatly helps the TDD story since we don't need to deploy something in order to test it. There are a few different "stories" to testing with the emulators:
1. Running the test suite locally
2. Running the test suite in CI
3. Developing the test suite

### Running the Test Suite Locally
___

**Test Suite for Security Rules:** Unit testing the firestore security rules is very simple. Simply `cd functions` and `npm run test:ci:rules`. This action will transpile the functions TypeScript to JavaScript, run the emulators, and finally run the test suite for security rules.

**Test Suite for Functions:** Unit testing the cloud functions is just as easy as testing rules. Switch to the functions directory (`cd functions`) and `npm run test:ci:functions`. Similar to testing rules, this will transpile the TypeScript, start the emulators, run the functions test suite and then stop the process.

### Running the Test Suite in CI
___
The test suite will automatically run in GitHub Actions. In order to replicate this process locally: `cd functions` then `npm run test:ci`


