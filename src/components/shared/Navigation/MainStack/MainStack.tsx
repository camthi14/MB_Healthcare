import OverlayLoading from "@/components/ui/OverlayLoading";
import { PUSH_EXPO_TOKEN } from "@/constants/socket";
import { useSelectorPushNotifications } from "@/features/pushNotification/pushNotificationSelector";
import AddRelationshipScreen from "@/screens/AddRelationshipScreen";
import BookingSelect from "@/screens/BookingSelect";
import BookingSelectDoctorScreen from "@/screens/BookingSelectDoctorScreen";
import BookingSelectPatientScreen from "@/screens/BookingSelectPatientScreen";
import BookingSelectScheduleDoctorScreen from "@/screens/BookingSelectScheduleDoctorScreen";
import BookingSelectSpecialtyScreen from "@/screens/BookingSelectSpecialtyScreen";
import BookingSuccessfulScreen from "@/screens/BookingSuccessfulScreen";
import DetailsExaminationScreen from "@/screens/DetailsExaminationScreen";
import DoctorDetailsScreen from "@/screens/DoctorDetailsScreen";
import EditProfileScreen from "@/screens/EditProfileScreen";
import ListRelationshipScreen from "@/screens/ListRelationshipScreen";
import MainScreen from "@/screens/MainScreen";
import NotificationsScreen from "@/screens/NotificationsScreen";
import PackageHealthyScreen from "@/screens/PackageHealthyScreen";
import SearchResultsScreen from "@/screens/SearchResultsScreen";
import SecurityScreen from "@/screens/SecurityScreen";
import SeeAllReviewScreen from "@/screens/SeeAllReviewScreen";
import SeeBillScreen from "@/screens/SeeBillScreen";
import SeePrescriptionScreen from "@/screens/SeePrescriptionScreen";
import SeeSubclinicalScreen from "@/screens/SeeSubclinicalScreen";
import SpecialtyDetailsScreen from "@/screens/SpecialtyDetailsScreen";
import TutorialBookingScreen from "@/screens/TutorialBookingScreen/TutorialBookingScreen";
import { socket } from "@/services/socket";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import React, { useEffect } from "react";
import { Text } from "react-native-paper";
import useGetProfile from "./hook/useGetProfile";

const Stack = createNativeStackNavigator();

const MainStack: React.FC = () => {
  const { data, error, isLoading, isValidating } = useGetProfile();
  const { expoPushToken } = useSelectorPushNotifications();

  useEffect(() => {
    if (!data || !expoPushToken) return;
    socket.connect();

    socket.emit(PUSH_EXPO_TOKEN, { userId: data.metadata.id, expoPushToken });
  }, [data, expoPushToken]);

  if (isLoading) return <OverlayLoading visible />;

  if (error) return <Text>Loading error</Text>;

  return (
    <Stack.Navigator initialRouteName="Main">
      <Stack.Screen
        component={MainScreen}
        name="Main"
        options={{ headerShown: false, animation: "fade" }}
      />
      <Stack.Screen
        component={NotificationsScreen}
        name="Notifications"
        options={{ headerShown: false, animation: "fade" }}
      />
      <Stack.Screen
        component={SpecialtyDetailsScreen}
        name="SpecialtyDetails"
        options={{ headerShown: false, animation: "fade" }}
      />
      <Stack.Screen
        component={DoctorDetailsScreen}
        name="DoctorDetails"
        options={{ headerShown: false, animation: "fade" }}
      />
      <Stack.Screen
        component={TutorialBookingScreen}
        name="TutorialBooking"
        options={{ headerShown: false, animation: "fade" }}
      />
      <Stack.Screen
        component={SearchResultsScreen}
        name="SearchResults"
        options={{ headerShown: false, animation: "fade" }}
      />
      <Stack.Screen
        component={PackageHealthyScreen}
        name="PackageHealthy"
        options={{ headerShown: false, animation: "fade" }}
      />
      <Stack.Screen
        component={SeeAllReviewScreen}
        name="SeeAllReview"
        options={{ headerShown: false, animation: "fade" }}
      />
      <Stack.Screen
        component={BookingSelectPatientScreen}
        name="BookingSelectPatient"
        options={{ headerShown: false, animation: "fade" }}
      />
      <Stack.Screen
        component={BookingSelect}
        name="BookingSelect"
        options={{ headerShown: false, animation: "fade" }}
      />
      <Stack.Screen
        component={BookingSuccessfulScreen}
        name="BookingSuccess"
        options={{ headerShown: false, animation: "fade" }}
      />
      <Stack.Screen
        component={BookingSelectSpecialtyScreen}
        name="BookingSelectSpecialty"
        options={{ headerShown: false, animation: "fade" }}
      />
      <Stack.Screen
        component={BookingSelectDoctorScreen}
        name="BookingSelectDoctor"
        options={{ headerShown: false, animation: "fade" }}
      />
      <Stack.Screen
        component={AddRelationshipScreen}
        name="AddRelationship"
        options={{ headerShown: false, animation: "slide_from_right" }}
      />
      <Stack.Screen
        component={BookingSelectScheduleDoctorScreen}
        name="BookingSelectScheduleDoctor"
        options={{ headerShown: false, animation: "fade" }}
      />

      <Stack.Screen
        component={EditProfileScreen}
        name="EditProfile"
        options={{ headerShown: false, animation: "slide_from_right" }}
      />

      <Stack.Screen
        component={ListRelationshipScreen}
        name="ListRelationship"
        options={{ headerShown: false, animation: "slide_from_right" }}
      />

      <Stack.Screen
        component={SecurityScreen}
        name="Security"
        options={{ headerShown: false, animation: "slide_from_right" }}
      />

      <Stack.Screen
        component={DetailsExaminationScreen}
        name="DetailsExamination"
        options={{ headerShown: false, animation: "slide_from_right" }}
      />

      <Stack.Screen
        component={SeeSubclinicalScreen}
        name="SeeSubclinical"
        options={{ headerShown: false, animation: "fade" }}
      />

      <Stack.Screen
        component={SeeBillScreen}
        name="SeeBill"
        options={{ headerShown: false, animation: "fade" }}
      />

      <Stack.Screen
        component={SeePrescriptionScreen}
        name="SeePrescription"
        options={{ headerShown: false, animation: "fade" }}
      />
    </Stack.Navigator>
  );
};

export default MainStack;
