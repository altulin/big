/* eslint-disable @typescript-eslint/no-explicit-any */
import { FC, useCallback } from "react";
import style from "./JuryCard.module.scss";
import clsx from "clsx";
import { HashLink } from "react-router-hash-link";
import IconBack from "@/images/jury_account/back.svg?react";
import { useLocation } from "react-router-dom";
import { paths } from "@/service/paths";
import { useIsTabletDevice } from "@/hooks/IsSmallDevice";
import JuryAccountListRowStatus from "../jury_account_list/JuryAccountListRowStatus";

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

const JuryCardNav: FC<{ is_reviewed?: boolean }> = ({ is_reviewed }) => {
  const location = useLocation();
  const isTablet = useIsTabletDevice();

  return (
    <div className={clsx(style.navigate)}>
      <div className={clsx(style.navigate__inner)}>
        <NavLink state={location.state} dir="prev" label="предыдущая" />

        {isTablet && (
          <div className={clsx(style.navigate__number)}>
            <span>{location.state.number + 1}</span>
          </div>
        )}

        <NavLink state={location.state} dir="next" label="следующая" />
      </div>
      {isTablet && is_reviewed && (
        <JuryAccountListRowStatus status="рассмотрено" />
      )}
    </div>
  );
};
export default JuryCardNav;
