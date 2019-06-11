declare module "*.svg" {
    const content: string;
    export default content;
}

declare module "svg-inline-react" {
    import * as React from 'react';
    export interface InlineSVGProps {
        // TODO: src should be string, not any, but then it complains
        //src: string;
        src: any;
        raw?: boolean;
        element?: string;
    }
    export default class InlineSVG extends React.Component<InlineSVGProps, any> {}
}

declare module "@walletconnect/web3-provider" {
    const WalletConnectProvider: any;
    export default WalletConnectProvider;
}
