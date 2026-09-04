import React from 'react';

export type EditableHeaderTextProps = {
  value: string;
  placeholder: string;
  className: string;
  name: string;
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
};

export function EditableHeaderText({
  value,
  placeholder,
  className,
  name,
  onChange,
}: EditableHeaderTextProps) {
  return (
    <input
      name={name}
      value={value}
      onChange={onChange}
      placeholder={placeholder}
      className={`${className} block w-full min-w-0 m-0 p-0 leading-[1.2]`}
    />
  );
}