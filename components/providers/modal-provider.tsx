"use client";

import { CreateServerModal } from "@/components/modals/create-server-modal";
import { useState, useEffect } from "react";
import { InviteModal } from "../modals/invite-modal";
import { EditServerModal } from "../modals/edit-server-modal";

export const ModalProvider = () => {
  // This prevents modal to be rendered on the server side because it can create
  // state inconsistencies thus creating hydration errors.

  // Both use-client-components and react-server-components are SSR.
  // use-client-components are also rendered in the client.
  // Modals are problematic cuz they can be opened by useEffect, renders and onClicks.
  // This ensures that no modals will be shown in server side, it is client only.
  const [isMounted, setIsMounted] = useState(false);

  useEffect(() => {
    setIsMounted(true);
  }, []);

  if (!isMounted) {
    return null;
  }

  return (
    <>
      {" "}
      <CreateServerModal />
      <InviteModal />
      <EditServerModal />
    </>
  );
};
