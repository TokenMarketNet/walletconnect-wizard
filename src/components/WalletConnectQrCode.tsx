import * as React from 'react';
import WalletConnect from '@walletconnect/browser';
import { createQrCodeImage } from '../walletconnect';

export interface WalletConnectQrCodeProps {
    walletConnector: WalletConnect;
}
const WalletConnectQrCode = ({ walletConnector }: WalletConnectQrCodeProps) => {
    const qrCodeImage = createQrCodeImage(walletConnector);

    return (
        <div
            dangerouslySetInnerHTML={{ __html: qrCodeImage }}
        />
    )
}
export default WalletConnectQrCode;
