import * as React from 'react';
import WalletConnect from '@walletconnect/browser';
import WalletConnectQrCode from './WalletConnectQrCode';
import MetaMaskConnectButton from './MetaMaskConnectButton';
import { SubHeading, Header, Row, Col, ButtonLink, HorizontalSeparator, SupportBullets } from './theme';
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
    blockchainName?: string;
    noWalletHelp?: string;
    hasWalletHelp?: string;
    hasWalletHelpNoMetaMask?: string;
}

export default (props: ConnectWalletViewProps) => {
    const {
        walletConnector,
        metaMaskAvailable,
        handleMetaMaskConnect,
        gotoInstallWalletView,
        headerText,
        blockchainName,
        noWalletHelp,
        hasWalletHelp,
        hasWalletHelpNoMetaMask,
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
                    {/* TODO: Need to figure out how to localise the article before the name*/}
                    <SubHeading>I have an {blockchainName} wallet</SubHeading>

                    <p className="walletconnect-has-wallet-help">
                        {metaMaskAvailable ? hasWalletHelp : hasWalletHelpNoMetaMask}
                    </p>

                    {!!walletConnector && (
                        <div>

                            <WalletConnectLogo style={{ width: 120, marginBottom: -8 }} />

                            <WalletConnectQrCode
                                walletConnector={walletConnector}
                            />

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
                </Col>
                <Col centered>
                    <SubHeading>I do not have {blockchainName} wallet yet</SubHeading>

                    <p className="walletconnect-no-wallet-support-text">{noWalletHelp}</p>

                    <div>
                        <ButtonLink onClick={onGotoInstallWalletView}>
                            <StyledDownloadIcon />
                        </ButtonLink>
                    </div>

                    <ButtonLink onClick={onGotoInstallWalletView}>
                        See supported wallets
                    </ButtonLink> for installation instructions.

                </Col>
            </Row>
        </div>
    )
}
