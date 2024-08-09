import { categories, categoriesPitshes } from "./script";

/* eslint-disable @typescript-eslint/no-explicit-any */

export const getBase64 = async (file: any) => {
  return new Promise((resolve, reject) => {
    const reader = new FileReader();
    reader.readAsDataURL(file);
    reader.onload = () => {
      resolve(reader.result);
    };
    reader.onerror = reject;
  });
};

const makeArrayPayLoad = async (
  category: string,
  categoryPitch: string | null,
  fields: any,
) => {
  const works: any = [];
  if (
    category === categories.main_category ||
    category === categories.young_talent
  ) {
    fields.forEach(async (el: any) => {
      const {
        title,
        brand,
        nomination,
        deadlines,
        goals,
        idea,
        credits,
        about_project,
        work_link,
        target_audience,
        project_image,
      } = el;

      const work = {
        title,
        brand,
        nomination,
        deadlines,
        goals,
        idea: idea,
        about_project,
        work_link,
        credits,
        target_audience,
        project_image,
      };

      works.push(work);
    });
  }

  if (category === categories.brand_pitches) {
    if (categoryPitch === categoriesPitshes.nuum) {
      fields.forEach((el: any) => {
        const { title, idea, file, brand_category } = el;

        const work = {
          title: title,
          idea: idea,
          file,
          brand_category,
        };

        works.push(work);
      });
    }

    if (categoryPitch === categoriesPitshes.mega) {
      fields.forEach((el: any) => {
        const { title, idea, file } = el;

        const work = {
          title: title,
          idea: idea,
          file,
        };

        works.push(work);
      });
    }
  }

  return { works };
};

export default makeArrayPayLoad;
