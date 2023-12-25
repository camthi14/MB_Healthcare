import BaseAxios from "../axios/baseAxios";
import instance from "../axios/configAxios";

class ExaminationCardsDetailsApi extends BaseAxios {}

export default new ExaminationCardsDetailsApi("/ExaminationCardsDetails", instance);
