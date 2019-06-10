import * as React from 'react';
import styled from 'styled-components';

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
            Connect with MetaMask
        </button>
    )
}

const StyledMetaMaskConnectButton = styled(MetaMaskConnectButton)`
`;

export default StyledMetaMaskConnectButton;
