import axios from '../axiosWrapper';

let prefix = process.env.API_ROOT
//更新数据到QAD，发送xml格式数据
export const shopwebIntegrationByXml = (params) => {
    let config = {
        headers: {
            'Content-Type': 'text/xml',
            'SOAPAction': ''
        },
    };
    // return axios.post(`${prefix}/qxi/services/QdocWebService`, params, config);
    return axios.post(`${prefix}/qxiProxy.php`, params, config);

};

