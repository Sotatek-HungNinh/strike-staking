import axios from "axios";

const axiosCoinBaseInstance = (options: any = {}) => {
    const {headers = {}} = options;
    return axios.create({
        baseURL: `${process.env.REACT_APP_COIN_BASE_URL}`,
        timeout: Number(process.env.REACT_APP_TIMEOUT),
        responseType: 'json',
        headers: {
          'Content-Type': 'application/json',
          ...headers
        },
      });
};
export default axiosCoinBaseInstance;
