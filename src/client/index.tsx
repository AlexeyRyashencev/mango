import React from 'react';
import { AppContainer } from 'react-hot-loader';
import ReactDOM from 'react-dom';
import { App } from 'components/app';

const render = (Component) =>
    ReactDOM.render(
        <AppContainer>
            <Component/>
        </AppContainer>,
        document.getElementById('root')
    );

render(App);
if (module.hot) {
    module.hot.accept('./components/app', () => {
        require('./components/app');
        render(App);
    });
}
