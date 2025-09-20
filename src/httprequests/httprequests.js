import axios from "axios";

const httprequest = axios.create({
  baseURL: "https://api.redseam.redberryinternship.ge/api",
});

export default httprequest;
