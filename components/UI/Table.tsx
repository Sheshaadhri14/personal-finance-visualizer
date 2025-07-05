
import * as React from "react";
export const Table = ({ children }: { children: React.ReactNode }) => (
  <div className="overflow-x-auto border border-gray-200 rounded-lg">{children}</div>
);

export const TableHeader = ({ children }: { children: React.ReactNode }) => (
  <thead className="bg-gray-50">{children}</thead>
);

export const TableBody = ({ children }: { children: React.ReactNode }) => <tbody>{children}</tbody>;

export const TableRow = ({ children }: { children: React.ReactNode }) => (
  <tr className="border-t hover:bg-gray-50">{children}</tr>
);

export const TableHead = ({
  children,
  className = "",
}: {
  children: React.ReactNode;
  className?: string;
}) => (
  <th className={`px-4 py-2 text-left text-sm font-medium text-gray-600 ${className}`}>{children}</th>
);

export const TableCell = ({
  children,
  className = "",
  ...props
}: React.TdHTMLAttributes<HTMLTableCellElement>) => (
  <td className={`px-4 py-2 text-sm text-gray-700 ${className}`} {...props}>
    {children}
  </td>
);
