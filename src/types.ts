import WalletConnect from '@walletconnect/browser';

export enum ConnectionType {
    WalletConnect = 'walletconnect',
    Browser = 'browser',
}

export interface ConnectionResponse {
    type: ConnectionType;
    provider: any; // TODO
    web3: any; // TODO
    walletConnector: WalletConnect | null;
}
