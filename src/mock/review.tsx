import { faker } from "@faker-js/faker";
import { ReviewItemProps } from "@/components/shared/ReviewItem/ReviewItem";

const reviews: ReviewItemProps[] = [...Array(24)].map((_, index) => ({
  id: faker.string.uuid(),
  image: faker.image.avatar(),
  createdAt: faker.date.anytime(),
  display_name: faker.person.fullName(),
  reviewContent: faker.definitions.lorem.words.slice(0, 30).join(" "),
  star: Math.max(10, index + 1),
}));

export default reviews;
