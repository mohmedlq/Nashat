import React from 'react';

export type PrintHeaderTextProps = {
  value: string;
  className: string;
};

export function PrintHeaderText({ value, className }: PrintHeaderTextProps) {
  return (
    <div
      className={`${className} flex w-full items-center justify-center leading-[1.3] m-0 p-0`}
    >
      {value && value.trim() ? value : '\u00A0'}
    </div>
  );
}