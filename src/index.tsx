import * as React from 'react';
import * as ReactDOM from 'react-dom';
import Wizard, { WizardProps } from './components/Wizard';

const init = (container: any, opts: any) => {
    opts = opts || {};
    if (typeof container === 'string') {
        container = document.getElementById(container);
    }
    if(!container) {
        throw new Error("container not found");
    }
    ReactDOM.render(<Wizard {...opts} />, container);
}
export default Wizard;  // TODO: maybe get rid of this
export {
    init,
    Wizard,
    WizardProps
};
