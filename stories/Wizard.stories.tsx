import * as React from 'react';
import { storiesOf } from '@storybook/react';
import Wizard from '../src';

storiesOf('Wizard', module)
    .add('example', () => (
        <Wizard />
    ));
