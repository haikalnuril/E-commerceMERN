import { toast } from "react-toastify";
import { store } from "../store";

export const access = async () => {
    const user = store.getState().userState.user;
    try {
        if (!user) {
            setTimeout(() => {
                toast.warn("You must log in first!");
            }, 100);
            return false;
        }
        return true;
    } catch (error) {
        return false;
    }
};
