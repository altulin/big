/* eslint-disable @typescript-eslint/no-unused-vars */
/* eslint-disable @typescript-eslint/no-explicit-any */
import { FC, useCallback, useEffect, useState } from "react";
import style from "./JuryCard.module.scss";
import clsx from "clsx";
import { HashLink } from "react-router-hash-link";
import IconBack from "@/images/jury_account/back.svg?react";
import { useLocation, useNavigate } from "react-router-dom";
import { paths } from "@/service/paths";
import { useIsTabletDevice } from "@/hooks/IsSmallDevice";
import JuryAccountListRowStatus from "../jury_account_list/JuryAccountListRowStatus";
import {
  getCategory,
  tabs,
  useCheckDeadline,
} from "../jury_account_list/service";
import { useLazyGetWorksQuery } from "@/store/rtk/jury/works";
import { useAppDispatch } from "@/hooks/hook";
import { setSuccessModal } from "@/store/modal/modalSlice";

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
  const { isShort } = useCheckDeadline();
  const [isActiveTab, setActiveTab] = useState(0);
  const [getWorks] = useLazyGetWorksQuery();
  const navigate = useNavigate();
  const dispatch = useAppDispatch();

  const handleTab = (e: any) => {
    e.preventDefault();
    const target = e.target;
    const tab = target.getAttribute("data-tab");

    getWorks({ category: getCategory(Number(tab)), is_short_list: true })
      .unwrap()
      .then((data) => {
        if (!data) return;

        const state: any = { page: paths.jury_account_list_short };
        const path = paths.jury_account_list;
        const firstWork = data.results[0];
        if (!firstWork) {
          dispatch(
            setSuccessModal({
              text: "В этой вкладке нет работ",
            }),
          );
          return;
        }

        state.id = firstWork?.id;
        state.number = 0;
        state.list = data.results.map((n: any) => n.id);
        navigate(`/${path}`, { state });
        setActiveTab(Number(tab));
      });
  };

  return (
    <div className={clsx(style.navigate)}>
      {isShort && isTablet && (
        <ul className={clsx(style.navigate__list)}>
          {tabs.map((item, index) => (
            <li className={clsx(style.navigate__item)} key={index}>
              <a
                href="#"
                className={clsx(
                  style.navigate__tab,
                  isActiveTab === index && style["navigate__tab--active"],
                )}
                data-tab={index}
                onClick={handleTab}
              >
                {item}
              </a>
            </li>
          ))}
        </ul>
      )}

      <div className={clsx(style.navigate__inner)}>
        <NavLink state={location.state} dir="prev" label="предыдущая" />

        {isTablet && (
          <div className={clsx(style.navigate__number)}>
            <span>{location.state.number + 1}</span>
          </div>
        )}

        <NavLink state={location.state} dir="next" label="следующая" />
      </div>
      {isTablet && is_reviewed && !isShort && (
        <JuryAccountListRowStatus status="рассмотрено" />
      )}
    </div>
  );
};
export default JuryCardNav;
