import * as qrImage from 'qr-image';
import WalletConnect from '@walletconnect/browser';
import WalletConnectProvider from '@walletconnect/web3-provider';
import { ConnectionType, ConnectionResponse } from './types';

export const createWalletConnector = async (
    walletConnectOpts: any,
    extraOpts: any = undefined
): Promise<WalletConnect> => {
    // Create a WalletConnector and init session
    const walletConnector = new WalletConnect(walletConnectOpts);
    const persistConnection = (extraOpts || {}).persistConnection;

    // Kill existing session if it exists and we're not persisting the connection
    if(walletConnector.connected && !persistConnection) {
        walletConnector.killSession();
    }

    // Create a new session in either case
    if(!walletConnector.connected) {
        await walletConnector.createSession();
    }
    return walletConnector;
}

// stupid cache, might not be worth it
let lastUri = '';
let lastQrCode = '';
export const createQrCodeImage = (walletConnector: WalletConnect): string => {
    const uri = walletConnector.uri;
    if (uri === lastUri) {
        return lastQrCode;
    }
    const qrCode = qrImage.imageSync(uri, { type: 'svg' }) as string;
    lastUri = uri;
    lastQrCode = qrCode;
    return qrCode;
}

export const createWalletConnectConnectionResponse = (walletConnector: WalletConnect): ConnectionResponse => {
    if(!walletConnector.connected) {
        throw new Error("WalletConnect must be connected");
    }

    // Creating the provider is currently very hacky, since there's no way to supply the
    // WalletConnect object ourself
    const provider = new WalletConnectProvider({
        bridge: (walletConnector as any)._bridge || '',
        qrcode: false,
    });
    (provider._walletConnector) = walletConnector;

    return {
        type: ConnectionType.WalletConnect,
        walletConnector: walletConnector,
        provider,
        web3: null, // TODO: initialize this if needed
    }
}
