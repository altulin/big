import { categories, categoriesPitshes } from "./script";

/* eslint-disable @typescript-eslint/no-explicit-any */
const makeArrayPayLoad = (
  category: string,
  categoryPitch: string | null,
  fields: any,
) => {
  const works: any = [];
  if (
    category === categories.main_category ||
    category === categories.young_talent
  ) {
    fields.forEach((el: any) => {
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

      // const formData = new FormData();
      // formData.append("project_image", project_image);

      const work = {
        title: title,
        brand,
        nomination,
        deadlines,
        goals,
        idea: idea,
        about_project: about_project,
        work_link: work_link,
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
        const {
          title,
          deadlines,
          idea,
          about_project,
          work_link,
          project_image,
        } = el;

        const formData = new FormData();
        formData.append("project_image", project_image);

        const work = {
          title: title,
          deadlines,
          idea: idea,
          about_project: about_project,
          work_link: work_link,
          formData,
        };

        works.push(work);
      });
    }

    if (categoryPitch === categoriesPitshes.mega) {
      fields.forEach((el: any) => {
        console.log(el.file);
        const { title, idea, file } = el;

        const formData = new FormData();
        formData.append("script", file);

        const work = {
          title: title,
          idea: idea,
          //   formData,
        };

        works.push(work);
      });
    }
  }

  return { works };
};

export default makeArrayPayLoad;
