

# Project description

 This is an application developed in a second version of Bootcamp called DevSuperior as a challenge to complete the event. The MovieFlix system consists of a movie bank, which can be listed and rated by users. Users can be visitors (VISITOR) and members (MEMBER). Only member users can enter ratings into the system. A user has a name, email and password, and the email is their username. Each movie has a title, subtitle, an image, year of release, synopsis, and a genre. Member users can register ratings for the movies. The same member user can leave more than one rating for the same movie.

## What is inside?

This project was developed using the following technologies:

- [TypeScript](https://www.typescriptlang.org/)
- [ReactJS](https://reactjs.org/)
- [Sass](https://sass-lang.com/)
- [Bootstrap](https://getbootstrap.com/)
- [React Skeleton](https://skeletonreact.com/)
- [Jest](https://jestjs.io/)
- [React Testing Library](https://testing-library.com/docs/react-testing-library/intro)
- [Cypress](https://www.cypress.io/)
- [Eslint](https://eslint.org/)
- [Prettier](https://prettier.io/)

## Commands

- `build`: creates the production build version
- `start`: starts a simple server with the build production code
- `lint`: runs the linter in all components and pages
- `test`: runs jest to test all components and pages
- `watch`: runs jest in watch mode
- `cy:open`: open Cypress UI
- `cy:run`: runs cypress to test all components and pages (E2E)
- `test:e2e`: watching http protocol response 200 in `localhost:3000` to open cypress UI
- `test:e2e:ci`: watching response 200 in `localhost:3000` to runs all test using cypress
- `typecheck`: start type check
- `coverage`: runs all tests using jest and show tests coverage

# Getting Started with Create React App

This project was bootstrapped with [Create React App](https://github.com/facebook/create-react-app).

## Available Scripts

In the project directory, you can run:

### `yarn start`

Runs the app in the development mode.\
Open [http://localhost:3000](http://localhost:3000) to view it in the browser.

The page will reload if you make edits.\
You will also see any lint errors in the console.

### `yarn test`

Launches the test runner in the interactive watch mode.\
See the section about [running tests](https://facebook.github.io/create-react-app/docs/running-tests) for more information.

### `yarn build`

Builds the app for production to the `build` folder.\
It correctly bundles React in production mode and optimizes the build for the best performance.

The build is minified and the filenames include the hashes.\
Your app is ready to be deployed!

See the section about [deployment](https://facebook.github.io/create-react-app/docs/deployment) for more information.

### `yarn eject`

**Note: this is a one-way operation. Once you `eject`, you can’t go back!**

If you aren’t satisfied with the build tool and configuration choices, you can `eject` at any time. This command will remove the single build dependency from your project.

Instead, it will copy all the configuration files and the transitive dependencies (webpack, Babel, ESLint, etc) right into your project so you have full control over them. All of the commands except `eject` will still work, but they will point to the copied scripts so you can tweak them. At this point you’re on your own.

You don’t have to ever use `eject`. The curated feature set is suitable for small and middle deployments, and you shouldn’t feel obligated to use this feature. However we understand that this tool wouldn’t be useful if you couldn’t customize it when you are ready for it.

## Learn More

You can learn more in the [Create React App documentation](https://facebook.github.io/create-react-app/docs/getting-started).

To learn React, check out the [React documentation](https://reactjs.org/).
