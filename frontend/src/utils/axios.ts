import axios from "axios";

const axiosInstance = axios.create({
  baseURL: "http://localhost:4000/api/v1/",
});

//TODO [Axios] Create error handing
axiosInstance.interceptors.request.use(
  function (config) {
    // Do something before request is sent
    return config;
  },
  function (error) {
    if (error.response.status === 500) {
      return Promise.reject(error.response.data);
    }
    return Promise.reject(error);
  }
);

// Add a response interceptor
axiosInstance.interceptors.response.use(
  function (response) {
    // Do something with response data
    return response;
  },
  function (error) {
    if (error.response.status === 500) {
      return Promise.reject(error.response.data);
    }
    return Promise.reject(error);
  }
);

export default axiosInstance;
