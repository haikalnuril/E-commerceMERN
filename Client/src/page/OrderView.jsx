import { redirect, useLoaderData } from "react-router-dom";
import { access } from "../middlewares/authMiddleware";
import customAPI from "../api";

export const loader = async () => {
    const accessCheck = await access();
    if (!accessCheck) {
        return redirect("/login");
    }
    const response = await customAPI.get("/orders/current/user");

    const orders = response.data?.data;
    console.log(orders);
    return { orders };
};

const OrderView = () => {
    const { orders } = useLoaderData();
    if(!orders.length){
        return <h1 className="text-center text-primary font-bold text-3xl border-b pb-4">No Order yet</h1>
    }
    return (
        <div className="overflow-x-auto">
            <table className="table table-xs table-pin-rows table-pin-cols">
                <thead>
                    <tr>
                        <td>No</td>
                        <td>Order By</td>
                        <td>Product</td>
                        <td>Total</td>
                        <td>Status Payment</td>
                    </tr>
                </thead>
                <tbody>
                    {orders.map((item, index) => (
                        <tr key={item._id} className="hover">
                            <th>{index + 1}</th>
                            <td>
                                {item?.firstName} {item?.lastName}
                            </td>
                            <td>
                                {item?.itemsDetail.map((itemProduct) => (
                                    <ul className="list-disc">
                                        <li key={itemProduct.product}>
                                            {itemProduct.name} <br />
                                            <span className="font-bold">
                                                Jumlah : {itemProduct.quantity}{" "}
                                                Product
                                            </span>
                                            <br />
                                            {itemProduct.price.toLocaleString(
                                                "us-US",
                                                {
                                                    style: "currency",
                                                    currency: "USD",
                                                }
                                            )}
                                        </li>
                                    </ul>
                                ))}
                            </td>
                            <td>{item.total.toLocaleString(
                                                "us-US",
                                                {
                                                    style: "currency",
                                                    currency: "USD",
                                                }
                                            )}</td>
                            <td>{item.status === "success" ? (<span className="btn btn-success">Success</span>) : item.status === "pending" ? (<span className="btn btn-info">Pending</span>) : (<span className="btn btn-error">Error</span>)}</td>
                        </tr>
                    ))}
                </tbody>
            </table>
        </div>
    );
};

export default OrderView;
