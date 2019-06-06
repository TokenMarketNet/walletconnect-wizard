# WalletConnect Wizard

This is a web component to integrate WalletConnect token and cryptocurrency wallets to your service easily.

# Goals 

* Easy to integrate to your website - provide bundled JS and CSS option
* Explain new users what is a wallet and why it is needed
* Support both WalletConnect (mobile) and web3.js/MetaMask (desktop) style wallets
* Support multiple blockchains: Ethereum, Binance, otehrs
* Maintain list of logos, names and install locations of supported wallets
* Multimodal - automatically adapt styles and installation links depending on the platform: desktop, iOS, Android

# Demo

* See live demo

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

# License

MIT
