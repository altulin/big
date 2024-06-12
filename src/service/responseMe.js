import { TOKEN } from "../service/const";
import { meGetUserMe } from "../api/axs/me";
import { setUser, setSuccessModal, clearAllStep } from "../store/appSlice";
import { store } from "../store";

const responseMe = async (access, msg) => {
  try {
    localStorage.clear();
    localStorage.setItem(TOKEN, access);
    const responseMe = await meGetUserMe(localStorage.getItem(TOKEN));
    if (responseMe.status !== 200) {
      throw new Error();
    }

    store.dispatch(setUser(responseMe.data));

    if (!msg) {
      store.dispatch(clearAllStep());
      return;
    }

    store.dispatch(setSuccessModal(msg));
  } catch (error) {
    store.dispatch(clearAllStep());
  }
};

export default responseMe;
