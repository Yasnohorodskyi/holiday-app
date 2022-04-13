import axios from "axios";

const apiHoliday = axios.create({
  baseURL: "https://date.nager.at/api/v3/publicholidays",
  withCredentials: false,
  headers: {
    Accept: "application/json",
    "Content-Type": "application/json",
  },
});

export default {
  getHolidays(year, country) {
    return apiHoliday.get(`/${year}/${country}`);
  },
};
