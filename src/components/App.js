import React, { Component } from "react";
import PropTypes from "prop-types";
import { Query } from "react-apollo";
import Loading from "./icons/loading.svg";
import "react-dates/initialize";

import { PORTAL_QUERY } from "../_lib/queries";

import SearchPage from "./SearchPage/SearchPage";
import CalendarPage from "./CalendarPage/CalendarPage";
import ReviewsPage from "./ReviewsPage/ReviewsPage";

// import 'react-dates/lib/css/_datepicker.css';

class App extends Component {
  constructor(props) {
    super(props);

    this.pageWidth = React.createRef();
  }

  /**
   * Calculate & Update state of new dimensions
   */
  updateDimensions() {
    if (this.pageWidth.current.offsetWidth < 1200) {
      this.pageWidth.current.classList.add("bu-smaller");
    } else {
    }
  }

  /**
   * Add event listener
   */
  componentDidMount() {
    this.updateDimensions();
    // window.addEventListener("resize", this.updateDimensions.bind(this));
  }

  render() {
    const { portalCode, objectCode, pageType, locale, filters } = this.props;

    return (
      <div ref={this.pageWidth}>
        <Query query={PORTAL_QUERY} variables={{ id: portalCode, locale }}>
          {({ loading, error, data }) => {
            if (loading)
              return (
                <div>
                  <Loading />
                </div>
              );
            if (error) {
              return <div>Error</div>;
            }

            const PortalSite = data.PortalSite;
            let options = data.PortalSite.options;

            let root = document.documentElement;

            root.style.setProperty(
              "--bukazu-discount",
              `${options.colors ? options.colors.discount : "orange"}`
            );
            root.style.setProperty(
              "--bukazu-cell",
              `${options.colors ? options.colors.cell : "#fff"}`
            );
            root.style.setProperty(
              "--bukazu-arrival",
              `${options.colors ? options.colors.arrival : "#6eeb83"}`
            );
            root.style.setProperty(
              "--bukazu-booked",
              `${options.colors ? options.colors.booked : "#ea2b1f"}`
            );
            root.style.setProperty(
              "--bukazu-departure",
              `${options.colors ? options.colors.departure : "yellow"}`
            );

            root.style.setProperty(
              "--bukazu-button",
              `${
                options.colors
                  ? options.colors.button
                  : "rgba(23, 190, 187, 0.75)"
              }`
            );
            root.style.setProperty(
              "--bukazu-button_cta",
              `${options.colors ? options.colors.buttonCta : "#e28413"}`
            );
            root.style.setProperty(
              "--bukazu-background_month",
              `${options.colors ? options.colors.month_background : "#e28413"}`
            );

            if (objectCode && objectCode !== null && pageType !== "reviews") {
              return (
                <CalendarPage
                  PortalSite={PortalSite}
                  objectCode={objectCode}
                  locale={locale}
                />
              );
            } else if (
              objectCode &&
              objectCode !== null &&
              pageType === "reviews"
            ) {
              return (
                <ReviewsPage
                  PortalSite={PortalSite}
                  locale={locale}
                  options={options}
                  filters={filters}
                />
              );
            } else {
              return (
                <SearchPage
                  PortalSite={PortalSite}
                  locale={locale}
                  options={options}
                  filters={filters}
                />
              );
            }
          }}
        </Query>
      </div>
    );
  }
}

App.defaultProps = {
  filters: {},
};

App.propTypes = {
  portalCode: PropTypes.string.isRequired,
  objectCode: PropTypes.string,
  locale: PropTypes.string.isRequired,
  filters: PropTypes.object.isRequired,
};

export default App;
