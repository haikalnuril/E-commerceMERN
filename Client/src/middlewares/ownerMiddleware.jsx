import customAPI from "../api";

export const checkAccess = async () => {
    try {
        const response = await customAPI.get("/auth/getuser");
        return response.data.data.user.role === "owner"; 
    } catch (error) {
        if (error.response && error.response.status === 401) {
            console.log("Unauthorized, redirecting to login...");
            return false;
        }
        throw error;
    }
};