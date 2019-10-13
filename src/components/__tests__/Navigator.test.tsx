import * as React from 'react';
import { render } from '@testing-library/react';
import Navigator from '../Navigator';
import Wizard from '../Wizard';

it('renders Navigator component', () => {
  const { debug } = render(
    <Wizard>
      <Navigator />
    </Wizard>
  );
  debug();
});
