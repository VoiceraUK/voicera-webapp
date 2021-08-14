import classnames from 'classnames';
import React from 'react';

import { ListItems } from 'types';
import { extractLabelValue } from 'utils/functions';

export function Select(props: SelectProps) {
  const { items, name, placeholder, value, onChange, className } = props;
  const classes = classnames('select', className);
  return (
    <select className={classes} name={name} value={value} onChange={onChange}>
      <option value={''}>{placeholder}</option>
      {items.map((item, key) => {
        const { label, value } = extractLabelValue(item);
        return (
          <option value={value} key={key}>
            {label}
          </option>
        );
      })}
    </select>
  );
}

export interface SelectProps
  extends React.SelectHTMLAttributes<HTMLSelectElement> {
  name?: string;
  items: ListItems;
}
