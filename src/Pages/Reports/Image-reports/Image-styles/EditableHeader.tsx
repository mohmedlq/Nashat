import React from 'react';
export type EditableHeaderTextProps = {
  value: string;
  placeholder: string;
  className?: string;
  name: string;
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  dir?: 'rtl' | 'ltr' | 'auto';
};
export function EditableHeaderText({
  value,
  placeholder,
  className = '',
  name,
  onChange,
  dir = 'rtl',
}: EditableHeaderTextProps) {
  return (
    <input
      name={name}
      value={value}
      onChange={onChange}
      placeholder={placeholder}
      dir={dir}
      className={`${className} m-0 block w-full min-w-0 bg-transparent p-0 leading-[1.2] outline-none`}
    />
  );
}