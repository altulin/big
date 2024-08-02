/* eslint-disable @typescript-eslint/no-explicit-any */
import clsx from "clsx";
import style from "./Contacts.module.scss";
import { FC, useCallback, useEffect } from "react";

import { useIsTabletDevice } from "@/hooks/IsSmallDevice";
import IconMain from "@/images/header/logo.svg?react";
import IconMainDark from "@/images/contacts/logo_blue_dark.svg?react";

import { paths } from "@/service/paths";
import Soc from "./Soc";
import { useAppSelector } from "@/hooks/hook";
import { canvasCreate, handleDraw } from "@/service/canvasContactLeft";
import { useSettigsQuery } from "@/store/rtk/main/settings";
import useIsYang from "@/hooks/isYang";

const Contacts: FC = () => {
  const isTablet = useIsTabletDevice();
  const { data } = useSettigsQuery(undefined);
  const { isYang } = useIsYang();
  const { path } = useAppSelector((state) => state.menu);
  const yang = useAppSelector((state) => state.yang);

  const scrollCallback = useCallback((e: MouseEvent) => {
    handleDraw(e);
  }, []);

  useEffect(() => {
    canvasCreate("canvas-contacts", isYang ? "#552bef" : "#13ff00");
  }, [yang]);

  useEffect(() => {
    if (isTablet) return;

    if (path === paths.contacts) {
      document.body.addEventListener("mousemove", scrollCallback);
    } else {
      document.body.removeEventListener("mousemove", scrollCallback);
    }
  }, [isTablet, path, scrollCallback]);

  return (
    <section
      id={paths.contacts}
      className={clsx(style.contacts, "contacts", "panel")}
    >
      <div className={clsx(style.contacts__inner)}>
        <div className={clsx(style.info)}>
          <h2 className={clsx(style.title)}>
            <span>Контакты</span>
          </h2>

          {isTablet && !isYang && <IconMain />}
          {isTablet && isYang && <IconMainDark />}

          <div className={clsx(style.footer)}>
            <div className={clsx(style.footer__top)}>
              <div className={clsx(style.footer__inner)}>
                <a
                  className={clsx(style.footer__link)}
                  target="_blank"
                  href={`mailto:${data?.contact_email}`}
                >
                  {data?.contact_email}
                </a>
              </div>

              <Soc
                array={["nuum", "tg", "grape"]}
                className={clsx(style.footer__soc)}
              />
            </div>

            <div className={clsx(style.law)}>
              <a
                className={clsx(
                  style.law__link,
                  isYang && style.law__link_yang,
                )}
                href={data?.policy}
                target="_blank"
              >
                Политика использования персональных данных
              </a>
              {/* <a
                className={clsx(
                  style.law__link,
                  isYang && style.law__link_yang,
                )}
                href={data?.cookies}
                target="_blank"
              >
                Политика использования Cookie
              </a> */}
              <a
                className={clsx(
                  style.law__link,
                  isYang && style.law__link_yang,
                )}
                href={data?.festival_regulations}
                target="_blank"
              >
                Регламент фестиваля
              </a>
            </div>
          </div>
        </div>

        <div className={clsx(style.canvas)}>
          <figure className={clsx(style.canvas__figure, "js-contacts-figure")}>
            <canvas id="canvas-contacts"></canvas>
          </figure>
        </div>
      </div>
    </section>
  );
};

export default Contacts;
