import FormAuth from "../../components/FormAuth";
import { redirect } from "react-router-dom";
import customAPI from "../../api";
import { toast } from "react-toastify";

export const action = async ({ request }) => {
    const formInputData = await request.formData();
    const data = Object.fromEntries(formInputData);

    try {
        const response = await customAPI.post("/auth/register", data);
        console.log(response);
        toast.success("Register Success");
        return redirect("/login");
    } catch (error) {
        const errorMessage = error?.response?.data?.message;
        toast.error(errorMessage);
        return null;
    }
}

const RegisterView = () => {
    return <FormAuth isRegister={true} />;
};

export default RegisterView;
