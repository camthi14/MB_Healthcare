import { IPatient } from "@/models/patient.model";
import { faker } from "@faker-js/faker";
import patientTypes from "./patientType";
import { sample } from "lodash";

const first_name = faker.person.firstName();
const last_name = faker.person.lastName();
const patient_id = faker.string.uuid();

const relatives: IPatient[] = [...Array(4)].map((_, index) => {
  const relatives_id = faker.string.uuid();
  const relatives_last = faker.person.lastName();
  const relatives_first = faker.person.firstName();

  return {
    id: relatives_id,
    display_name: `${relatives_first} ${relatives_last}`,
    email: faker.internet.email(),
    password: faker.internet.password(),
    phone_number: faker.phone.number(),
    relationship: sample(["mother", "father", "others", "married_couple"]),
    status: sample(["active", "inactive", "waiting"]),
    photo: faker.image.avatar(),
    patient_type_id: patientTypes[0].id!,
    relatives_id: patient_id,
    dataInfo: {
      id: faker.number.int(),
      first_name: relatives_first,
      last_name: relatives_last,
      patient_id: relatives_id,
      address: `11${index + 5}/1A${index + 5}, Phường Hưng Lơi, Ninh Kiều, Cần Thơ, Việt Nam`,
      birth_date: faker.date.birthdate().toString(),
      gender: sample(["MALE", "FEMALE"]),
      desc: faker.commerce.productDescription(),
    },
  };
});

const accounts: IPatient = {
  id: patient_id,
  photo: faker.image.avatar(),
  display_name: `${first_name} ${last_name}`,
  phone_number: faker.phone.number(),
  email: faker.internet.email(),
  password: faker.internet.password(),
  patient_type_id: patientTypes[0].id!,
  status: sample(["active", "inactive", "waiting"]),
  relatives,
  relationship: "me",
  dataInfo: {
    id: faker.number.int(),
    first_name,
    last_name,
    patient_id,
    address: "112/1A3, Phường Hưng Lơi, Ninh Kiều, Cần Thơ, Việt Nam",
    birth_date: new Date().toString(),
    gender: sample(["MALE", "FEMALE"]),
    desc: faker.commerce.productDescription(),
  },
};

export default accounts;
