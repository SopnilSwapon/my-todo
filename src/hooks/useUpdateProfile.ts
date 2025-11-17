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

        // 1️⃣ Field-level backend errors (Django style: { field: ["msg"] })
        Object.keys(error).forEach((fieldKey) => {
          if (["detail", "message", "statusCode"].includes(fieldKey)) return;

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

        // 2️⃣ Special case: `detail` with “(field: xyz)” pattern
        if (error.detail && !hasFocused) {
          const match = error.detail.match(/\(field:\s*([^)]+)\)/);

          if (match) {
            const fieldName = match[1].trim() as keyof IUpdateProfilePayload;

            // Remove "(field: xyz)" from message
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

        // 3️⃣ Fallback: generic backend message
        if (error.message && !hasFocused) {
          console.error("Backend error:", error.message);
        }
      },

      onSuccess: () => {
        queryClient.invalidateQueries({ queryKey: [QK_USER_PROFILE_INFO] });
        console.log("Profile updated successfully");
      },
    }
  );
}
