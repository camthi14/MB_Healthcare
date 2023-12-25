import { formatDate } from "@/helpers/date.helper";
import { IDoctorResponse } from "@/models/doctor.model";
import { IScheduleDoctor } from "@/models/scheduleDoctor.model";
import { selectWeek } from "@/utils/formatTime";
import { faker } from "@faker-js/faker";
import { sample } from "lodash";
import department from "./department";
import position from "./position";
import qualification from "./qualification";
import sessionCheckup from "./sessionCheckup";
import specialty from "./specialty";

const doctors: IDoctorResponse[] = [...Array(4)].map((_, index) => {
  const doctorId = faker.string.uuid();

  const departmentData = department[index];
  const positionData = position[index];
  const qualificationData = qualification[index];
  const specialtyData = specialty[index];
  const date = new Date();

  const schedules = selectWeek(date).map((value, _index): IScheduleDoctor => {
    const sessionData = sessionCheckup[index % 2 === 0 ? 0 : 1];

    return {
      id: _index + 1,
      date: value.toString(),
      doctor_id: doctorId,
      session_checkup_id: sessionData.id!,
      shift_extra: 10,
      status: sample(["active", "inactive", "complete"]),
      sessionData,
    };
  });

  const scheduleToday = schedules.find((v) => formatDate(v.date) === formatDate(new Date()));

  return {
    id: doctorId,
    department_id: departmentData.id!,
    departmentData,
    display_name: faker.person.fullName(),
    position_id: positionData.id!,
    positionData,
    photo: sample([
      "https://res.cloudinary.com/dmfjxdewg/image/upload/v1697708224/avatars/thi_jfgjqr.jpg",
      "https://res.cloudinary.com/dmfjxdewg/image/upload/v1697905235/avatars/182233-viem-gan_hvyqry.jpg",
      "https://res.cloudinary.com/dmfjxdewg/image/upload/v1697896130/avatars/181619-sieu-am-thai_jvtres.jpg",
    ]),
    qualificationData,
    qualified_doctor_id: qualificationData.id!,
    speciality_id: specialtyData.id,
    specialtyData,
    desc: faker.commerce.productDescription(),
    email: faker.internet.email(),
    phone_number: faker.phone.number(),
    schedules,
    scheduleToday: scheduleToday!,
  };
});

export default doctors;
