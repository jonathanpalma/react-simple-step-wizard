<div align="center">
  <h1>react-simple-step-wizard 🧙</h1>

  <p>A simple and composable step wizard in React!</p>
</div>

<hr />

[![Version][version-badge]][package]
[![Install Size][size-badge]][package-size]
[![Downloads][downloads-badge]][npmcharts]
[![PRs Welcome][prs-badge]][prs]
[![ISC License][license-badge]][license]

[![Watch on GitHub][github-watch-badge]][github-watch]
[![Star on GitHub][github-star-badge]][github-star]
[![Tweet][twitter-badge]][twitter]

## Getting Started

### How to install it in your app?

```
npm install -S react-simple-step-wizard
```

<!-- 
This would be the desired API at least for v1, then it will support hooks and can change

### How to use it in your app?

```javascript
import React, { Component } from 'react';
import Wizard from 'react-simple-step-wizard';

const Step1 = () => <div>This is Step 1</div>;
const Step2 = () => <div>This is Step 2</div>;
const Step3 = () => <div>This is Step 3</div>;
const Step4 = () => <div>This is Step 4</div>;
const Step5 = () => <div>This is Step 5</div>;
const MyStepTracker = ({ currentStep, steps }) => <div>To be implemented</div>;
const MyNavigator = ({ goToPreviousStep, goToNextStep }) => (
  <div>To be implemented</div>
);

class App extends Component {
  render() {
    return (
      <div>
        <h1>react-simple-step-wizard demo</h1>
        <Wizard>
          <Wizard.StepTracker>
            {({ currentStep, steps }) => (
              <MyStepTracker currentStep={currentStep} steps={steps} />
            )}
          </Wizard.StepTracker>

          <Wizard.Steps onStepChange={() => {}} isLoading={false}>
            <Step1 />
            <Step2 />
            <Wizard.StepGroup>
              <Step3 />
              <Step4 />
            </Wizard.StepGroup>
            <Step5 />
          </Wizard.Steps>

          <Wizard.Navigator>
            {({ goToPreviousStep, goToNextStep }) => (
              <MyNavigator
                goToPreviousStep={goToPreviousStep}
                goToNextStep={goToNextStep}
              />
            )}
          </Wizard.Navigator>
        </Wizard>
      </div>
    );
  }
}
``` -->

## Roadmap

### V1

Provide an accessible and composable API to be used with older react versions that don't support hooks.

### V2

Rewrite lib core and expose some of the APIs using react hooks.

## License

MIT © [jonathanpalma](https://github.com/jonathanpalma)

[downloads-badge]: https://img.shields.io/npm/dm/react-simple-step-wizard.svg?style=flat-square
[license-badge]: https://img.shields.io/npm/l/react-simple-step-wizard.svg?style=flat-square
[license]: https://github.com/jonathanpalma/react-simple-step-wizard/blob/master/LICENSE
[npmcharts]: http://npmcharts.com/compare/react-simple-step-wizard
[package-size]: https://packagephobia.now.sh/result?p=react-simple-step-wizard
[package]: https://www.npmjs.com/package/react-simple-step-wizard
[prs-badge]: https://img.shields.io/badge/PRs-welcome-brightgreen.svg?style=flat-square
[prs]: http://makeapullrequest.com
[size-badge]: https://flat.badgen.net/packagephobia/install/react-simple-step-wizard
[version-badge]: https://img.shields.io/npm/v/react-simple-step-wizard.svg?style=flat-square
[github-watch-badge]: https://img.shields.io/github/watchers/jonathanpalma/react-simple-step-wizard.svg?style=social
[github-watch]: https://github.com/jonathanpalma/react-simple-step-wizard/watchers
[github-star-badge]: https://img.shields.io/github/stars/jonathanpalma/react-simple-step-wizard.svg?style=social
[github-star]: https://github.com/jonathanpalma/react-simple-step-wizard/stargazers
[twitter]: https://twitter.com/intent/tweet?text=Check%20out%20react-simple-step-wizard!%20https://github.com/jonathanpalma/react-simple-step-wizard
[twitter-badge]: https://img.shields.io/twitter/url/https/github.com/jonathanpalma/react-simple-step-wizard.svg?style=social
