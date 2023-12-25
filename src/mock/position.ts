import { IPosition } from "@/models/position.model";
import { faker } from "@faker-js/faker";

const position: IPosition[] = [...Array(24)].map((_, index) => ({
  id: faker.number.int({ min: 1 }),
  desc: faker.commerce.productDescription(),
  name: faker.company.buzzPhrase(),
}));

export default position;
