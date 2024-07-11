import { useGetMeMutation } from "@/store/rtk/user/me";
import useSignOut from "./signOut";
import { setUserData } from "@/store/user/userSlice";
import { useAppDispatch } from "./hook";
import { useEffect } from "react";

const useMe = () => {
  const [getMe, meData] = useGetMeMutation();
  const { handleSignOut } = useSignOut();
  const dispatch = useAppDispatch();

  const getMeData = () => {
    getMe(undefined).unwrap();
  };

  useEffect(() => {
    if (meData.status === "rejected") {
      handleSignOut();
    }

    if (meData.status === "fulfilled") {
      dispatch(setUserData(meData.data));
    }
  }, [dispatch, meData]); // eslint-disable-line

  return { getMeData };
};

export default useMe;
