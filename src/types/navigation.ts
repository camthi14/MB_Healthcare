export enum Paths {
  Login = "Login",
  Register = "Register",
  UpdateProfile = "",
  Notifications = "Notifications",
  SpecialtyDetails = "SpecialtyDetails",
  BookingPayments = "BookingPayments",
  TutorialBooking = "TutorialBooking",
  SearchResults = "SearchResults",
  PackageHealthy = "PackageHealthy",
  DoctorDetails = "DoctorDetails",
  BookingSelectPatient = "BookingSelectPatient",
  BookingSuccess = "BookingSuccess",
}

export type RootStackParamList = {
  Main: undefined;
  Login: undefined;
  Register: undefined;
  UpdateProfile: {
    userId: number;
  };
  Notifications: undefined;
  SpecialtyDetails: {
    id: number;
  };
  BookingSelect: undefined;
  BookingInfoDetails: undefined;
  BookingSelectPayments: undefined;
  TutorialBooking: undefined;
  SearchResults: undefined;
  PackageHealthy: undefined;
  DoctorDetails: {
    id: string;
  };
  SeeAllReview: {
    doctorName: string;
  };
  BookingSelectPatient: undefined;
  BookingSelectSpecialty: undefined;
  BookingSelectDoctor: undefined;
  BookingSuccess: undefined;
  BookingSelectScheduleDoctor: undefined;

  AddRelationship: undefined;

  Booking: undefined;

  EditProfile: { patientId: string };
  ListRelationship: undefined;
  Security: { patientId: string };

  DetailsExamination: {
    bookingId: string;
  };

  SeeSubclinical: {
    examCardId: string;
  };
  SeeBill: {
    examCardId: string;
  };
  SeePrescription: {
    examCardId: string;
  };
};

declare global {
  namespace ReactNavigation {
    interface RootParamList extends RootStackParamList {}
  }
}
