import { useGetLinks } from "./script";

/* eslint-disable @typescript-eslint/no-explicit-any */
const useAllLinks = () => {
  const allLinksList: any = [];
  const { links } = useGetLinks();

  links.forEach((item) => {
    allLinksList.push(item.path);
    if (item.submenu) {
      item.submenu.forEach((subItem) => {
        allLinksList.push(subItem.path);
      });
    }
  });

  return { allLinksList };
};

export default useAllLinks;
