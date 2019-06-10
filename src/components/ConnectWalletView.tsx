import * as React from 'react';
import WalletConnect from '@walletconnect/browser';
import WalletConnectQrCode from './WalletConnectQrCode';

export interface ConnectWalletViewProps {
    walletConnector: WalletConnect | null | undefined;
    gotoInstallWalletView: () => void;
}
export default (props: ConnectWalletViewProps) => {
    const onGotoInstallWalletView = (e: React.SyntheticEvent) => {
        e.preventDefault();
        props.gotoInstallWalletView();
    }
    const {
        walletConnector
    } = props;

    return (
        <div>
            <div>
                In order to use this service you need to have a compatible wallet{' '}
                application. The wallet securely stores and transfers your assets.
            </div>
            <div
                style={{ width: 300 }}
            >
                <h2>Connect wallet</h2>
                {!!walletConnector && (
                    <WalletConnectQrCode
                        walletConnector={walletConnector}
                    />
                )}
                <button onClick={onGotoInstallWalletView}>
                    See compatible wallets
                </button>
            </div>
            <div>
                <h2>Install wallet</h2>
                <div>Big icon about connecting </div>
                <button onClick={onGotoInstallWalletView}>
                    See supported wallets
                </button>
            </div>
        </div>
    )
}
