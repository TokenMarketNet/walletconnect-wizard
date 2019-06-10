import * as React from 'react';
import ConnectWalletView from './ConnectWalletView';
import InstallWalletView from './InstallWalletView';
import { View } from '../constants';

export interface WizardProps {
    brandName?: string;
}
export interface WizardState {
    currentView: View;
}

class Wizard extends React.Component<WizardProps, WizardState> {
    state = {
        currentView: View.ConnectWallet,
    }

    private createChangeViewHandler = (view: View) => () => {
        this.setState({
            currentView: view,
        });
    }

    render() {
        const { 
            currentView
        } = this.state;
        const brandName = this.props.brandName || 'This application';

        return (
            <div className="walletconnect-wizard">
                {currentView === View.ConnectWallet ? (
                    <ConnectWalletView
                        gotoInstallWalletView={this.createChangeViewHandler(View.InstallWallet)}
                    />
                ) : (currentView === View.InstallWallet) ? (
                    <InstallWalletView
                        brandName={brandName}
                        gotoConnectWalletView={this.createChangeViewHandler(View.ConnectWallet)}
                    />
                ) : ''}
            </div>
        )
    }
}
export default Wizard;
