import { TOKEN } from "./const";

export const token = () => {
  return localStorage.getItem(TOKEN);
};
