/* eslint-disable @typescript-eslint/no-explicit-any */
export function appendArray(form_data: any, values: any, name: any) {
  if (!values && name) form_data.append(name, "");
  else {
    if (typeof values == "object") {
      console.log(values);
      for (key in values) {
        if (typeof values[key] == "object")
          appendArray(form_data, values[key], name + "[" + key + "]");
        else form_data.append(name + "[" + key + "]", values[key]);
      }
    } else form_data.append(name, values);
  }

  console.log(form_data);

  return form_data;
}
