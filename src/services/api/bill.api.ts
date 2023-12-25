import BaseAxios from "../axios/baseAxios";
import instance from "../axios/configAxios";

class BillAPI extends BaseAxios {}

export default new BillAPI("/Bills", instance);
