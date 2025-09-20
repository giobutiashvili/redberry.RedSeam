import axios from "axios";

const httprequest = axios.create({
  baseURL: "https://api.redseam.redberryinternship.ge/api",
  headers: {
    Accept: "application/json",
  },
});

export default httprequest;
