import clsx from "clsx";
import style from "./Contacts.module.scss";
import { FC, useCallback, useEffect } from "react";

import { useIsTabletDevice } from "@/hooks/IsSmallDevice";
import IconMain from "@/images/header/logo.svg?react";
import { law } from "./data";
import { paths } from "@/service/paths";
import Soc from "./Soc";
import { useAppSelector } from "@/hooks/hook";
import { canvasCreate, handleDraw } from "@/service/canvasContact";

const Contacts: FC = () => {
  const isTablet = useIsTabletDevice();

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
                  href="mailto:info@bigpicturefestival.ru"
                >
                  info@bigpicturefestival.ru
                </a>
              </div>

              <Soc className={clsx(style.footer__soc)} />
            </div>

            <div className={clsx(style.law)}>
              {law.map((item, i) => (
                <a
                  key={i}
                  className={clsx(style.law__link)}
                  href={item.href}
                  target="_blank"
                >
                  {item.label}
                </a>
              ))}
            </div>
          </div>
        </div>

        <div className={clsx(style.canvas)}>
          <figure className={clsx(style.canvas__figure, "js-logo-placemove")}>
            <canvas id="canvas-contacts"></canvas>
          </figure>
        </div>
      </div>
    </section>
  );
};

export default Contacts;
