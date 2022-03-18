import React from 'react'
import includes from 'array-includes'

export default function List({ countries, field, options, handleCheckboxChange, value }) {
  const updateList = (e) => {
    if (value === e.target.value) {
      handleCheckboxChange(null)
    } else {
      handleCheckboxChange(e.target.value)

    }
  }

  if (includes(['cities', 'regions'], field.id)) {

    return (
      <ul className="radioList">
      {options.map(opt => (
        <li
        key={opt.id}
        className={`bu-list-item ${countries && !includes(countries, opt.country_id) ? 'bu-disabled' : 'bu-open'}`}
        >
          <input
            name={field.id}
            type="checkbox"
            id={opt.id}
            value={opt.id}
            disabled={
              countries ? !includes(countries, opt.country_id) : false
            }
            checked={value === opt.id}
            onBlur={handleCheckboxChange}
            onChange={handleCheckboxChange}
            />
          <label htmlFor={opt.id}>{opt.name}</label>
        </li>
      ))}
    </ul>
  );
  } else {
    return (
      <ul className="radioList">
      {options.map(opt => (
        <li
        key={opt.id}
        className={`bu-list-item bu-open`}
        >
          <input
            name={field.id}
            type="checkbox"
            id={opt.id}
            value={opt.id}
            checked={value === opt.id}
            onBlur={handleCheckboxChange}
            onChange={updateList}
            />
          <label htmlFor={opt.id}>{opt.name}</label>
        </li>
      ))}
    </ul>
  );
  }
}