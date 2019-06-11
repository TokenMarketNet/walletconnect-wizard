/*!
 * Download icon from FontAwesome.
 * License CC BY 4.0: https://fontawesome.com/license/free
 */
import * as React from 'react';
import SVG from 'svg-inline-react';
import * as metaMaskLogo from '../assets/metamask-fox.svg';
import * as downloadIcon from '../assets/download-solid.svg';
import walletConnectLogoDataUri  from '../assets/walletconnect-logo';

interface ImageProps {
    className?: string;
}
interface ImageWrapperProps extends ImageProps {
    src: any;
}
const SVGWrapper = (props: ImageWrapperProps) => (
    <i className={props.className}>
        <SVG
            src={props.src}
            raw={true}
        />
    </i>
)

export const MetaMaskLogo = () => <SVG src={metaMaskLogo} />;

export const WalletConnectLogo = (props: any) => <img src={walletConnectLogoDataUri} {...props} />;

export const DownloadIcon = (props: ImageProps) => <SVGWrapper {...props} src={downloadIcon} />;
