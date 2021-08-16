import React from "react";
import App from "./components/App";
import { IntlProvider, addLocaleData } from "react-intl";
import fetch from "unfetch";
// import registerServiceWorker from './registerServiceWorker';

import { ApolloProvider } from "react-apollo";
import { ApolloClient } from "apollo-client";
import { createHttpLink } from "apollo-link-http";
import { InMemoryCache } from "apollo-cache-inmemory";

import enData from "react-intl/locale-data/en";
import frData from "react-intl/locale-data/fr";
import esData from "react-intl/locale-data/es";
import nlData from "react-intl/locale-data/nl";
import deData from "react-intl/locale-data/de";
import itData from "react-intl/locale-data/it";

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
  
  const httpLink = createHttpLink({
    uri: api_url,
    fetch: fetch,
  });

  const client = new ApolloClient({
    link: httpLink,
    cache: new InMemoryCache(),
    defaultOptions: {
      watchQuery: {
        fetchPolicy: "cache-and-network",
      },
    },
  });

  const messages = { en, nl, de, fr, es, it };

  addLocaleData([
    ...enData,
    ...frData,
    ...esData,
    ...nlData,
    ...itData,
    ...deData,
  ]);

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
  api_url: "https://api.bukazu.com/graphql"
};

export default Portal;
