import * as React from "react";

export const Label = ({ children, htmlFor, className = "", ...props }: React.LabelHTMLAttributes<HTMLLabelElement>) => (
  <label htmlFor={htmlFor} className={`block text-sm font-medium text-gray-700 ${className}`} {...props}>
    {children}
  </label>
);
