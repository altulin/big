/* eslint-disable @typescript-eslint/no-explicit-any */
import { useAppSelector } from "@/hooks/hook";
import { FC, useEffect } from "react";
import TextInput from "../form/TextInput";
import clsx from "clsx";
import style from "./Pass.module.scss";
import SelectField from "../form/Select";
import UploadImage from "../form/UploadImage";
import { categories, categoriesPitshes } from "./script";
import { useLazyNominationsQuery } from "@/store/rtk/nominations/nominations";
import UploadPass from "../form/UploadPass";
import { useParams } from "react-router-dom";

const SubmissionContent: FC<{ formik: any; id: number }> = ({ formik, id }) => {
  const { category, categoryPitch } = useAppSelector((state) => state.category);
  const [getNomination, { data }] = useLazyNominationsQuery(undefined);
  const params = useParams();

  useEffect(() => {
    category !== categories.brand_pitches &&
      getNomination({ offset: 0, limit: 100 }).unwrap();
  }, [category, getNomination]);

  const options = data?.results.map((item: any) => {
    return { value: item.id, label: item.title };
  });

  // const optionsCategory = [
  //   { value: 0, label: "Молодой специалист" },
  //   { value: 1, label: "опытный продакшн" },
  // ];

  return (
    <>
      {category !== categories.brand_pitches && (
        <TextInput
          name={`fields.${id}.brand`}
          label="Бренд"
          placeholder="Введите название бренда"
        />
      )}

      {/* {category === categories.brand_pitches && (
        <p className={clsx(style.big__text)}>
          Если твой опыт не превышает 2х лет или твоему продакшну еще нет 2х лет
          — выбирай "молодой специалист".
        </p>
      )}

      {category === categories.brand_pitches && (
        <SelectField
          form={formik}
          name={`fields.${id}.nomination`}
          label="Категория"
          prefix="pass"
          placeholder="Не выбрано"
          options={optionsCategory}
        />
      )} */}

      <TextInput
        name={`fields.${id}.title`}
        label="Название"
        placeholder="Введите название работы"
      />

      {category !== categories.brand_pitches && (
        <p className={clsx(style.big__text)}>
          Напоминаем, что название авторов/продакшна нигде не должно
          фигурировать. Исключение - селфпромо работа
        </p>
      )}

      {category !== categories.brand_pitches && (
        <SelectField
          form={formik}
          name={`fields.${id}.nomination`}
          label="Номинация"
          prefix="pass"
          placeholder="Не выбрано"
          options={options}
        />
      )}

      {!categoryPitch && (
        <TextInput
          name={`fields.${id}.deadlines`}
          label="Сроки"
          placeholder="Введите период реализации компании"
        />
      )}

      {category !== categories.brand_pitches && (
        <>
          <TextInput
            name={`fields.${id}.goals`}
            label="Цели и задачи"
            placeholder="Опишите, какая перед вами стояла задача, как был поставлен бриф"
            as="textarea"
          />

          <TextInput
            name={`fields.${id}.target_audience`}
            label="ЦА"
            placeholder="Опишите, для какой целевой аудитории создавался проект"
            as="textarea"
          />
        </>
      )}

      <TextInput
        name={`fields.${id}.idea`}
        label="Инсайт и идея"
        placeholder="Опишите, как вы пришли к идее, в чем ее уникальность"
        as="textarea"
      />

      {categoryPitch !== categoriesPitshes.mega && (
        <>
          <TextInput
            name={`fields.${id}.about_project`}
            label="О проекте"
            placeholder="Расскажите, в чем уникальность проекта с точки зрения его реализации"
            as="textarea"
          />

          <TextInput
            name={`fields.${id}.work_link`}
            label="Ссылка"
            placeholder="http://"
          />
        </>
      )}

      {category === categories.main_category && (
        <>
          <p className={clsx(style.big__text)}>
            Cсылка на одну из видеоплатформ: Vimeo или ссылка на Яндекс Диск/
            Google Drive в открытом доступе.
          </p>
          <p className={clsx(style.big__text)}>
            Напоминаем, что канал не должен называться именем продакшна. Мы
            рекомендуем создать специальный фестивальный аккаунт.
          </p>
        </>
      )}

      {category === categories.young_talent && (
        <>
          <p className={clsx(style.big__text)}>
            Работа должна быть загружена на платформу NUUM с хэштегом
            #bpfyoung24.
          </p>
        </>
      )}

      {category !== categories.brand_pitches && (
        <TextInput
          name={`fields.${id}.credits`}
          label="Кредитсы"
          placeholder="Опишите всю команду, работавшую над проектом. Не забывайте ваших партнеров, агентство, продакшн, клиента."
          as="textarea"
        />
      )}

      {categoryPitch !== categoriesPitshes.mega && (
        <div className={clsx(style.upload_image)}>
          <p className={clsx(style.upload_image__label)}>Имидж проекта</p>
          <p className={clsx(style.upload_image__text)}>
            Пропорции 16:9, .jpeg, .png до 5 МБ
          </p>
          <UploadImage
            name={`fields.${id}.project_image`}
            data={formik}
            prefix="upload_image"
            modifier={params.id_work && "edit"}
          />
        </div>
      )}
      {categoryPitch === categoriesPitshes.mega && (
        <UploadPass
          name={`fields.${id}.file`}
          label={
            !formik.values?.fields[`${id}`]?.file?.name
              ? "Прикрепить сценарий"
              : formik.values.fields[`${id}`].file.name
          }
          accept=".doc, .docx, .pdf, .ppt, .pptx, .key"
          modifier="file-profile"
          formik={formik}
        ></UploadPass>
      )}
    </>
  );
};
export default SubmissionContent;
