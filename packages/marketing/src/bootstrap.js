import React from 'react';
import ReactDOM from 'react-dom';
import { createMemoryHistory, createBrowserHistory } from 'history';
import App from './App';

const mount = (el, { onNavigate, defaulHistory, initialPath }) => {
    const history = defaulHistory || createMemoryHistory({
        initialEntries: [initialPath]
    });
    
    if(onNavigate){
        history.listen(onNavigate);
    } 

    ReactDOM.render(<App history={history} />, el);

    return {
        onParentNavigate({pathname: nextPathname}){ 
            const { pathname } = history.location;
            if(pathname !== nextPathname){
                history.push(nextPathname);
            }
        }
    };
}

if(process.env.NODE_ENV==='development'){
    const devRoot = document.querySelector('#_marketing-dev-root');
    if(devRoot){
        mount(devRoot, { defaulHistory: createBrowserHistory(0) });
    }
}

export { mount };