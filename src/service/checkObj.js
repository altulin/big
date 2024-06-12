export const checkObj = (data) => {
  if (typeof data === "object" && !Array.isArray(data) && data !== null) {
    return true;
  }

  return false;
};
