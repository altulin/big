/* eslint-disable @typescript-eslint/no-explicit-any */
import { FC, useCallback } from "react";
import style from "./JuryCard.module.scss";
import clsx from "clsx";
import { HashLink } from "react-router-hash-link";
import IconBack from "@/images/jury_account/back.svg?react";
import { useLocation } from "react-router-dom";
import { paths } from "@/service/paths";

interface INavLink {
  dir: "prev" | "next";
  label: string;
  state: {
    page: string;
    id: string;
    number: number;
    list: string[];
    values: any[];
  };
}

const NavLink: FC<INavLink> = ({ dir, label, state }) => {
  const getLinkHref = useCallback(
    (direction: "prev" | "next") => {
      const array = state.list;
      const number = state.number;
      const length = array.length;
      const nextEl = number < length - 1 ? number + 1 : number;
      const prevEl = number > 0 ? number - 1 : number;
      if (direction === "prev") {
        return prevEl;
      } else if (direction === "next") {
        return nextEl;
      }
    },
    [state.list, state.number],
  );

  return (
    <HashLink
      to={`/${paths.jury_account_card}/${
        state.list[getLinkHref(dir) as number]
      }`}
      className={clsx(style.navigate__link, style[`navigate__link--${dir}`])}
      state={{
        page: state.page,
        number: getLinkHref(dir),
        list: state.list,
        id: state.list[getLinkHref(dir) as number],
        values: state.values,
      }}
    >
      <span
        className={clsx(style.navigate__icon, style[`navigate__icon--${dir}`])}
      >
        <IconBack />
      </span>
      <span className={clsx(style.navigate__label)}>{label}</span>
    </HashLink>
  );
};

const JuryCardNav: FC = () => {
  const location = useLocation();
  return (
    <div className={clsx(style.navigate)}>
      <NavLink state={location.state} dir="prev" label="предыдущая" />
      <NavLink state={location.state} dir="next" label="следующая" />
    </div>
  );
};
export default JuryCardNav;
