import React, { Component } from 'react';
import PropTypes from 'prop-types';
import ArrowRight from '../icons/ArrowRight.svg';
import ArrowLeft from '../icons/ArrowLeft.svg';
import Reload from '../icons/Reload.svg';

function CalendarHeader({ onGoPrev, onReset, onGoNext }) { 
    return (
      <div className="calendars-header">
        <div
          className="col"
          style={{ textAlign: 'center' }}
          onClick={onGoPrev}
          onKeyPress={onGoPrev}
          tabIndex={0}
          role="button"
        >
          <div className="icon">
            {' '}
            <ArrowLeft />
          </div>
        </div>
        <div
          className="col"
          onClick={onReset}
          onKeyPress={onReset}
          style={{ textAlign: 'center' }}
          tabIndex={0}
          role="button"
        >
          <div className="icon">
            <Reload />
          </div>
        </div>
        <div
          className="col"
          onClick={onGoNext}
          onKeyPress={onGoNext}
          style={{ textAlign: 'center' }}
          tabIndex={0}
          role="button"
        >
          <div className="icon">
            <ArrowRight />
          </div>
        </div>
      </div>
    );
  
}

CalendarHeader.propTypes = {
  onGoNext: PropTypes.func.isRequired,
  onGoPrev: PropTypes.func.isRequired,
  onReset: PropTypes.func.isRequired,
};

export default CalendarHeader;
