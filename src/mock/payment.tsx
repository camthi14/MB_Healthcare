import { BLUR_HASH } from "@/constants/common";
import { Image } from "expo-image";

export const payments = [
  {
    title: "Thanh toán trong kì nghỉ",
    value: "OFFLINE",
    image: (styles: any) => (
      <Image
        source={require("@/assets/icon/3009489.png")}
        style={styles}
        placeholder={BLUR_HASH}
        contentFit="cover"
        transition={1000}
      />
    ),
  },
  {
    title: "Thanh toán vnPay",
    value: "VN_PAY",
    image: (styles: any) => (
      <Image
        source={require("@/assets/icon/Icon-VNPAY-QR.png")}
        style={styles}
        placeholder={BLUR_HASH}
        contentFit="cover"
        transition={1000}
      />
    ),
  },
];
