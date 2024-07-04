import img from "@/images/speakers/Img_speak.jpg";

export interface ISpeaker {
  name: string;
  job: string;
  img: string;
  info_1: string;
  info_2: string;
}

const test: ISpeaker = {
  name: "Константин Константинов",
  job: "оператор-постановщик, ЮАР",
  img: img,
  info_1:
    "Родился 18 апреля 1955 года в семье ленинградских интеллигентов. Его отец (Василий Григорьевич, 1918—2007) был преподавателем в ЛИСИ, а мать (Галина Флорентьевна Науменко-Брайтигам[2], 1922—2010) — работником библиотеки[3][4]. В детстве музыкой не занимался. Увлечение музыкой началось, когда Майк впервые услышал музыку The Beatles[5]. ",
  info_2:
    "Родился 18 апреля 1955 года в семье ленинградских интеллигентов. Его отец (Василий Григорьевич, 1918—2007) был преподавателем в ЛИСИ, а мать (Галина Флорентьевна Науменко-Брайтигам[2], 1922—2010) — работником библиотеки[3][4]. В детстве музыкой не занимался. Увлечение музыкой началось, когда Майк впервые услышал музыку The Beatles[5]. ",
};

export const speakers: ISpeaker[] = [test, test, test, test, test, test, test];
