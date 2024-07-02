import style from "./Modal.module.scss";
import clsx from "clsx";
import ModalPortal from "../ModalPortal";
import Icon from "@/images/svg/close.svg?react";
import { clearAllStep } from "@/store/modal/modalSlice";
import { useClickAway } from "@uidotdev/usehooks";
import { FC, ReactNode, RefObject, useCallback, useEffect } from "react";
import { useAppDispatch } from "@/hooks/hook";

interface IModal {
  children: ReactNode;
  title?: string;
  modifier?: string;
}

const Modal: FC<IModal> = ({ children, title, modifier }) => {
  const dispatch = useAppDispatch();

  const clearModal = useCallback(
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    (e: any) => {
      if (e.key === "Escape") {
        dispatch(clearAllStep());
      }
    },

    [dispatch],
  );

  useEffect(() => {
    document.body.style.overflow = "hidden";
    document.body.addEventListener("keydown", clearModal);

    return () => {
      document.body.style.overflow = "visible";
      document.body.removeEventListener("keydown", clearModal);
    };
  }, [clearModal]);

  const ref = useClickAway(() => {
    dispatch(clearAllStep());
  });

  return (
    <ModalPortal>
      <div className={clsx(style.modal)}>
        <div
          ref={ref as RefObject<HTMLDivElement>}
          className={clsx(
            style.modal__inner,
            modifier && style[`${modifier}__inner`],
          )}
        >
          <div
            className={clsx(
              style.modal__head,
              modifier && style[`${modifier}__head`],
            )}
          >
            <h2
              className={clsx(
                style.modal__title,
                modifier && style[`${modifier}__title`],
              )}
            >
              {title}
            </h2>
            <button
              className={clsx(
                style.modal__close,
                modifier && style[`${modifier}__close`],
              )}
              onClick={() => dispatch(clearAllStep())}
            >
              <Icon />
            </button>
          </div>

          {children}
        </div>
      </div>
    </ModalPortal>
  );
};
export default Modal;
