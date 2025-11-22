import { useMutation } from "@tanstack/react-query";
import Fetch from "@/shared/lib/Fetch";
import { TFetchError } from "@/shared/lib/Fetch";
import { UseFormSetError } from "react-hook-form";

interface IUpdateProfilePayload {
  email: string;
  first_name: string;
  last_name: string;
  address: string;
  contact_number: string;
  birthday: string;
  bio: string;
  profile_image: File | null;
}

export function useUpdateProfile(
  setError?: UseFormSetError<IUpdateProfilePayload>
) {
  return useMutation<IUpdateProfilePayload, TFetchError, IUpdateProfilePayload>(
    {
      mutationFn: async (data) => {
        const formData = new FormData();

        Object.entries(data).forEach(([key, value]) => {
          if (value !== undefined && value !== null) {
            formData.append(key, value);
          }
        });

        return Fetch({
          method: "PATCH",
          url: `${process.env.NEXT_PUBLIC_API_URL}/api/users/me/`,
          body: formData,
          multipart: true,
        });
      },

      onError: (error) => {
        if (!setError) return;

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
          }
        }
      },
    }
  );
}
