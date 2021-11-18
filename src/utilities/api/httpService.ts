import axios from 'axios';


const axiosInstance = axios.create({
    headers:{
       // 'content-type':'application/x-www-form-urlencoded',
    }
})


export default axiosInstance;