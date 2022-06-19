import React from 'react';
import ReactDOM from 'react-dom';
import Portal from './src/index';

runTheApp();
function runTheApp() {
  const elem = document.getElementById('bukazu-app');
  const elements = document.getElementsByClassName('bukazu-app');
  if (elements.length > 0) {
    for (let element of elements) {
      runApp(element);
    }
  } else if (elem) {
    runApp(elem);
  }
}

function runApp(element) {
  const portalCode = element.getAttribute('portal-code');
  const objectCode = element.getAttribute('object-code');
  const pageType = element.getAttribute('page');
  const locale = element.getAttribute('language');
  let filters = element.getAttribute('filters');

  if (filters) {
    filters = JSON.parse(filters);
  } else {
    filters = {};
  }

  ReactDOM.render(
    <Portal
      portalCode={portalCode}
      objectCode={objectCode}
      pageType={pageType}
      locale={locale}
      filters={filters}
      api_url="https://api.mivilla.bukazu.com/graphql"
    />,
    element
  );
}

// registerServiceWorker()
