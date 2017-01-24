import React from 'react';
import { renderToString } from 'react-dom/server';
import { RouterContext } from 'react-router';
import { Provider } from 'react-redux';
import env from 'node-env-file';
import path from 'path';
import { match } from 'react-router';
import configureStore from '../src/js/store';
import { getRoutes } from '../src/js/routes';

// Load environment variables
env(path.join(__dirname, '..', '.env'));

export default function universalRender(req, res) {
  console.log('render');
  const store = configureStore({
    api: {
      url: process.env.API_URL
    }
  });

  match({
    routes: getRoutes(store),
    location: req.url
  }, function(err, redirectLocation, renderProps) { // eslint-disable-line consistent-return
    if (err) {
      console.error(err);
      return res.status(500).end('Internal server error');
    }

    if (redirectLocation) {
      return res.redirect(302, redirectLocation.pathname + redirectLocation.search);
    }

    if (!renderProps) {
      return res.status(404).end('Not found...');
    }

    const promises = renderProps.components.map((component, index) => {
      if (!component || !component.fetchData) {
        return false;
      }

      const title = (renderProps.params.title)
        ? renderProps.params.title
        : null;

      return store.dispatch(component.fetchData(title));
    });

    Promise.all(promises).then(() => {
      const initialState = JSON.stringify(store.getState());
      const InitialComponent = (
        <Provider store={store}>
          <RouterContext {...renderProps} />
        </Provider>
      );

      const componentHTML = renderToString(InitialComponent);

      res.render('index.ejs', {
        content: componentHTML,
        initialState: initialState
      });
    });
  });
};
