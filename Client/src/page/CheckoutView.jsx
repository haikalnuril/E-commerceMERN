import CartTotal from "../components/CartTotal";
import FormInput from "../components/Form/FormInput";
import { useSelector } from "react-redux";
import { useEffect } from "react";
import customAPI from "../api";
import { toast } from "react-toastify";

const insertSnapScript = () => {
    return new Promise((resolve) => {
        const script = document.createElement("script");
        script.src = "https://app.sandbox.midtrans.com/snap/snap.js";
        script.setAttribute(
            "data-client-key",
            import.meta.env.VITE_CLIENT_MIDTRANS
        );
        script.onload = () => resolve();
        document.body.appendChild(script);
    });
};

const CheckoutView = () => {
    const user = useSelector((state) => state.userState.user);
    const cart = useSelector((state) => state.cartState.CartItems);

    useEffect(() => {
        insertSnapScript();
    }, []);

    const handleCheckout = async (e) => {
        e.preventDefault();
        const form = e.target;
        const formData = new FormData(form);

        const data = Object.fromEntries(formData);
        const newArrayCart = cart.map((item) => {
            return {
                product: item.productId,
                quantity: item.amount,
            };
        });

        console.log(newArrayCart);

        try {
            const response = await customAPI.post("/orders", {
                email: data.email,
                firstName: data.firstName,
                lastName: data.lastName,
                phone: data.phone,
                cartItem: newArrayCart,
            });

            const snapToken = response.data.token;

            window.snap.pay(snapToken.token, {
                // Optional
                onSuccess: function (result) {
                    console.log(result);
                    alert("Berhasil");
                },
                // Optional
                onPending: function (result) {
                    console.log(result);
                    alert("Pending");
                },
                // Optional
                onError: function (result) {
                    console.log(result);
                    alert("Error");
                },
            });

            toast.success("Berhasil Checkout");
        } catch (error) {
            console.log(error);
        }
    };
    return (
        <>
            <div className="border-b border-primary pb-5 mt-5">
                <h2 className="text-2xl font-bold capitalize">
                    Checkout Product
                </h2>
            </div>
            <div className="mt-8 grid gap-y-8 gap-x-2 lg:grid-cols-12">
                <div className="lg:col-span-8">
                    <form
                        className="bg-base-300 rounded-2xl grid grid-y-5 p-5 items-center"
                        method="POST"
                        onSubmit={handleCheckout}
                    >
                        <div className="grid grid-cols-2 gap-x-4">
                            <FormInput
                                label="First Name"
                                name="firstName"
                                type="text"
                            />
                            <FormInput
                                label="Last Name"
                                name="lastName"
                                type="text"
                            />
                        </div>
                        <FormInput
                            label="Email"
                            name="email"
                            type="email"
                            defaultValue={user.user.email}
                        />
                        <FormInput label="Phone" name="phone" type="text" />
                        <button type="submit" className="mt-8 btn btn-primary">
                            Bayar
                        </button>
                    </form>
                </div>
                <div className="lg:col-span-4 lg:pl-4">
                    <CartTotal />
                </div>
            </div>
        </>
    );
};

export default CheckoutView;
