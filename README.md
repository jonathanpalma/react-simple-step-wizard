<div align="center">
  <h1>react-simple-step-wizard 🧙</h1>

  <p>A simple and composable step wizard in React! Made with ❤ in El Salvador 🇸🇻</p>
</div>

<hr />

[![Version][version-badge]][package]
[![Build][build-badge]][build]
[![Install Size][size-badge]][package-size]
[![Downloads][downloads-badge]][npmcharts]
[![PRs Welcome][prs-badge]][prs]
[![Commitizen friendly][cz-badge]][cz]
[![MIT License][license-badge]][license]

[![Watch on GitHub][github-watch-badge]][github-watch]
[![Star on GitHub][github-star-badge]][github-star]
[![Tweet][twitter-badge]][twitter]

## Demo

[Click here](https://jonathanpalma.github.io/react-simple-step-wizard/) to see a live demo!

## Getting Started

### Installation

```
npm install -S react-simple-step-wizard
```

### Usage

```javascript
import Wizard from 'react-simple-step-wizard';
import React, { Component } from 'react';

const Step1 = () => <div>This is Step 1</div>;
const Step2 = () => <div>This is Step 2</div>;
const Step3 = () => <div>This is Step 3</div>;
const Step4 = () => <div>This is Step 4</div>;
const Step5 = () => <div>This is Step 5</div>;
const Step6 = () => <div>This is Step 6</div>;
const MyStepTracker = ({ currentStep = 0, steps = [] }) => (
  <div>
    <p>Current step is: {steps[currentStep]}</p>
  </div>
);
const MyNavigator = ({
  getFirstStepProps,
  getLastStepProps,
  getNextStepProps,
  getPrevStepProps,
}) => (
  <div>
    <button type="button" {...getFirstStepProps()}>
      &lt;&lt; First
    </button>
    <button type="button" {...getPrevStepProps()}>
      &lt; Back
    </button>
    <button type="button" {...getNextStepProps()}>
      Next &gt;
    </button>
    <button type="button" {...getLastStepProps()}>
      Last &gt;&gt;
    </button>
  </div>
);

class App extends Component {
  state = { isCustomizeVisible: true };

  handleStepChange = currentStep => {
    console.log(currentStep);
  };

  onClick = () => {
    this.setState(prevState => ({
      isCustomizeVisible: !prevState.isCustomizeVisible,
    }));
  };

  render() {
    const { isCustomizeVisible } = this.state;
    return (
      <div>
        <h1>react-simple-step-wizard demo</h1>
        <div>
          <p>Step 3 visible: {isCustomizeVisible.toString()}</p>
          <button type="button" onClick={this.onClick}>
            Toggle Step 3
          </button>
        </div>
        <Wizard onStepChange={this.handleStepChange}>
          <Wizard.StepTracker />
          <Wizard.Steps>
            <Step1 stepLabel="Search" />
            <Step2 stepLabel="Select" />
            <Step3 stepLabel="Customize" stepCondition={isCustomizeVisible} />
            <Step4 stepLabel="Review" />
            <Wizard.StepGroup stepLabel="Submit">
              <Step5 />
              <Step6 />
            </Wizard.StepGroup>
          </Wizard.Steps>
          {/* You can implement your custom components via render-props */}
          <Wizard.StepTracker>
            {stepTrackerProps => <MyStepTracker {...stepTrackerProps} />}
          </Wizard.StepTracker>
          <Wizard.Navigator>
            {navigatorProps => <MyNavigator {...navigatorProps} />}
          </Wizard.Navigator>
        </Wizard>
      </div>
    );
  }
}

export default App;
```

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
[build-badge]: https://img.shields.io/circleci/build/gh/jonathanpalma/react-simple-step-wizard?style=flat-square
[build]: https://circleci.com/gh/jonathanpalma/react-simple-step-wizard
[cz-badge]: https://img.shields.io/badge/commitizen-friendly-brightgreen.svg?style=flat-square
[cz]: http://commitizen.github.io/cz-cli/
[size-badge]: https://flat.badgen.net/packagephobia/install/react-simple-step-wizard
[version-badge]: https://img.shields.io/npm/v/react-simple-step-wizard.svg?style=flat-square
[github-watch-badge]: https://img.shields.io/github/watchers/jonathanpalma/react-simple-step-wizard.svg?style=social
[github-watch]: https://github.com/jonathanpalma/react-simple-step-wizard/watchers
[github-star-badge]: https://img.shields.io/github/stars/jonathanpalma/react-simple-step-wizard.svg?style=social
[github-star]: https://github.com/jonathanpalma/react-simple-step-wizard/stargazers
[twitter]: https://twitter.com/intent/tweet?text=Check%20out%20react-simple-step-wizard!%20https://github.com/jonathanpalma/react-simple-step-wizard
[twitter-badge]: https://img.shields.io/twitter/url/https/github.com/jonathanpalma/react-simple-step-wizard.svg?style=social
