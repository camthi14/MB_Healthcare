import { IDepartment } from "@/models/department.model";
import { faker } from "@faker-js/faker";

const department: IDepartment[] = [...Array(24)].map((_, index) => ({
  id: faker.number.int({ min: 1 }),
  name: faker.commerce.department(),
  desc: faker.commerce.productDescription(),
}));

export default department;
