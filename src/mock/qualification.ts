import { IQualification } from "@/models/qualification.model";
import { faker } from "@faker-js/faker";
import { sample } from "lodash";

const qualification: IQualification[] = [...Array(24)].map((_, index) => ({
  id: faker.number.int({ min: 1 }),
  character: sample(["PGS", "BS", "TS", "Th.S", "GS"]),
  name: sample(["Phó giáo sư", "Bác sĩ", "Tiến sĩ", "Thạc sĩ", "Giá sư"]),
}));

export default qualification;
