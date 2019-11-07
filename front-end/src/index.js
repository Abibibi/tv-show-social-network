// == Import : npm
import React from 'react';
import { render } from 'react-dom';
import { Provider } from 'react-redux';
import { BrowserRouter } from 'react-router-dom';

// == Import : local
import App from 'src/containers/App';
import store from 'src/store';
import ScrollToTop from 'src/components/ScrollToTop';

// == Render
const rootComponent = (
  <Provider store={store}>
    <BrowserRouter>
      <ScrollToTop />
      <App />
    </BrowserRouter>
  </Provider>
);

// Le rendu de React => DOM
render(rootComponent, document.getElementById('root'));
