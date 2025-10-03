"use client";

import { FormEvent, useState } from "react";
import { useTranslations } from "next-intl";
import Link from "next/link";
import loginValidation from "@/validations/login";
import ZodErrors from "@/components/ZodErrors";
import { Button, TextField, Box } from "@mui/material";

export default function LoginPage() {
  const t = useTranslations();

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [errors, setErrors] = useState<{
    email?: string[];
    password?: string[];
  }>();

  async function onFormSubmit(e: FormEvent<HTMLFormElement>) {
    e.preventDefault();

    setErrors(() => ({}));

    const validationResult = await loginValidation({
      email,
      password,
    });

    if (!validationResult.result) {
      setErrors(() => ({ ...validationResult.errors }));

      return;
    }

    const res = await (
      await fetch("/api/auth/login", {
        method: "POST",
        body: JSON.stringify({ email, password }),
      })
    ).json();
    console.log('res', res);
  }

  return (
    <div className="w-screen h-screen flex items-center justify-center bg-gray-100 flex-col">
      <Box
        component="form"
        noValidate
        autoComplete="off"
        className="flex flex-col gap-2 rounded border border-gray-200 pt-4 py-8 px-12 w-xs bg-white"
        onSubmit={onFormSubmit}
      >
        <p className="mb-3 font-medium text-lg">{t("signIn")}</p>
        <div className="mb-1 w-full">
          <TextField
            id="email"
            label={t("email")}
            variant="outlined"
            value={email}
            onFocus={() => setErrors((prev) => ({ ...prev, email: undefined }))}
            onChange={(e) => setEmail(e.target.value)}
            required
            fullWidth
            error={(errors?.email || []).length > 0}
          />
          <ZodErrors errors={errors?.email} />
        </div>

        <div className="mb-1 w-full">
          <TextField
            id="password"
            label={t("password")}
            type="password"
            variant="outlined"
            value={password}
            onFocus={() =>
              setErrors((prev) => ({ ...prev, password: undefined }))
            }
            onChange={(e) => setPassword(e.target.value)}
            required
            fullWidth
            error={(errors?.password || []).length > 0}
          />
          <ZodErrors errors={errors?.password} />
        </div>

        <Button variant="contained" type="submit">
          {t("submit")}
        </Button>
      </Box>

      <p className="mt-4 opacity-50 text-gray-700 text-sm">
        {t("dontHaveAnAccount")}
        <Link className="underline font-medium ml-1" href="/sign-up">
          {t("signUp")}
        </Link>
      </p>
    </div>
  );
}
