import * as React from 'react';
import WalletConnect from '@walletconnect/browser';
import WalletConnectQrCode from './WalletConnectQrCode';
import { SubHeading, Header, Row, Col, ButtonLink } from './theme';

export interface ConnectWalletViewProps {
    walletConnector: WalletConnect | null | undefined;
    gotoInstallWalletView: () => void;
}
export default (props: ConnectWalletViewProps) => {
    const onGotoInstallWalletView = (e: React.SyntheticEvent) => {
        e.preventDefault();
        props.gotoInstallWalletView();
    }
    const {
        walletConnector
    } = props;

    return (
        <div>
            <Header>
                In order to use this service you need to have a compatible wallet{' '}
                application. The wallet securely stores and transfers your assets.
            </Header>
            <Row>
                <Col centered>
                    <SubHeading>Connect wallet</SubHeading>
                    {!!walletConnector && (
                        <WalletConnectQrCode
                            walletConnector={walletConnector}
                        />
                    )}
                    <ButtonLink onClick={onGotoInstallWalletView}>
                        See compatible wallets
                    </ButtonLink>
                </Col>
                <Col centered>
                    <SubHeading>Install wallet</SubHeading>
                    <div>Big icon about connecting </div>
                    <ButtonLink onClick={onGotoInstallWalletView}>
                        See supported wallets
                    </ButtonLink>
                </Col>
            </Row>
        </div>
    )
}
