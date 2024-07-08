/* eslint-disable @typescript-eslint/no-explicit-any */
import clsx from "clsx";
import style from "./Contacts.module.scss";
import { FC, useCallback, useEffect } from "react";

import { useIsTabletDevice } from "@/hooks/IsSmallDevice";
import IconMain from "@/images/header/logo.svg?react";
import { paths } from "@/service/paths";
import Soc from "./Soc";
import { useAppSelector } from "@/hooks/hook";
import { canvasCreate, handleDraw } from "@/service/canvasContact";
import { useSettigsQuery } from "@/store/rtk/main/settings";

const Contacts: FC = () => {
  const isTablet = useIsTabletDevice();
  const { data } = useSettigsQuery(undefined);

  const { path } = useAppSelector((state) => state.menu);

  const scrollCallback = useCallback((e: MouseEvent) => {
    handleDraw(e);
  }, []);

  useEffect(() => {
    canvasCreate("canvas-contacts");
  }, []);

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

          {isTablet && <IconMain />}

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

              <Soc className={clsx(style.footer__soc)} />
            </div>

            <div className={clsx(style.law)}>
              <a
                className={clsx(style.law__link)}
                href={data?.policy}
                target="_blank"
              >
                Политика использования персональных данных
              </a>
              <a
                className={clsx(style.law__link)}
                href={data?.cookies}
                target="_blank"
              >
                Политика использования Cookie
              </a>
              <a
                className={clsx(style.law__link)}
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
