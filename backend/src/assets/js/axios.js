import axios from 'axios';
const axiosInstance = axios.create();
axiosInstance.interceptors.response.use(function (response) {
  const {status,request} = response;
  if (status !== 200) {
    alert(`请求接口${request.responseURL}失败, status: ${status}`);
    return {};
  }
  return response.data;
}, function (error) {
  // Do something with response error
  alert(`请求接口是报错`, error.message);
  return Promise.reject(error);
});
export default axiosInstance;
