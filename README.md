# WalletConnect Wizard

This is a web component to integrate [WalletConnect](https://www.myetherwallet.com/) token and cryptocurrency wallets to your service easily. 

We believe that separating the concerns of service providers and value storages increases security and privacy of Internet. However this so called Web3 principle is also a novel concept for a lot of users and education in this area is needed. WalletConnect Wizard is a component designed to provide a smooth user experience for helping users to install, start using, confirm transactions and see their tokens in their third party wallets.

We support different kind of wallet mechanisms (see below), though the emphasis is on WalletConnect wallets as they are more secure due to running on a separate hardened mobile device. 

# Goals 

* A component for web and mobile service developers
* Easy to integrate to your site - providing a bundled JS and CSS option
* Explain new users what is a wallet and why it is needed
* Support both WalletConnect (mobile) and web3.js/MetaMask (desktop) style wallets
* Support multiple blockchains: Ethereum, Binance, otehrs
* Maintain list of logos, names and install locations of supported wallets
* Multimodal - automatically adapt styles and installation links depending on the platform: desktop, iOS, Android

# Demo

* [See live demo](https://tokenmarketnet.github.io/walletconnect-wizard/demo/index.html)

# Usage

We currently provide an UMD build, which should be usable directly from the browser:

```html
<div id="root"></div>
<script src="walletconnect-wizard/index.js"></script>
```

```javascript
walletConnectWizard.init('root', {
    onConnect: function(response) {
        alert("You are connected with: " + response.type);
        response.provider.sendAsync({
            method: 'eth_accounts',
            params: [],
        }, function(error, params)  {
            var account = params.result[0];
            alert("Your ethereum account is:" + account);
        });
    }
});
```

Usage with ES6/Typescript and React:

```javascript
import { Wizard } from 'walletconnect-wizard';

<Wizard
    onConnect={(response) => {
        // do stuff
    }}
/>
```

The response object API is to be fully designed, but it looks something like this:

```typescript
export interface ConnectionResponse {
    type: ConnectionType;                   // 'walletconnect' or 'browser'
    provider: any;                          // asyncSendable provider that can be passed to new Web3(...)
    web3: any;                              // currently always null, maybe Web3 object in the future
    walletConnector: WalletConnect | null;  // this will be set to the wallet
}
```

# Development

We use StoryBook for easy local development:

```
$ yarn
$ yarn start
```

Building:

```
$ yarn build
```

Updating github pages (live demo):

```
$ git checkout gh-pages
$ git merge master
$ yarn build
$ git add lib
$ git commit -m "Update gh-pages"
$ git push origin gh-pages
```


# UI mockups

* [See LucidChart mock ups](https://www.lucidchart.com/documents/view/741793a6-be73-4ee4-8709-46e811ffe4c1)

# Eligible wallets

We are currently focusing on wallets that can directly interact with smart contracts and blockchain. Wallets that do only transfer-of-value only are out of the scope

For Ethereum the wallet must pass all tests on [example.walletconnect.org](https://example.walletconnect.org)

## Different wallet categories

We can roughly classify how wallets and web services interact

* Mobile wallets that connect to your service by reading a [WalletConnect](https://walletconnect.org) QR code on a desktop page
* Desktop web browser extensions (MetaMask)
* Wallet integrated in a desktop web browser (Opera, Brave)
* Wallet integrated in a mobile browser (Opera for Android)
* Mobile app that integrates a WebView web browser (Status.im)
* Desktop wallet apps that connect via localhost socket (Scatter for EOS)

Limitations between if your wallet integrates a browser or a browser integrates a wallet comes obvious when you try to interact with third party sign in services like Facebook and Google.

# Wallet database entries

* *id*: internal id
* *name*: Human readable brand name
* *homepage*: Link to the homepage
* *support*: Link to the support - displayed on connection page if the user is having issues
* *blockchains*: ids of supported blockchains - currently `ethereum` and `binance`
* *install*: direct installation links to different platform
* *operations*: what kind of operations this support: transactions, message signing, etc.

# TODO

* Generate wallet list from database json
* Provide multiple build targets, UMD (named walletconnect-wizard.js) + esmodule
* Strip down the build size
* Finalize response (maybe return Web3 object there)
* Better documentation
* Configure TSLint

# License

MIT
