"use client";

import { useClient } from "@/lib/hooks";

export const Modals = () => {
  const onlyClient = useClient();

  return (
    onlyClient&&
    <>
    </>
  );
};
