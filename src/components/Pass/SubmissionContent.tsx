/* eslint-disable @typescript-eslint/no-explicit-any */
import { useAppSelector } from "@/hooks/hook";
import { FC } from "react";
import TextInput from "../form/TextInput";
import clsx from "clsx";
import style from "./Pass.module.scss";
import SelectField from "../form/Select";
import UploadImage from "../form/UploadImage";
import { categories, categoriesPitshes } from "./script";
import Upload from "../form/Upload";

const SubmissionContent: FC<{ formik: any }> = ({ formik }) => {
  const { category, categoryPitch } = useAppSelector((state) => state.category);

  return (
    <>
      {category !== categories.brand_pitches && (
        <TextInput
          name="brand"
          label="Бренд"
          placeholder="Введите название бренда"
        />
      )}

      <TextInput
        name="name_work"
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
          name="nomination"
          label="Номинация"
          prefix="pass"
          placeholder="Не выбрано"
        />
      )}

      {categoryPitch !== categoriesPitshes.mega && (
        <TextInput
          name="deadlines"
          label="Сроки"
          placeholder="Введите период реализации компании"
        />
      )}

      {category !== categories.brand_pitches && (
        <>
          <TextInput
            name="targets"
            label="Цели и задачи"
            placeholder="Опишите, какая перед вами стояла задача, как был поставлен бриф"
            as="textarea"
          />

          <TextInput
            name="target_audience"
            label="ЦА"
            placeholder="Опишите, для какой целевой аудитории создавался проект"
            as="textarea"
          />
        </>
      )}

      <TextInput
        name="insight_and_idea"
        label="Инсайт и идея"
        placeholder="Опишите, как вы пришли к идее, в чем ее уникальность"
        as="textarea"
      />

      {categoryPitch !== categoriesPitshes.mega && (
        <>
          <TextInput
            name="about_the_project"
            label="О проекте"
            placeholder="Расскажите, в чем уникальность проекта с точки зрения его реализации"
            as="textarea"
          />

          <TextInput name="link" label="Ссылка" placeholder="http://" />
        </>
      )}

      {category !== categories.brand_pitches && (
        <>
          <p className={clsx(style.big__text)}>
            Cсылка на одну из видеоплатформ: Vimeo / Youtube или ссылка на
            Яндекс Диск/ Google Drive в открытом доступе.
          </p>
          <p className={clsx(style.big__text)}>
            Напоминаем, что канал не должен называться именем продакшена. Мы
            рекомендуем создать специальный фестивальный аккаунт.
          </p>

          <TextInput
            name="credits"
            label="Кредитсы"
            placeholder="Опишите команду"
            as="textarea"
          />
        </>
      )}

      {categoryPitch !== categoriesPitshes.mega && (
        <div className={clsx(style.upload_image)}>
          <p className={clsx(style.upload_image__label)}>Имидж проекта</p>
          <p className={clsx(style.upload_image__text)}>
            Пропорции 16:9, .jpeg, .png до 5 МБ
          </p>
          <UploadImage
            name="project_image"
            data={formik}
            prefix="upload_image"
          />
        </div>
      )}

      {categoryPitch === categoriesPitshes.mega && (
        <Upload
          name="file"
          label={
            !formik.values.file ? "Прикрепить сценарий" : formik.values.file
          }
          accept=".doc, .docx"
          modifier="file-profile"
        ></Upload>
      )}
    </>
  );
};
export default SubmissionContent;
