import BaseAxios from "../axios/baseAxios";
import instance from "../axios/configAxios";

class NotificationAPI extends BaseAxios {}

export default new NotificationAPI("/Notifications", instance);
