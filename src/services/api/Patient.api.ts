import { IPatient } from "@/models/patient.model";
import { SuccessResponseProp } from "@/types/common";
import BaseAxios from "../axios/baseAxios";
import instance from "../axios/configAxios";
import { AddRelationshipPayload } from "@/types/patient";
import { convertFileImage } from "@/utils/format";

class DoctorAPI extends BaseAxios {
  getRelationship = async (patientId: string) => {
    const response: SuccessResponseProp<IPatient> = await instance.get(
      `${this.prefix}/Relationship/${patientId}`
    );

    return response.metadata;
  };

  addRelationship = async (payload: AddRelationshipPayload) => {
    const response: SuccessResponseProp<IPatient> = await instance.post(
      `${this.prefix}/Relationship`,
      payload
    );

    return response.metadata;
  };

  changePhoto = async (patientId: string, uri: string) => {
    const formData = new FormData();

    const { filename, type } = convertFileImage(uri);
    formData.append(`photo`, { uri: uri, name: filename, type });

    const response: SuccessResponseProp<IPatient> = await this.axios.post(
      `${this.prefix}/ChangePhoto/${patientId}`,
      formData,
      {
        transformRequest: () => formData,
        headers: { "Content-Type": "multipart/form-data" },
      }
    );

    return response.metadata;
  };
}

export default new DoctorAPI("/Patients", instance);
