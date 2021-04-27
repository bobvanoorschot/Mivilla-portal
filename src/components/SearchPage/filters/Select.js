import React from 'react'

function Select({ field, handleChange, options, filters}) {
  return (
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
  )
}