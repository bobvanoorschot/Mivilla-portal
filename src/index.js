import React from "react";
import App from "./components/App";
import { IntlProvider } from "react-intl";
// import registerServiceWorker from './registerServiceWorker';

import {
  ApolloClient,
  InMemoryCache,
  ApolloProvider,
} from "@apollo/client";


import en from "./locales/en.json";
import nl from "./locales/nl.json";
import de from "./locales/de.json";
import fr from "./locales/fr.json";
import es from "./locales/es.json";
import it from "./locales/it.json";

import "./styles/main.css";
import { IntegrationError } from "./components/Error";

function Portal({ portalCode, objectCode, pageType, locale, filters, api_url } ) { 
  const errors = IntegrationError({ portalCode, pageType, locale, filters })
  if (errors) {
    return errors
  }  

  if (!locale) {
    locale = 'en'
  }
  
  const client = new ApolloClient({
    uri: api_url,
    cache: new InMemoryCache(),
    headers: {
      locale,
    },
    defaultOptions: {
      watchQuery: {
        fetchPolicy: "cache-and-network",
      },
    },
  });

  const messages = { en, nl, de, fr, es, it };



  window.__localeId__ = locale;



  return (
    <ApolloProvider client={client}>
      <IntlProvider locale={locale} messages={messages[locale]}>
        <App
          portalCode={portalCode}
          objectCode={objectCode}
          pageType={pageType}
          locale={locale}
          filters={filters}
        />
      </IntlProvider>
    </ApolloProvider>
  );
}

Portal.defaultProps = {
  pageType: null,
  api_url: "https://api.mivilla.nl/graphql"
};

export default Portal;
