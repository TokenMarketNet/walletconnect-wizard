import * as React from 'react';
import WalletConnect from '@walletconnect/browser';
import { View, DEFAULT_WALLET_CONNECT_OPTS } from '../constants';
import { ConnectionResponse } from '../types';
import { createWalletConnector, createWalletConnectConnectionResponse } from '../walletconnect';
import ConnectWalletView from './ConnectWalletView';
import InstallWalletView from './InstallWalletView';
import { ThemeWrapper } from './theme';

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
}

class Wizard extends React.Component<WizardProps, WizardState> {
    private mounted = false;

    state = {
        currentView: View.ConnectWallet,
        walletConnector: null,
    }

    componentDidMount() {
        this.mounted = true;
        this.initWalletConnector();
    }

    componentWillUnmount() {
        this.mounted = false;
    }

    render() {
        const { 
            currentView,
            walletConnector,
        } = this.state;
        const brandName = this.props.brandName || 'This application';

        return (
            <ThemeWrapper
                theme={this.props.theme}
                className="walletconnect-wizard"
            >
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
            </ThemeWrapper>
        )
    }

    private createChangeViewHandler = (view: View) => () => {
        this.changeView(view);
    }

    private changeView(view: View) {
        if(this.mounted) {
            this.setState({
                currentView: view,
            });
        }
    }

    private async initWalletConnector() {
        console.log('DEBUG: initWalletConnector');
        const {
            walletConnectOpts,
            onConnect,
            onDisconnect,
        } = this.props;

        const opts = {
            ...DEFAULT_WALLET_CONNECT_OPTS,
            ...(walletConnectOpts || {}),
        }
        const walletConnector = await createWalletConnector(opts);

        this.setState({
            walletConnector,
        });

        const handleConnect = () => {
            console.log("DEBUG: WalletConnect handleConnect");
            const response = createWalletConnectConnectionResponse(walletConnector);
            this.changeView(View.Connected);
            if (onConnect) {
                onConnect(response);
            }
        }

        const onConnected = (error: any, payload: any) => {
            if (error) {
                throw error;
            }
            console.log('DEBUG: WalletConnect connected', payload);
            handleConnect();
        }

        const onDisconnected = (error: any, payload: any) => {
            if (error) {
                throw error;
            }
            console.log('DEBUG: WalletConnect disconnected');

            // We need to init WalletConnect again, because a single object
            // can only handle one session
            if(this.mounted) {
                this.setState({
                    currentView: View.ConnectWallet,
                    walletConnector: null,
                })
                window.setTimeout(() => {
                    this.initWalletConnector();
                });
            }

            if (onDisconnect) {
                onDisconnect();
            }
        }

        walletConnector.on('disconnect', onDisconnected);

        if(walletConnector.connected) {
            // Handle the case where we are connected already (ie. because page refresh)
            // we could also kill the session here and then set up the connection listener
            console.log("DEBUG: WalletConnect already connected");
            handleConnect();
        } else {
            walletConnector.on('connect', onConnected);
        }
    }
}

export default Wizard;
