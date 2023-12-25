import { SuccessResponseProp } from "@/types/common";
import BaseAxios from "../axios/baseAxios";
import instance from "../axios/configAxios";
import { ResponseGetExamCardAndDetails } from "@/models/prescriptions.model";

class PrescriptionsApi extends BaseAxios {
  getPrescriptionsAndDetails = async (examCardId: string) => {
    const response: SuccessResponseProp<ResponseGetExamCardAndDetails> = await this.axios.get(
      `${this.prefix}/GetByExamCardIdV2`,
      { params: { examCardId } }
    );

    return response.metadata;
  };
}

export default new PrescriptionsApi("/Prescriptions", instance);
