import React, { Component } from "react";
import App from "./components/App";
import { IntlProvider } from "react-intl";
import { addLocaleData } from "react-intl";
import fetch from "unfetch";
import * as Sentry from "@sentry/react";
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

import "./index.css";

Sentry.init({
  dsn:
    "https://1c8907a40e6c4f17b9f2f22efb2ff390@o208128.ingest.sentry.io/1410853",
  release: "bukazu-portal@" + process.env.npm_package_version,
  integrations: [
    new Sentry.Integrations.GlobalHandlers({
      onunhandledrejection: false,
    }),
  ],
});

class Portal extends Component {
  render() {
    const { portalCode, objectCode, pageType, locale, filters } = this.props;

    let uri = "https://bukazu.eu/graphql";

    if (process.env.NODE_ENV !== "production") {
      // uri = 'https://stage.bukazu.eu/graphql';
    }
    const httpLink = createHttpLink({
      uri,
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
}

Portal.defaultProps = {
  pageType: null,
};

export default Sentry.withProfiler(Portal);
