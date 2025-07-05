import * as React from "react";

export const Dialog = ({
  open,
  onOpenChange,
  children,
}: {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  children: React.ReactNode;
}) => {
  if (!open) return null;
  return (
    <div className="fixed inset-0 z-50 bg-black/50 flex items-center justify-center p-4">
      <div className="bg-white dark:bg-black w-full max-w-md rounded-lg shadow-lg p-6 relative">
        {children}
      </div>
    </div>
  );
};

export const DialogContent = ({ children }: { children: React.ReactNode }) => <div>{children}</div>;

export const DialogHeader = ({ children }: { children: React.ReactNode }) => (
  <div className="mb-4 border-b pb-2">{children}</div>
);

export const DialogTitle = ({ children }: { children: React.ReactNode }) => (
  <h2 className="text-lg font-bold">{children}</h2>
);

export const DialogFooter = ({ children, className = "" }: { children: React.ReactNode; className?: string }) => (
  <div className={`pt-4 border-t mt-4 flex justify-end space-x-2 ${className}`}>{children}</div>
);
