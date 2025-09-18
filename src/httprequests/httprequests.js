import axios from "axios";

export default class HttpRequests {
    getproducts(){
        return axios.get("https://api.redseam.redberryinternship.ge/api/products");

    };
    
}