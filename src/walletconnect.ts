import * as qrImage from 'qr-image';
import WalletConnect from '@walletconnect/browser';

export const createWalletConnector = async (opts: any): Promise<WalletConnect> => {
    // Create a WalletConnector and init session
    const walletConnector = new WalletConnect(opts);
    await walletConnector.createSession();
    return walletConnector;
}

const qrCodeCache: Record<string, string> = {};

export const createQrCodeImage = (walletConnector: WalletConnect): string => {
    const uri = walletConnector.uri;
    if (qrCodeCache[uri]) {
        return qrCodeCache[uri]
    }
    const data = qrImage.imageSync(uri, { type: 'svg' }) as string;
    qrCodeCache[uri] = data;
    return data;
}
