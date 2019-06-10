import * as React from 'react';
import { SubHeading, Header, Row, Col, ButtonLink } from './theme';

export interface InstallWalletViewProps {
    brandName: string;
    gotoConnectWalletView: () => void;
}
export default (props: InstallWalletViewProps) => {
    const onGotoConnectWalletView = (e: React.SyntheticEvent) => {
        e.preventDefault();
        props.gotoConnectWalletView();
    }
    const { brandName } = props;

    return (
        <div>
            <Header>
                <strong>{brandName}</strong> supports WalletConnect compatible{' '}
                wallets. Click logos below to install.
            </Header>
            <Row>
                <Col>
                    <SubHeading>Mobile application wallets</SubHeading>
                    <ul>
                        <li>Trust</li>
                    </ul>
                </Col>
                <Col>
                    <SubHeading>Desktop / browser extension wallets</SubHeading>
                    <ul>
                        <li>MetaMask</li>
                    </ul>
                </Col>
            </Row>
            <div>
                <ButtonLink onClick={onGotoConnectWalletView}>
                    I already have a wallet
                </ButtonLink>
            </div>
        </div>
    )
}
