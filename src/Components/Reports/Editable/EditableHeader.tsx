import React from 'react';
type EditableHeaderTextProps = {
  value: string;
  placeholder?: string;
  className?: string;
  name: string;
  onChange: (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => void;
  dir?: 'rtl' | 'ltr' | 'auto';
};

export default function EditableHeaderText({
  value,
  placeholder,
  className = '',
  name,
  onChange,
  dir = 'rtl',
}: EditableHeaderTextProps) {
  return (
    <input
      type="text"
      name={name}
      value={value}
      placeholder={placeholder}
      onChange={onChange}
      dir={dir}
      className={`
        w-full
        bg-transparent
        border-none
        outline-none
        text-[#1f2937]
        placeholder:text-[#9ca3af]
        ${className}
      `}
    />
  );
}