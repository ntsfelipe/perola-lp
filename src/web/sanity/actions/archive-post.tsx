"use client";

import { useState } from "react";
import {
  type DocumentActionComponent,
  type DocumentActionDescription,
  type DocumentActionProps,
  useClient,
} from "sanity";

import { getArchivePatch } from "@/sanity/actions/archive-post-patch";
import { sanityEnv } from "@/sanity/lib/env";

function ArchivePostActionComponent(
  props: DocumentActionProps,
): DocumentActionDescription {
  const client = useClient({ apiVersion: sanityEnv.apiVersion });
  const [busy, setBusy] = useState(false);
  const [failed, setFailed] = useState(false);
  const currentDocument = props.draft ?? props.published;
  const currentlyArchived = Boolean(currentDocument?.archivedAt);

  return {
    label: failed
      ? "Falha ao atualizar. Tente novamente"
      : currentlyArchived
        ? "Restaurar"
        : "Arquivar",
    tone: currentlyArchived ? "primary" : "critical",
    disabled: busy,
    onHandle: async () => {
      setBusy(true);
      setFailed(false);

      try {
        const ids = [props.draft?._id, props.published?._id].filter(
          (id): id is string => typeof id === "string",
        );
        const patch = getArchivePatch(currentlyArchived, new Date().toISOString());
        let transaction = client.transaction();

        for (const id of new Set(ids)) {
          transaction = transaction.patch(id, (builder) =>
            "set" in patch ? builder.set(patch.set) : builder.unset(patch.unset),
          );
        }

        await transaction.commit();
        props.onComplete();
      } catch {
        setFailed(true);
      } finally {
        setBusy(false);
      }
    },
  };
}

export const ArchivePostAction: DocumentActionComponent = ArchivePostActionComponent;
