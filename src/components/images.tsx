import * as React from 'react';
import SVG from 'svg-inline-react';
import * as metaMaskLogo from '../assets/metamask-fox.svg';
import walletConnectLogoDataUri  from '../assets/walletconnect-logo';

export const MetaMaskLogo = () => <SVG src={metaMaskLogo} />;

export const WalletConnectLogo = (props: any) => <img src={walletConnectLogoDataUri} {...props} />;
