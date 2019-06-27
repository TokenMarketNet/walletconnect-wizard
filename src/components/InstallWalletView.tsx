import * as React from 'react';
import { SubHeading, Header, Row, Col, ButtonLink } from './theme';
import { MetaMaskLogo, TrustWalletLogo } from './images';
import styled from 'styled-components';

export interface InstallWalletViewProps {
    brandName: string;
    gotoConnectWalletView: () => void;
}

interface Wallet {
    id: string;
    name: string;
    link?: string;
    logo: () => React.ReactNode;
}

const supportedWallets: Record<string, Wallet[]> = {
    mobile: [
        {
            id: 'trust-wallet',
            name: 'Trust Wallet',
            link: 'https://trustwallet.com/',
            logo: TrustWalletLogo,
        },
    ],
    desktop: [
        {
            id: 'metamask',
            name: 'MetaMask',
            link: 'https://metamask.io/',
            logo: MetaMaskLogo,
        },
    ],
}

const WalletWrapper = styled.div`
    text-align: center;

    i {
        display: block;
    }
    svg {
        max-height: 100px;
    }
`;
const WalletList = ({ wallets }: { wallets: Wallet[] }) => {
    return (
        <div>
            {wallets.map((wallet) => (
                <WalletWrapper key={wallet.id}>
                    <a href={wallet.link} target="_blank">
                        {wallet.logo()}
                        {wallet.name}
                    </a>
                </WalletWrapper>
            ))}
        </div>
    )
}

const InstallWalletViewWrapper = styled.div`
    text-align: center;

    .install-wallet-footer {
        margin-top: 20px;
    }
`;
export default (props: InstallWalletViewProps) => {
    const onGotoConnectWalletView = (e: React.SyntheticEvent) => {
        e.preventDefault();
        props.gotoConnectWalletView();
    }
    const { brandName } = props;

    return (
        <InstallWalletViewWrapper>
            <Header>
                <strong>{brandName}</strong> supports WalletConnect compatible{' '}
                wallets. Click logos below to install.
            </Header>
            <Row>
                <Col>
                    <SubHeading>Mobile application wallets</SubHeading>
                    <WalletList wallets={supportedWallets.mobile} />
                </Col>
                <Col>
                    <SubHeading>Desktop / browser extension wallets</SubHeading>
                    <WalletList wallets={supportedWallets.desktop} />
                </Col>
            </Row>
            <div className="install-wallet-footer">
                <ButtonLink onClick={onGotoConnectWalletView}>
                    I already have a wallet
                </ButtonLink>
            </div>
        </InstallWalletViewWrapper>
    )
}
