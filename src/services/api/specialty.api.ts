import BaseAxios from "../axios/baseAxios";
import instance from "../axios/configAxios";

class SpecialtyAPI extends BaseAxios {}

export default new SpecialtyAPI("/Specialists", instance);
