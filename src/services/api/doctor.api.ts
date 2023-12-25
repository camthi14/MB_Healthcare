import { SuccessResponseProp } from "@/types/common";
import BaseAxios from "../axios/baseAxios";
import instance from "../axios/configAxios";
import { IHourObject } from "@/models/scheduleDoctor.model";

class DoctorAPI extends BaseAxios {
  getSchedule = async (params: { doctorId: string; date: string }) => {
    const response: SuccessResponseProp<IHourObject[]> = await instance.get(
      `${this.prefix}/getSchedule`,
      { params: params }
    );

    return response.metadata;
  };
}

export default new DoctorAPI("/Doctors", instance);
