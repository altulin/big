/* eslint-disable @typescript-eslint/no-explicit-any */
import clsx from "clsx";
import style from "./Pitch.module.scss";
import { FC } from "react";
import { paths } from "@/service/paths";
import { usePitch } from "./scriprt";
import useIsAuth from "@/hooks/isAuth";
import { useAppDispatch } from "@/hooks/hook";
import { setErrorModal, stepTo } from "@/store/modal/modalSlice";
import { useNavigate } from "react-router-dom";
import { setCategory } from "@/store/category/categorySlice";
import { categories, categoriesPitshes } from "../Pass/script";
import { useIsTabletDevice } from "@/hooks/IsSmallDevice";
import useDeadline from "@/hooks/deadline";

const Pitch: FC = () => {
  const isAuth = useIsAuth();
  const dispatch = useAppDispatch();
  const navigate = useNavigate();
  const isTablet = useIsTabletDevice();
  const { pitch } = usePitch();
  const isDeadline = useDeadline(import.meta.env.VITE_APP_DEADLINE_PASS);

  const handleClick = () => {
    if (!isAuth) {
      dispatch(stepTo({ auth: { step: 1 } }));
    } else {
      if (isDeadline) {
        dispatch(setCategory(categories.brand_pitches));
        navigate(`/${paths.pass}`);
      } else {
        dispatch(setErrorModal("Срок подачи работ истёк!"));
      }
    }
  };

  return (
    <section id={paths.pitch} className={clsx(style.pitch, "panel")}>
      <div className={clsx(style.pitch__inner)}>
        {pitch.map((item, i) => (
          <div key={i} className={clsx(style.pitch__item)}>
            <div className={clsx(style.head, style[`head--${item.modifier}`])}>
              <h3 className={clsx(style.title)}>
                {isTablet ? item.title_mob : item.title}
              </h3>
              {<item.icon />}
            </div>

              <>
                <p className={clsx(style.pitch__text)}>{item.text}</p>

                <div className={clsx(style.list)}>
                  {item.list.map((el, i) => {
                    return (
                      <li key={i} className={clsx(style.list__item)}>
                        {el.label_2 ? (
                          <div className={clsx(style.list__item_inner)}>
                            <span>{el.label}</span>
                            <a
                              className={clsx(style.list__link)}
                              href={el.href}
                              target="_blank"
                            >
                              {el.link}
                            </a>
                            <span>{el.label_2}</span>
                          </div>
                        ) : (
                          <div className={clsx(style.list__item_inner)}>
                            <span>{el.label}</span>
                            <a
                              className={clsx(style.list__link)}
                              href={el.href}
                              target="_blank"
                            >
                              {el.link}
                            </a>
                          </div>
                        )}
                      </li>
                    );
                  })}
                </div>

                <div className={clsx(style.pitch__bottom)}>
                  <button
                    onClick={() => handleClick()}
                    className={clsx(style.pitch__button)}
                  >
                    участвовать
                  </button>
                  <p className={clsx(style.pitch__deadline)}>
                    {item.deadline.map((el, i) => (
                      <span key={i}>{el}</span>
                    ))}
                  </p>
                </div>
              </>
          </div>
        ))}
      </div>
    </section>
  );
};

export default Pitch;
