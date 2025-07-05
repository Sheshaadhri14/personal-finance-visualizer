import * as React from "react";

export const Table = ({ children }: { children: React.ReactNode }) => (
  <div className="w-full px-2 sm:px-4 md:px-6 lg:px-8 xl:px-12">
    <div className="overflow-x-auto rounded-2xl shadow-lg border border-gray-300 dark:border-gray-700 bg-white dark:bg-gray-900 w-full">
      <table className="w-full table-auto divide-y divide-gray-200 dark:divide-gray-700 text-base text-left text-gray-900 dark:text-gray-200">
        {children}
      </table>
    </div>
  </div>
);

export const TableHeader = ({ children }: { children: React.ReactNode }) => (
  <thead className="bg-gray-100 dark:bg-gray-800 text-sm uppercase font-semibold tracking-wide text-gray-700 dark:text-gray-300">
    {children}
  </thead>
);

export const TableBody = ({ children }: { children: React.ReactNode }) => (
  <tbody className="divide-y divide-gray-200 dark:divide-gray-700">{children}</tbody>
);

export const TableRow = ({ children }: { children: React.ReactNode }) => (
  <tr className="hover:bg-gray-50 dark:hover:bg-gray-800 transition-all duration-200 ease-in-out">
    {children}
  </tr>
);

export const TableHead = ({
  children,
  className = "",
}: {
  children: React.ReactNode;
  className?: string;
}) => (
  <th
    className={`px-4 md:px-6 py-4 text-base font-medium text-gray-600 dark:text-gray-300 text-left ${className}`}
  >
    {children}
  </th>
);

export const TableCell = ({
  children,
  className = "",
  ...props
}: React.TdHTMLAttributes<HTMLTableCellElement>) => (
  <td
    className={`px-4 md:px-6 py-4 whitespace-nowrap text-base text-gray-700 dark:text-gray-200 ${className}`}
    {...props}
  >
    {children}
  </td>
);