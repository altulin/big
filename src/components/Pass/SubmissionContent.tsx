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

const SubmissionContent: FC<{ formik: any; id: number }> = ({ formik, id }) => {
  const { category, categoryPitch } = useAppSelector((state) => state.category);
  const [getNomination, { data }] = useLazyNominationsQuery(undefined);

  useEffect(() => {
    category !== categories.brand_pitches &&
      getNomination({ offset: 0, limit: 100 }).unwrap();
  }, [category, getNomination]);

  const options = data?.results.map((item: any) => {
    return { value: item.id, label: item.title };
  });

  return (
    <>
      {category !== categories.brand_pitches && (
        <TextInput
          name={`fields.${id}.brand`}
          label="Бренд"
          placeholder="Введите название бренда"
        />
      )}

      <TextInput
        name={`fields.${id}.name_work`}
        label="Название"
        placeholder="Введите название работы"
      />

      {category !== categories.brand_pitches && (
        <p className={clsx(style.big__text)}>
          Напоминаем, что название авторов/продакшена нигде не должно
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

      {categoryPitch !== categoriesPitshes.mega && (
        <TextInput
          name={`fields.${id}.deadlines`}
          label="Сроки"
          placeholder="Введите период реализации компании"
        />
      )}

      {category !== categories.brand_pitches && (
        <>
          <TextInput
            name={`fields.${id}.targets`}
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
        name={`fields.${id}.insight_and_idea`}
        label="Инсайт и идея"
        placeholder="Опишите, как вы пришли к идее, в чем ее уникальность"
        as="textarea"
      />

      {categoryPitch !== categoriesPitshes.mega && (
        <>
          <TextInput
            name={`fields.${id}.about_the_project`}
            label="О проекте"
            placeholder="Расскажите, в чем уникальность проекта с точки зрения его реализации"
            as="textarea"
          />

          <TextInput
            name={`fields.${id}.link`}
            label="Ссылка"
            placeholder="http://"
          />
        </>
      )}

      {category === categories.main_category && (
        <>
          <p className={clsx(style.big__text)}>
            Cсылка на одну из видеоплатформ: Vimeo / Youtube или ссылка на
            Яндекс Диск/ Google Drive в открытом доступе.
          </p>
          <p className={clsx(style.big__text)}>
            Напоминаем, что канал не должен называться именем продакшена. Мы
            рекомендуем создать специальный фестивальный аккаунт.
          </p>
        </>
      )}

      {category !== categories.brand_pitches && (
        <TextInput
          name={`fields.${id}.credits`}
          label="Кредитсы"
          placeholder="Опишите команду"
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
          accept=".doc, .docx"
          modifier="file-profile"
          formik={formik}
        ></UploadPass>
      )}
    </>
  );
};
export default SubmissionContent;
