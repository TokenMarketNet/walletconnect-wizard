import * as React from 'react';

export interface InstallWalletViewProps {
    brandName: string;
    gotoConnectWalletView: () => void;
}
export default (props: InstallWalletViewProps) => {
    const onGotoConnectWalletView = (e: React.SyntheticEvent) => {
        e.preventDefault();
        props.gotoConnectWalletView();
    }
    const { brandName } = props;

    return (
        <div>
            <div>
                <strong>{brandName}</strong> supports WalletConnect compatible{' '}
                wallets. Click logos below to install.
            </div>
            <div>
                <h2>Mobile application wallets</h2>
                <ul>
                    <li>Trust</li>
                </ul>
            </div>
            <div>
                <h2>Desktop / browser extension wallets</h2>
                <ul>
                    <li>MetaMask</li>
                </ul>
            </div>
            <div>
                <button onClick={onGotoConnectWalletView}>
                    I already have a wallet
                </button>
            </div>
        </div>
    )
}
