/// <reference types="react" />
import WalletConnect from '@walletconnect/browser';
export interface ConnectWalletViewProps {
    walletConnector: WalletConnect | null | undefined;
    metaMaskAvailable: boolean;
    gotoInstallWalletView: () => void;
    handleMetaMaskConnect: () => void;
    headerText?: string;
}
declare const _default: (props: ConnectWalletViewProps) => JSX.Element;
export default _default;
