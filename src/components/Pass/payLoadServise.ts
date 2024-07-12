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
        name_work,
        brand,
        nomination,
        deadlines,
        targets,
        insight_and_idea,
        credits,
        about_the_project,
        link,
        target_audience,
        project_image,
      } = el;

      const formData = new FormData();
      formData.append("project_image", project_image);

      const work = {
        title: name_work,
        brand,
        nomination,
        deadlines,
        goals: targets,
        idea: insight_and_idea,
        about_project: about_the_project,
        work_link: link,
        credits,
        target_audience,
        formData,
      };

      works.push(work);
    });
  }

  if (category === categories.brand_pitches) {
    if (categoryPitch === categoriesPitshes.nuum) {
      fields.forEach((el: any) => {
        const {
          name_work,
          deadlines,
          insight_and_idea,
          about_the_project,
          link,
          project_image,
        } = el;

        const formData = new FormData();
        formData.append("project_image", project_image);

        const work = {
          title: name_work,
          deadlines,
          idea: insight_and_idea,
          about_project: about_the_project,
          work_link: link,
          formData,
        };

        works.push(work);
      });
    }

    if (categoryPitch === categoriesPitshes.mega) {
      fields.forEach((el: any) => {
        console.log(el.file);
        const { name_work, insight_and_idea, file } = el;

        const formData = new FormData();
        formData.append("script", file);

        const work = {
          title: name_work,
          idea: insight_and_idea,
          //   formData,
        };

        works.push(work);
      });
    }
  }

  return { works };
};

export default makeArrayPayLoad;
