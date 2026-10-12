// Единственное место, где читается import.meta.env (прямой доступ в остальном коде запрещён в ESLint).
// Значения задаются в .env (общие) и .env.development / .env.production (API).

const required = (name: string, value: string | undefined) => {
  if (!value) console.error(`Не задана переменная окружения ${name}`);
  return value ?? "";
};

export const env = {
  mode: import.meta.env.MODE,
  isProd: import.meta.env.PROD,
  isDev: import.meta.env.DEV,

  apiHost: required("VITE_APP_API_HOST", import.meta.env.VITE_APP_API_HOST),
  paymentPublicId: required(
    "VITE_APP_API_PUBLIC_ID",
    import.meta.env.VITE_APP_API_PUBLIC_ID,
  ),

  seo: {
    title: import.meta.env.VITE_APP_TITLE as string | undefined,
    description: import.meta.env.VITE_APP_DESCRIPTION as string | undefined,
    url: import.meta.env.VITE_APP_URL as string | undefined,
  },

  docs: {
    personalData: import.meta.env.VITE_APP_PERSONAL_DATA as string | undefined,
    festival: import.meta.env.VITE_APP_FESTIVAL_DATA as string | undefined,
  },

  deadlinePass: required(
    "VITE_APP_DEADLINE_PASS",
    import.meta.env.VITE_APP_DEADLINE_PASS,
  ),
} as const;
