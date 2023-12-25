import { useAppSelector } from "@/stores/hooks";
import { RootState } from "@/stores/store";

const authSelector = (state: RootState) => state.auth;

export const useAuth = () => useAppSelector(authSelector);
