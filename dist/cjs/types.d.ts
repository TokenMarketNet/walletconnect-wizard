import WalletConnect from '@walletconnect/browser';
export declare enum ConnectionType {
    WalletConnect = "walletconnect",
    Browser = "browser"
}
export interface ConnectionResponse {
    type: ConnectionType;
    provider: any;
    web3: any;
    walletConnector: WalletConnect | null;
}
