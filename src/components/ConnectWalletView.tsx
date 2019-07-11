import * as React from 'react';
import WalletConnect from '@walletconnect/browser';
import WalletConnectQrCode from './WalletConnectQrCode';
import MetaMaskConnectButton from './MetaMaskConnectButton';
import { SubHeading, Header, Row, Col, ButtonLink, HorizontalSeparator } from './theme';
import { WalletConnectLogo, DownloadIcon } from './images';
import styled from 'styled-components';


const StyledDownloadIcon = styled(DownloadIcon)`
    display: block;
    margin: 10px auto;
    opacity: 0.9;
    &:hover {
        opacity: 0.8;
    }

    svg {
        max-width: 250px;
    }
`

export interface ConnectWalletViewProps {
    walletConnector: WalletConnect | null | undefined;
    metaMaskAvailable: boolean;
    gotoInstallWalletView: () => void;
    handleMetaMaskConnect: () => void;
    headerText?: string;
}
export default (props: ConnectWalletViewProps) => {
    const {
        walletConnector,
        metaMaskAvailable,
        handleMetaMaskConnect,
        gotoInstallWalletView,
        headerText,
    } = props;
    const onGotoInstallWalletView = (e: React.SyntheticEvent) => {
        e.preventDefault();
        gotoInstallWalletView();
    }

    return (
        <div>
            {!!headerText && (
                <Header>
                    {headerText}
                </Header>
            )}
            <Row>
                <Col centered>
                    <SubHeading>Connect wallet</SubHeading>
                    {!!walletConnector && (
                        <div>
                            <WalletConnectQrCode
                                walletConnector={walletConnector}
                            />

                            <div>
                                <small>Powered by</small>{' '}
                                <WalletConnectLogo style={{ width: 120, marginBottom: -8 }} />
                            </div>
                
                        </div>
                    )}
                    
                    {(walletConnector && metaMaskAvailable) && (
                        <HorizontalSeparator>or</HorizontalSeparator>
                    )}
                    {metaMaskAvailable && (
                        <div>
                            <MetaMaskConnectButton
                                handleClick={handleMetaMaskConnect}
                            />
                        </div>
                    )}
                    <ButtonLink onClick={onGotoInstallWalletView}>
                        See compatible wallets
                    </ButtonLink>
                </Col>
                <Col centered>
                    <SubHeading>Install wallet</SubHeading>
                    <div>
                        <ButtonLink onClick={onGotoInstallWalletView}>
                            <StyledDownloadIcon />
                        </ButtonLink>
                    </div>
                    <ButtonLink onClick={onGotoInstallWalletView}>
                        See supported wallets
                    </ButtonLink>
                </Col>
            </Row>
        </div>
    )
}
