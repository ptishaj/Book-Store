import axios from "axios";

const BASEURL = "https://book-e-sell-node-api.vercel.app/api/user";

class AuthService {
  Register = async (payload) => {
    try {
      const response = await axios.post(`${BASEURL}`, payload);
      return response.data; // Return the data from the response
    } catch (error) {
      throw error; // Throw the error to handle it in the component
    }
  };
  login = async (payload) => {
    try {
      const response = await axios.post(`${BASEURL}/login`, payload);
      return response.data; // Return the data from the response
    } catch (error) {
      throw error; // Throw the error to handle it in the component
    }
  };
}
// eslint-disable-next-line
export default new AuthService();