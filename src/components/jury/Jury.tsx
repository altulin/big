import clsx from "clsx";
import style from "./Jury.module.scss";
import { FC } from "react";
import Marquee from "react-fast-marquee";
import { jury } from "./script";

const Jury: FC = () => {
  return (
    <section className={clsx(style.jury)}>
      <div className={clsx(style.jury__inner)}>
        <div className={clsx(style.jury__head)}>
          <h2 className={clsx(style.title)}>Жюри</h2>
        </div>

        <div className={clsx(style.marquee)}>
          <div className={clsx(style.marquee__inner, "scroll")}>
            {jury.map((item, index) => (
              <Marquee
                key={index}
                autoFill={true}
                // gradient={false}
                speed={10}
                direction={index % 2 === 0 ? "left" : "right"}
                className={clsx(style.marquee__row)}
              >
                <div className={clsx(style.marquee__item)}>
                  <img
                    className={clsx(style.marquee__avatar)}
                    src={item.avatar}
                    alt={item.name}
                  />
                  <p className={clsx(style.marquee__text)}>
                    <span className={clsx(style.marquee__name)}>
                      {item.name}
                    </span>
                    <span className={clsx(style.marquee__job)}>{item.job}</span>
                  </p>
                </div>
              </Marquee>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

export default Jury;
