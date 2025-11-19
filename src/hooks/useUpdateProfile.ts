"use client";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import {
  updateProfile,
  IUpdateProfilePayload,
} from "@/shared/lib/profile/updateProfile";
import { TFetchError } from "@/shared/lib/Fetch";
import { UseFormSetError } from "react-hook-form";
import { QK_USER_PROFILE_INFO } from "./useGetProfileInfo";

export function useUpdateProfile(
  setError: UseFormSetError<IUpdateProfilePayload>
) {
  const queryClient = useQueryClient();

  return useMutation<IUpdateProfilePayload, TFetchError, IUpdateProfilePayload>(
    {
      mutationFn: updateProfile,

      onError: (error) => {
        let hasFocused = false;

        Object.keys(error).forEach((fieldKey) => {
          if (["detail", "message", "statusCode"].includes(fieldKey)) return;

          // eslint-disable-next-line @typescript-eslint/no-explicit-any
          const fieldError = (error as any)[fieldKey];

          if (Array.isArray(fieldError) && fieldError.length > 0) {
            setError(
              fieldKey as keyof IUpdateProfilePayload,
              {
                type: "server",
                message: fieldError[0],
              },
              { shouldFocus: !hasFocused }
            );
            hasFocused = true;
          }
        });

        if (error.detail && !hasFocused) {
          const match = error.detail.match(/\(field:\s*([^)]+)\)/);

          if (match) {
            const fieldName = match[1].trim() as keyof IUpdateProfilePayload;

            const cleanMessage = error.detail
              .replace(/\(field:[^)]+\)/, "")
              .trim();

            setError(
              fieldName,
              {
                type: "server",
                message: cleanMessage,
              },
              { shouldFocus: true }
            );

            hasFocused = true;
          }
        }

        // Fallback: generic backend message for checking
        if (error.message && !hasFocused) {
          console.error("Backend error:", error.message);
        }
      },

      onSuccess: () => {
        queryClient.invalidateQueries({ queryKey: [QK_USER_PROFILE_INFO] });
      },
    }
  );
}
