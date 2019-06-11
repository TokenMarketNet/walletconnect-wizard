import WalletConnect from '@walletconnect/browser';
import { ConnectionResponse } from './types';
export declare const createWalletConnector: (opts: any) => Promise<WalletConnect>;
export declare const createQrCodeImage: (walletConnector: WalletConnect) => string;
export declare const createWalletConnectConnectionResponse: (walletConnector: WalletConnect) => ConnectionResponse;
