import * as React from 'react';
import styled from 'styled-components';
import WalletConnect from '@walletconnect/browser';
import { createQrCodeImage } from '../walletconnect';

export interface WalletConnectQrCodeProps {
    walletConnector: WalletConnect;
    className?: string;
}
const WalletConnectQrCode = ({ className, walletConnector }: WalletConnectQrCodeProps) => {
    const qrCodeImage = createQrCodeImage(walletConnector);

    return (
        <div
            className={className}
            dangerouslySetInnerHTML={{ __html: qrCodeImage }}
        />
    )
}

const StyledWalletConnectQrCode = styled(WalletConnectQrCode)`
    max-width: 300px;
    margin: 10px auto;
`;

export default StyledWalletConnectQrCode;
