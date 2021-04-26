import React, { useState } from 'react';
import { Query } from 'react-apollo';
import Pagination from 'react-js-pagination';
import { FormattedMessage } from 'react-intl';
import PropTypes from 'prop-types';
// import { Container } from './Pagination.css';
import { HOUSE_COUNT_QUERY } from '../../_lib/SearchQueries';
import Loading from '../icons/loading.svg';

function Paginator({ onPageChange, variables, activePage, limit }) { 
  return (
    <Query query={HOUSE_COUNT_QUERY} variables={variables}>
      {({ loading, error, data }) => {
        if (loading)
          return (
            <div
              style={{
                width: '100%',
                display: 'flex',
                justifyContent: 'center',
              }}
            >
              <Loading />
            </div>
          );
        if (error) {
          return <div>Error</div>;
        };

        const results = data.PortalSite.houses;
        return (
          <div className="bu-paginator">
            <div>
              {results.length} <FormattedMessage id="results" />
            </div>
            <Pagination
              activePage={activePage}
              itemsCountPerPage={limit}
              totalItemsCount={results.length}
              pageRangeDisplayed={5}
              onChange={e => { onPageChange(e) }}
              innerClass="bu-pagination"
            />
          </div>
        );
      }}
    </Query>
  );
}


Paginator.propTypes = {
  activePage: PropTypes.number.isRequired,
  limit: PropTypes.number.isRequired,
  onPageChange: PropTypes.func.isRequired,
  variables: PropTypes.object.isRequired,
};

export default Paginator;
