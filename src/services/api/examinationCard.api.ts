import { GetCardExamBooking } from "@/models/examinationCard.model";
import { SuccessResponseProp } from "@/types/common";
import BaseAxios from "../axios/baseAxios";
import instance from "../axios/configAxios";

class ExaminationCardsAPI extends BaseAxios {
  getByBookingId = async (bookingId: string) => {
    const response: SuccessResponseProp<GetCardExamBooking> = await this.axios.get(
      `${this.prefix}/GetByBookingId/${bookingId}`
    );

    return response.metadata;
  };
}

export default new ExaminationCardsAPI("/ExaminationCards", instance);
