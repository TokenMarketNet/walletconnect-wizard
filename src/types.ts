import WalletConnect from '@walletconnect/browser';

export enum ConnectionType {
    WalletConnect = 'walletconnect',
    Browser = 'browser',
}

export interface ConnectionResponse {
    type: ConnectionType;
    provider: any; // TODO: real type here
    web3: any; // TODO: real type here
    walletConnector: WalletConnect | null;
}
