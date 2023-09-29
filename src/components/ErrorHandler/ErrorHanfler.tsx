import React from "react";

type Props = {
  isError: boolean;
  children: React.ReactNode;
};

export const ErrorHandler = ({ isError, children }: Props) => {
  if (isError) {
    return <h2 className="text-red-500">Error has occured while loading data from server</h2>;
  }

  return <>{children}</>;
};