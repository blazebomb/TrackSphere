"use client";

import React, { PropsWithChildren, useRef } from "react";
import { QueryClient, QueryClientProvider as ReactQueryClientProvider } from "@tanstack/react-query";

const QueryClientProvider = ({ children }: PropsWithChildren) => {
  const queryClientRef = useRef(new QueryClient()); 

  return (
    <ReactQueryClientProvider client={queryClientRef.current}>
      {children}
    </ReactQueryClientProvider>
  );
};

export default QueryClientProvider;
