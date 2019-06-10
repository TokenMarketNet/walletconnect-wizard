import * as React from 'react';

export interface ConnectWalletViewProps {
    gotoInstallWalletView: () => void;
}
export default ({ gotoInstallWalletView }: ConnectWalletViewProps) => {
    const onGotoInstallWalletView = (e: React.SyntheticEvent) => {
        e.preventDefault();
        gotoInstallWalletView();
    }

    return (
        <div>
            <div>
                In order to use this service you need to have a compatible wallet{' '}
                application. The wallet securely stores and transfers your assets.
            </div>
            <div>
                <h2>Connect wallet</h2>
                <div>WalletConnect qr code goes here</div>
                <button onClick={onGotoInstallWalletView}>
                    See compatible wallets
                </button>
            </div>
            <div>
                <h2>Install wallet</h2>
                <div>Big icon about connecting </div>
                <div>WalletConnect qr code modal goes here</div>
            </div>
        </div>
    )
}
