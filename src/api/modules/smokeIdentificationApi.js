import axios from '../axiosWrapper';
let prefix = process.env.API_ROOT
//烟雾识别api smokeDetection
export const smokeDetection = (params) => {
    let config = {
        headers: {
            'Content-Type': 'application/x-www-form-urlencoded'
        }
    };
    return axios.post(`${prefix}/detection/smokeDetection.php`, params, config);

};
//性别年龄识别api ageGenderDetection
export const ageGenderDetection = (params) => {
    let config = {
        headers: {
            'Content-Type': 'application/x-www-form-urlencoded'
        }
    };
    return axios.post(`${prefix}/detection/ageGenderDetection.php`, params, config);

};

//喷嘴识别api nozzleDetection
export const nozzleDetection = (params) => {
    let config = {
        headers: {
            'Content-Type': 'application/x-www-form-urlencoded'
        }
    };
    return axios.post(`${prefix}/detection/nozzleDetection.php`, params, config);

};


