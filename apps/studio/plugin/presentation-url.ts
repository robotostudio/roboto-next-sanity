import { useToast } from "@sanity/ui";
import { useCallback } from "react";
import { BiWorld } from "react-icons/bi";
import { definePlugin, useGetFormValue } from "sanity";

export const presentationUrl = definePlugin(() => {
  return {
    name: "presentationUrl",
    document: {
      unstable_fieldActions: (props) => {
        return [
          ...props,
          {
            name: "open-in-presentation",
            useAction: () => {
              const getFormValue = useGetFormValue();
              const toast = useToast();
              const onAction = useCallback(() => {
                const value = getFormValue(["slug", "current"]);
                if (typeof value === "string") {
                  window.location.href = `/presentation?preview=${value}`;
                } else {
                  toast.push({
                    title: "No slug found",
                    status: "error",
                  });
                }
              }, [getFormValue, toast]);

              return {
                type: "action",
                icon: BiWorld,
                onAction,
                title: "Open in Presentation",
              };
            },
          },
        ];
      },
    },
  };
});
