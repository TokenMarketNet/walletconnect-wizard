import * as React from 'react';
import { storiesOf } from '@storybook/react';
import Wizard from '../src';
import { ConnectionResponse } from '../src/types';

storiesOf('Wizard', module)
    .add('example', () => (
        <Wizard
            onConnect={(response: ConnectionResponse) => {
                alert(`You are connected with: ${response.type}`);
                response.provider.sendAsync({
                    method: 'eth_accounts',
                    params: [],
                }, (error: any, params: any) => {
                    const account = params.result[0];
                    alert(`Your ethereum account is ${account}`);
                });
            }}
        />
    ));
