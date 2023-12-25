import { IPatientType } from "@/models/patient.model";
import { faker } from "@faker-js/faker";
import { sample } from "lodash";

const patientTypes: IPatientType[] = [...Array(2)].map((_, index) => ({
  id: faker.number.int({ min: 1 }),
  desc: faker.commerce.productDescription(),
  name: sample(["Bệnh nhân cao tuổi", "Bệnh nhân bình thường"]),
}));

export default patientTypes;
