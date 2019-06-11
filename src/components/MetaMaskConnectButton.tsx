import * as React from 'react';
import styled from 'styled-components';
import { MetaMaskLogo } from './images';

//const MetaMaskLogo = require('../assets/metamask-fox.svg');

export interface MetaMaskConnectButtonProps {
    className?: string;
    handleClick?: () => void;
}
const MetaMaskConnectButton = ({ className, handleClick }: MetaMaskConnectButtonProps) => {
    const onClick = (e: React.SyntheticEvent) => {
        e.preventDefault();
        if(handleClick) {
            handleClick();
        }
    }

    return (
        <button
            className={className}
            onClick={onClick}
        >
            <span>Connect with MetaMask</span> <MetaMaskLogo />
        </button>
    )
}

const StyledMetaMaskConnectButton = styled(MetaMaskConnectButton)`
    font-size: 1.25em;
    border: 0;
    box-shadow: none;
    border-shadow: none;
    border-radius: 0;
    background: white;
    cursor: pointer;
    padding: 0 20px;
    display: flex;
    flex-direction: row;
    margin: 0 auto;
    align-items: center;
    &:hover {
        opacity: 0.9;
    }

    span {
        color: #E2761B;
        margin-right: 10px;
    }
    i, svg {
        height: 50px;
        display: inline-block;
    }
`;

export default StyledMetaMaskConnectButton;
