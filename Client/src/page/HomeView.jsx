import axios from "axios";

try{
    const data = await axios.get("http://localhost:3000/api/v1/products");
    console.log(data);
} catch (error) {
    console.log(error);
}

const HomeView = () => {
    return <div>HomeView</div>;
};

export default HomeView;
