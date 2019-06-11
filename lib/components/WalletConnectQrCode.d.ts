/// <reference types="react" />
import WalletConnect from '@walletconnect/browser';
export interface WalletConnectQrCodeProps {
    walletConnector: WalletConnect;
    className?: string;
}
declare const StyledWalletConnectQrCode: import("styled-components").StyledComponent<({ className, walletConnector }: WalletConnectQrCodeProps) => JSX.Element, any, {}, never>;
export default StyledWalletConnectQrCode;
