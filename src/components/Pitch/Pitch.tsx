/* eslint-disable @typescript-eslint/no-explicit-any */
import clsx from "clsx";
import style from "./Pitch.module.scss";
import { FC } from "react";
import { paths } from "@/service/paths";
import { usePitch } from "./scriprt";
import useIsAuth from "@/hooks/isAuth";
import { useAppDispatch } from "@/hooks/hook";
import { stepTo } from "@/store/modal/modalSlice";
import { useNavigate } from "react-router-dom";
import { setCategory } from "@/store/category/categorySlice";
import { categories } from "../Pass/script";
import { useIsTabletDevice } from "@/hooks/IsSmallDevice";

const Pitch: FC = () => {
  const isAuth = useIsAuth();
  const dispatch = useAppDispatch();
  const navigate = useNavigate();
  const isTablet = useIsTabletDevice();
  const { pitch } = usePitch();

  const handleClick = () => {
    if (!isAuth) {
      dispatch(stepTo({ auth: { step: 1 } }));
    } else {
      // console.log(type);
      dispatch(setCategory(categories.brand_pitches));
      // dispatch(setCategoryPitch(type));

      navigate(`/${paths.pass}`);
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
                  <span>Дедлайн подачи работ — {item.deadline}</span>
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
