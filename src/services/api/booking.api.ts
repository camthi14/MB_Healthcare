import { BookingMobileState, BookingType } from "@/models/booking.model";
import BaseAxios from "../axios/baseAxios";
import instance from "../axios/configAxios";
import { SuccessResponseProp } from "@/types/common";
import { convertFileImage } from "@/utils/format";

declare global {
  interface FormDataValuePost {
    uri: string;
    name: string;
    type: string;
  }

  interface FormData {
    append(name: string, value: FormDataValuePost, fileName?: string): void;
    set(name: string, value: FormDataValuePost, fileName?: string): void;
  }
}

class BookingAPI extends BaseAxios {
  public booking = async (payload: BookingMobileState) => {
    const formData = new FormData();

    Object.keys(payload).forEach((k) => {
      const key = k as keyof BookingMobileState;

      if (key === "images" && payload[key]?.length) {
        const length = payload[key]?.length!;

        for (let index = 0; index < length; index++) {
          const element = payload[key]![index];
          const { filename, type } = convertFileImage(element);
          formData.append(`${key}`, { uri: element!, name: filename, type });
        }
      } else {
        formData.append(key, payload[key] as string);
      }
    });

    const response: SuccessResponseProp<string> = await this.axios.post(
      `${this.prefix}/BookingMobile`,
      formData,
      {
        transformRequest: () => formData,
        headers: { "Content-Type": "multipart/form-data" },
      }
    );

    return response.metadata;
  };

  public getHistory = async (patientId: string, date?: string) => {
    const response: SuccessResponseProp<BookingType[]> = await this.axios.get(
      `${this.prefix}/GetHistoryBooking/${patientId}`,
      { params: { date } }
    );

    return response.metadata;
  };

  public cancel = async (bookingId: string) => {
    const response: SuccessResponseProp<boolean> = await this.axios.post(
      `${this.prefix}/Cancel/${bookingId}`
    );

    return response.metadata;
  };
}

export default new BookingAPI("/Bookings", instance);
