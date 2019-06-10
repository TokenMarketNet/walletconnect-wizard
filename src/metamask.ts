import { ConnectionType, ConnectionResponse } from './types';

export const isMetaMaskInstalled = (): boolean => {
    const provider = (window as any).ethereum;
    return !!(provider && provider.isMetaMask);
}

export const connectMetaMask = async (): Promise<ConnectionResponse> => {
    const provider = (window as any).ethereum;
    await provider.enable();

    return {
        type: ConnectionType.Browser,
        walletConnector: null,
        provider,
        web3: null, // TODO: initialize this if needed
    }
}
