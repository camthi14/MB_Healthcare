import { ISpecialist } from "@/models/specialty.model";
import { faker } from "@faker-js/faker";
import { sample } from "lodash";

// const specialty: ISpecialist[] = [...Array(24)].map((_, index) => ({
//   id: faker.number.int({ min: 1 }),
//   desc: faker.commerce.productDescription(),
//   name: faker.company.buzzPhrase(),
//   time_chekup_avg: 15,
//   status: sample(["active", "inactive", "banned", "waitting", "reject"]),
//   photo: faker.image.avatar(),
// }));

const specialty: ISpecialist[] = [
  {
    id: 1,
    name: "Thần kinh",
    desc: "Thần kinh",
    photo:
      "https://res.cloudinary.com/dmfjxdewg/image/upload/v1697814319/specialties/121042-than-kinh_s1fmyu.jpg",
    time_chekup_avg: 15,

    status: "active",
  },
  {
    id: 4,
    name: "Tiêu hoá",
    desc: "âsasa",
    photo:
      "https://res.cloudinary.com/dmfjxdewg/image/upload/v1698649256/specialties/181619-sieu-am-thai_xe1nvd.jpg",
    time_chekup_avg: 15,

    status: "active",
  },
  {
    id: 5,
    name: "Cơ xương khớp",
    desc: "Cơ xương khớp",
    photo:
      "https://res.cloudinary.com/dmfjxdewg/image/upload/v1698384372/specialties/120331-co-xuong-khop_czjsaq.jpg",
    time_chekup_avg: 15,

    status: "active",
  },
  {
    id: 6,
    name: "Tim mạch",
    desc: "sdse",
    photo:
      "https://res.cloudinary.com/dmfjxdewg/image/upload/v1698649347/specialties/141059-ung-thu-phoi_phydg3.jpg",
    time_chekup_avg: 15,

    status: "active",
  },
];

export default specialty;
