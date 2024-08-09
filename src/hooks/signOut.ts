import { useAppDispatch } from "./hook";
import { setUserData } from "@/store/user/userSlice";
import { setMenuControl } from "@/store/menu/menuSlice";
import { paths } from "@/service/paths";
import { useNavigate } from "react-router-dom";
import { setCategory, setCategoryPitch } from "@/store/category/categorySlice";
import { categories } from "@/components/Pass/script";

const useSignOut = () => {
  const dispatch = useAppDispatch();
  const navigate = useNavigate();

  const handleSignOut = () => {
    localStorage.clear();
    dispatch(setUserData({}));
    dispatch(setMenuControl(false));
    dispatch(setCategory(categories.main_category));
    dispatch(setCategoryPitch(null));

    navigate(paths.home);
  };

  return { handleSignOut };
};

export default useSignOut;
