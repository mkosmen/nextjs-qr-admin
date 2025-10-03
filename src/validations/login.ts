"use server";

import { ILogin } from "@/lib/types";
import { z } from "zod";
import { getTranslations } from "next-intl/server";

const schema = async () => {
  const t = await getTranslations();

  return z.object({
    email: z.email({
      message: t("validation.email"),
    }),
    password: z
      .string()
      .min(3, {
        message: t("validation.between", {
          field: t("password"),
          min: 3,
          max: 31,
        }),
      })
      .max(31, {
        message: t("validation.between", {
          field: t("password"),
          min: 3,
          max: 31,
        }),
      }),
  });
};

export default async function register(props: ILogin) {
  const result = (await schema()).safeParse(props);

  if (!result.success) {
    return {
      result: false,
      errors: z.flattenError(result.error).fieldErrors,
    };
  }

  return {
    result: true,
  };
}
