import { StyleSheet, Text, View } from "react-native";
import React from "react";
import { FirebaseRecaptchaVerifierModal } from "expo-firebase-recaptcha";
import firebase, { auth } from "@/services/firebase";
import { PhoneAuthProvider, signInWithCredential } from "firebase/auth";
import Container from "./Container";
import InputLabel from "../ui/form/InputLabel";
import { Button } from "react-native-paper";

const Otp = () => {
  const [phoneNumber, setPhoneNumber] = React.useState("");
  const [code, setCode] = React.useState("");
  const [verifyId, setVerifyId] = React.useState<string | null>(null);
  const recaptchaVerifier = React.useRef(null);

  const sendVerification = async () => {
    if (!recaptchaVerifier.current) return;

    const phoneProvider = new PhoneAuthProvider(auth);
    const verificationId = await phoneProvider.verifyPhoneNumber(
      `+${phoneNumber}`,
      recaptchaVerifier.current
    );
    console.log("Success: verificationId successful ", JSON.stringify(verificationId, null, 4));
    alert("Success: verificationId successful ");
    setVerifyId(verificationId);
  };

  const confirmCode = async () => {
    if (!verifyId || !code) return;

    const credential = PhoneAuthProvider.credential(verifyId, code);
    const response = await signInWithCredential(auth, credential);
    console.log("Success: Phone authentication successful ", JSON.stringify(response, null, 4));
    alert("Success: Phone authentication successful ");
    setCode("");
  };

  return (
    <Container style={{ justifyContent: "center", marginHorizontal: 15 }}>
      <FirebaseRecaptchaVerifierModal ref={recaptchaVerifier} firebaseConfig={firebase.options} />
      <InputLabel
        label="Phone number"
        onChangeText={setPhoneNumber}
        keyboardType="phone-pad"
        autoComplete="tel"
        value={phoneNumber}
      />

      <Button onPress={sendVerification}>Send verification</Button>

      <InputLabel label="code" onChangeText={setCode} keyboardType="number-pad" value={code} />

      <Button onPress={confirmCode}>Confirm code</Button>
    </Container>
  );
};

export default Otp;

const styles = StyleSheet.create({});
