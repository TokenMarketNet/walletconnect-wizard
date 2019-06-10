import * as React from 'react';
import WalletConnect from '@walletconnect/browser';
import { View, DEFAULT_WALLET_CONNECT_OPTS } from '../constants';
import { createWalletConnector } from '../walletconnect';
import ConnectWalletView from './ConnectWalletView';
import InstallWalletView from './InstallWalletView';

export interface WizardProps {
    onConnect?: () => void;
    onDisconnect?: () => void;
    walletConnector?: WalletConnect;
    walletConnectOpts?: any;
    brandName?: string;
}
export interface WizardState {
    currentView: View;
    walletConnector: WalletConnect | null;
}

class Wizard extends React.Component<WizardProps, WizardState> {
    state = {
        currentView: View.ConnectWallet,
        walletConnector: null,
    }

    componentDidMount() {
        this.initWalletConnector();
    }

    render() {
        console.log('render');
        const { 
            currentView,
            walletConnector,
        } = this.state;
        const brandName = this.props.brandName || 'This application';

        return (
            <div className="walletconnect-wizard">
                {currentView === View.ConnectWallet ? (
                    <ConnectWalletView
                        walletConnector={walletConnector}
                        gotoInstallWalletView={this.createChangeViewHandler(View.InstallWallet)}
                    />
                ) : (currentView === View.InstallWallet) ? (
                    <InstallWalletView
                        brandName={brandName}
                        gotoConnectWalletView={this.createChangeViewHandler(View.ConnectWallet)}
                    />
                    ) : (currentView === View.Connected) ? (
                        <div>Connected!</div>
                    ) : ''}
            </div>
        )
    }

    private createChangeViewHandler = (view: View) => () => {
        this.changeView(view);
    }

    private changeView(view: View) {
        this.setState({
            currentView: view,
        });
    }

    private async initWalletConnector() {
        let {
            walletConnector,
        } = this.props;
        const {
            walletConnectOpts,
            onConnect,
            onDisconnect,
        } = this.props;

        if (!walletConnector) {
            // WalletConnect not given as props, we must init it
            const opts = {
                ...DEFAULT_WALLET_CONNECT_OPTS,
                ...(walletConnectOpts || {}),
            }
            walletConnector = await createWalletConnector(opts);
        }

        const onConnected = (error: any, payload: any) => {
            if (error) {
                throw error;
            }
            console.log('WalletConnect connected');
            if (onConnect) {
                onConnect(); // TODO: supply parameter
            }
            this.changeView(View.Connected);
        }

        const onDisconnected = (error: any, payload: any) => {
            if (error) {
                throw error;
            }
            console.log('WalletConnect disconnected');
            if (onDisconnect) {
                onDisconnect(); // TODO: supply parameter
            }
            this.changeView(View.ConnectWallet);
        }

        this.setState({
            walletConnector,
        })
        walletConnector.on('connect', onConnected);
        walletConnector.on('disconnect', onDisconnected);
    }
}

export default Wizard;
