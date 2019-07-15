import * as React from 'react';
import WalletConnect from '@walletconnect/browser';
import { View, DEFAULT_WALLET_CONNECT_OPTS } from '../constants';
import { ConnectionResponse } from '../types';
import { createWalletConnector, createWalletConnectConnectionResponse } from '../walletconnect';
import { isMetaMaskInstalled, connectMetaMask } from '../metamask';
import ConnectWalletView from './ConnectWalletView';
import InstallWalletView from './InstallWalletView';
import { ThemeWrapper } from './theme';

export interface WizardProps {
    onConnect?: (response: ConnectionResponse) => void;
    onDisconnect?: () => void;
    walletConnectOpts?: any;
    theme?: any;
    persistConnection?: boolean;
    texts?: Record<string, string>;
}
export interface WizardState {
    currentView: View;
    walletConnector: WalletConnect | null;
    metaMaskAvailable: boolean; 
}

class Wizard extends React.Component<WizardProps, WizardState> {
    private mounted = false;

    state = {
        currentView: View.ConnectWallet,
        walletConnector: null,
        metaMaskAvailable: false,
    }

    componentDidMount() {
        this.mounted = true;
        this.initWalletConnector();
        this.setState({
            metaMaskAvailable: isMetaMaskInstalled(),
        });

        // development purposes
        const match = window.location.search.match(/walletConnectWizardView=([a-zA-Z\-\_]+)/)
        if (match) {
            this.setState({
                currentView: match[1] as View,
            });
        }
    }

    componentWillUnmount() {
        this.mounted = false;
    }

    render() {
        const { 
            currentView,
            walletConnector,
            metaMaskAvailable,
        } = this.state;
        const texts = {
            brandName:  'This application',

            connectWalletHeader: (
                'WalletConnect demo'
            ),

            blockchainName: 'Ethereum',

            hasWalletHelp: 'Scan the QR code with your mobile wallet or click the MetaMask button to get started.',
            hasWalletHelpNoMetaMask: 'Scan the QR code with your mobile wallet or install the MetaMask extension to get started.',

            noWalletHelp: 'In order to user this service you need to have a wallet application for Ethereum blockchain installed.',

            ...(this.props.texts || {})
        };

        return (
            <ThemeWrapper
                theme={this.props.theme}
                className="walletconnect-wizard"
            >
                {currentView === View.ConnectWallet ? (
                    <ConnectWalletView
                        walletConnector={walletConnector}
                        metaMaskAvailable={metaMaskAvailable}
                        handleMetaMaskConnect={this.handleMetaMaskConnect}
                        gotoInstallWalletView={this.createChangeViewHandler(View.InstallWallet)}
                        headerText={texts.connectWalletHeader}
                        blockchainName={texts.blockchainName}
                        noWalletHelp={texts.noWalletHelp}
                        hasWalletHelp={texts.hasWalletHelp}
                        hasWalletHelpNoMetaMask={texts.hasWalletHelpNoMetaMask}
                    />
                ) : (currentView === View.InstallWallet) ? (
                    <InstallWalletView
                        brandName={texts.brandName}
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

    private handleMetaMaskConnect = async () => {
        console.log("DEBUG: handleMetaMaskConnect");
        const {
            onConnect
        } = this.props;
        try {
            const response = await connectMetaMask();
            this.changeView(View.Connected);
            // TODO: should we handle disconnects here somehow

            if (onConnect) {
                onConnect(response);
            }
        } catch (e) {
            console.error("MetaMask connection request denied");
        }
    }

    private async initWalletConnector() {
        console.log('DEBUG: initWalletConnector');
        let { walletConnectOpts } = this.props;
        const {
            onConnect,
            onDisconnect,
            persistConnection,
        } = this.props;

        walletConnectOpts = {
            ...DEFAULT_WALLET_CONNECT_OPTS,
            ...(walletConnectOpts || {}),
        }
        const walletConnector = await createWalletConnector(walletConnectOpts, {
            persistConnection
        });

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

        if(walletConnector.connected && persistConnection) {
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
