const useParse = (str: string | undefined) => {
  if (!str) return { prefix: null, id: null, name: null };

  const list = str.split(".");

  const pref_parse = list[0] || null;
  const id_parse = list[1] || null;
  const name_parse = list[2] || null;

  return { pref_parse, id_parse, name_parse };
};

export default useParse;
