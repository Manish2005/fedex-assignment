# FedEx Assignment - Manish Gharat

## Getting Started

### Running Locally

Run `npm start` for a dev server. Navigate to `http://localhost:4200/`. The app will automatically reload if you change
any of the source files.

### Build

Run `ng build` to build the project. The build artifacts will be stored in the `dist/` directory. Use the `--prod` flag
for a production build.

### Running unit tests

Run `npm run test` to execute the unit tests via [Karma](https://karma-runner.github.io).

------------------------------------------------------------------------

## Extra Dependencies Used

Apart from the packages that are installed by Angular CLI while creating a new Angular project, these are the extra
dependencies used:

- `@angular/flex-layout`: Provides sophisticated layout API using Flexbox CSS + MediaQuery.
- `@fortawesome/angular-fontawesome` and a few more extensions: Provides efficient way of including Font Awesome icons
  in Angular applications. Supports tree-shaking.
- `karma-mocha-reporter`: Dev dependency that provides a cleaner Unit tests report as compared to the default Angular
  reporter. See `screenshots/unit-tests.out.png` for details.
- `Roboto Web Font`: Included as an external CSS file via `index.html`. Used as the default font.

--------------------------------------------------------------------------

## Email Validations

Angular provides built-in email validators for both, Template Driven Forms and Reactive Forms. I have used Reactive Form
for this assignment. With Reactive Forms, the validations are defined in the component `.ts` file. Again, with Reactive
Forms, we can use the built-in email validator or create our own custom validator that uses RegEx to validate the email
value. Fot the purpose of this assignment I have used the built-in email validator that should work for most cases. For
cases where the allowed emails are to be limited (to a specific domain(s), for example), we can use custom validator
with RegEx.
