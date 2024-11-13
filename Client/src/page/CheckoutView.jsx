import CartTotal from "../components/CartTotal";
import { Form } from "react-router-dom";
import FormInput from "../components/Form/FormInput";
import { useSelector } from "react-redux";

const CheckoutView = () => {
    const user = useSelector((state) => state.userState.user);
    const cart = useSelector((state) => state.cartState.CartItems);
    return (
        <>
            <div className="border-b border-primary pb-5 mt-5">
                <h2 className="text-2xl font-bold capitalize">
                    Checkout Product
                </h2>
            </div>
            <div className="mt-8 grid gap-y-8 gap-x-2 lg:grid-cols-12">
                <div className="lg:col-span-8">
                    <Form
                        className="bg-base-300 rounded-2xl grid grid-y-5 p-5 items-center"
                        method="POST"
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
                    </Form>
                </div>
                <div className="lg:col-span-4 lg:pl-4">
                    <CartTotal />
                </div>
            </div>
        </>
    );
};

export default CheckoutView;
