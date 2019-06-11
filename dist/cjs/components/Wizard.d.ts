import * as React from 'react';
import WalletConnect from '@walletconnect/browser';
import { View } from '../constants';
import { ConnectionResponse } from '../types';
export interface WizardProps {
    onConnect?: (response: ConnectionResponse) => void;
    onDisconnect?: () => void;
    walletConnectOpts?: any;
    brandName?: string;
    theme?: any;
}
export interface WizardState {
    currentView: View;
    walletConnector: WalletConnect | null;
    metaMaskAvailable: boolean;
}
declare class Wizard extends React.Component<WizardProps, WizardState> {
    private mounted;
    state: {
        currentView: View;
        walletConnector: null;
        metaMaskAvailable: boolean;
    };
    componentDidMount(): void;
    componentWillUnmount(): void;
    render(): JSX.Element;
    private createChangeViewHandler;
    private changeView;
    private handleMetaMaskConnect;
    private initWalletConnector;
}
export default Wizard;
