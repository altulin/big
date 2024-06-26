import clsx from "clsx";
import style from "./Contacts.module.scss";
import { FC, useEffect } from "react";

import { useIsTabletDevice } from "@/hooks/IsSmallDevice";
import IconMain from "@/images/header/logo.svg?react";
import { canvasCursor } from "@/service/canvas";
import { law, soc } from "./data";
import { paths } from "@/service/paths";

const Contacts: FC = () => {
  const isTablet = useIsTabletDevice();

  useEffect(() => {
    if (isTablet) return;
    canvasCursor("canvas-contacts");
  }, [isTablet]);

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

              <ul className={clsx(style.soc)}>
                {soc.map((item, i) => (
                  <a
                    className={clsx(style.soc__link)}
                    href={item.href}
                    aria-label="Соц. сети"
                    key={i}
                  >
                    {<item.icon />}
                  </a>
                ))}
              </ul>
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
