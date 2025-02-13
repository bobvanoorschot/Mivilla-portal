import React, { Component } from 'react';
import PropTypes from 'prop-types';
import DatePicker from 'react-date-picker';
import includes from 'array-includes'
import List from './filters/List';
import { format } from 'date-fns'


class Field extends Component {
  constructor(props) {
    super(props);
    this.handleChange = this.handleChange.bind(this);
    this.handleCheckboxChange = this.handleCheckboxChange.bind(this);
    this.handlePropertyChange = this.handlePropertyChange.bind(this);
    this.handleDateChange = this.handleDateChange.bind(this);
  }

  handleChange(event) {
    this.props.onFilterChange(this.props.field.id, event.target.value);
  }

  handleCheckboxChange(event) {
    this.props.onFilterChange(this.props.field.id, event);
  }

  createNumberArray(max_number) {
    return Array.apply(null, { length: max_number + 1 }).map(
      Number.call,
      Number
    );
  }

  createPriceArray(max_price) {
    let rounded = Math.ceil(max_price / 100);
    return Array.from({ length: rounded }, (v, k) => k * 100);
  }

  handleDateChange(date) {
    if (date) {
      this.props.onFilterChange(this.props.field.id, format(date, 'YYYY-MM-DD'));
    } else {
      this.props.onFilterChange(this.props.field.id, '');
    }
  }

  handlePropertyChange(event) {
    const value = Number(event.target.value);

    let properties = this.props.filters.properties || [];
    if (includes(properties, value)) {
      let index = properties.indexOf(value);
      properties.splice(index, 1);
    } else {
      properties.push(value);
    }
    this.props.onFilterChange('properties', properties);
  }

  render() {
    const { PortalSite, field, filters, value } = this.props;

    let options = [];
    if (includes(['countries', 'cities', 'regions'], field.id)) {
      options = PortalSite[field.id];
    } else if (field.id === 'persons_min' || field.id === 'persons_max') {
      options = this.createNumberArray(PortalSite.max_persons);
    } else if (field.id === 'bedrooms_min') {
      options = this.createNumberArray(PortalSite.max_bedrooms);
    } else if (field.id === 'bathrooms_min') {
      options = this.createNumberArray(PortalSite.max_bathrooms);
    } else if (field.id === 'weekprice_max') {
      options = this.createPriceArray(PortalSite.max_weekprice);
    } else {
      options = this.createNumberArray(PortalSite[field.id]);
    }
    let input;
    const countries = filters.countries ;
    const regions = Array.isArray(filters.regions)
      ? filters.regions
      : [filters.regions];
    const properties = this.props.filters.properties || [];

    if (field.id === 'properties') {
      let requiredCategories = PortalSite.options.filtersForm.categories;
      input = [];
      PortalSite.categories.map(category => {
        if (includes(requiredCategories, category.id)) {
          input.push(
            <div className="bu-properties" key={category.id}>
              <strong>{category.name}</strong>
              <ul>
                {category.properties.map(property => (
                  <li key={property.id}>
                    <label htmlFor={property.id}>
                      <input
                        type="checkbox"
                        id={property.id}
                        value={property.id}
                        checked={includes(properties, property.id)}
                        onChange={this.handlePropertyChange}
                      />
                      {property.name}
                    </label>
                  </li>
                ))}
              </ul>
            </div>
          );
        }
      });
    } else if (field.type === 'select') {
      console.log({ countries });
      if (options && includes(['countries', 'cities', 'regions'], field.id)) {
        input = (
          <select
            name={field.id}
            onBlur={this.handleChange}
            onChange={this.handleChange}
            value={value}
          >
            <option value="" />
            {options.map(opt => {
              let hidden = false;
              if (includes(['cities', 'regions'], field.id)) {
                if (countries && !includes(countries, opt.country_id)) {
                  hidden = true;
                }
                if (field.id === 'cities') {
                  if (regions && !includes(regions, opt.region)) {
                    hidden = true;
                  }
                }
              }

              return (
                <option
                  key={opt.id}
                  value={opt.id}
                  id={opt.region}
                  disabled={hidden}
                  hidden={hidden}
                >
                  {opt.name}
                </option>
              );
            })}
          </select>
        );
      } else {
        input = (
          <select
            name={field.id}
            onBlur={this.handleChange}
            onChange={this.handleChange}
            value={value}
          >
            <option value="" />
            {options.map(opt => {
              let hidden = false;

              return (
                <option key={opt} value={opt} disabled={hidden} hidden={hidden}>
                  {opt}
                </option>
              );
            })}
          </select>
        );
      }
    } else if (field.type === 'list') {
      input = <List countries={countries} field={field} options={options} handleCheckboxChange={this.handleCheckboxChange} value={value} />
    } else if (field.type === 'radio') {
      input = (
        <ul className="radioList">
          {options.map(opt => (
            <li
            key={opt.id || opt}
            className={`bu-list-item ${countries && !includes(countries, opt.country_id) ? 'bu-disabled' : ''}`}
            >
              <input
                name={field.id}
                type="radio"
                id={opt.id || opt}
                value={opt.id || opt}
                disabled={
                  countries ? !includes(countries, opt.country_id) : false
                }
                // checked={value === opt.id || opt}
                onBlur={this.handleChange}
                onChange={this.handleChange}
              />
              <label htmlFor={opt.id || opt}>{opt.name || opt}</label>
            </li>
          ))}
        </ul>
      );
    } else if (field.type === 'number') {
      input = (
        <input
          value={value}
          type="number"
          min="0"
          max={
            field.id === 'persons_min'
              ? PortalSite.max_persons
              : PortalSite[field.id]
          }
          onBlur={this.handleChange}
        />
      );
    } else if (field.type === 'date') {
      let tempval;
      if (value === '' || !value) {
        tempval = null;
      } else {
        tempval = new Date(value);
      }
      input = (
        <DatePicker 
          id={field.id}
          onChange={this.handleDateChange}
          value={tempval}
          format='dd-MM-y'
        />
      );
    } else {
      input = <input value={value} onBlur={this.handleChange} />;
    }
    return input;
  }
}

Field.propTypes = {
  field: PropTypes.object.isRequired,
  PortalSite: PropTypes.object.isRequired,
  value: PropTypes.oneOfType([PropTypes.string, PropTypes.array]),
  filters: PropTypes.object.isRequired,
  onFilterChange: PropTypes.func.isRequired,
};

export default Field;
