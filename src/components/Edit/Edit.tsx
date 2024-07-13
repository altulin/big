import clsx from "clsx";
import style from "@/components/Pass/Pass.module.scss";
import { FC, useEffect } from "react";
import ScrollBarComponent from "@/hoc/scrollbar/ScrollBarComponent";
import EditCategory from "./EditCategory";
import { useNavigate, useParams } from "react-router-dom";
import { useLazyGetWorkQuery } from "@/store/rtk/orders/get_work";
import EditContent from "./EditContent";
import EditForm from "./EditForm";
import { useAppDispatch } from "@/hooks/hook";
import { setCategory, setCategoryPitch } from "@/store/category/categorySlice";
import { categories, categoriesPitshes } from "../Pass/script";

const Edit: FC = () => {
  const { id } = useParams();
  const [getWork, { data, status }] = useLazyGetWorkQuery();
  const navigate = useNavigate();
  const dispatch = useAppDispatch();

  useEffect(() => {
    if (status !== "fulfilled") return;
    dispatch(setCategory(data.category));

    dispatch(setCategoryPitch(data.pitch_brand ? data.pitch_brand : null));
  }, [data?.category, data?.pitch_brand, dispatch, status]);

  useEffect(() => {
    getWork({ id });
  }, [getWork, id]);

  useEffect(() => {
    if (status === "rejected") {
      navigate("/");
    }
  }, [navigate, status]);

  useEffect(() => {
    // console.log(data);
  }, [data]);

  if (status !== "fulfilled") return;

  return (
    <section className={clsx(style.pass)}>
      <ScrollBarComponent>
        <div className={clsx(style.pass__inner, "scroll-content")}>
          <EditCategory category={data.category} />
          <EditContent>
            <EditForm data={data} />{" "}
          </EditContent>
        </div>
      </ScrollBarComponent>
    </section>
  );
};

export default Edit;
