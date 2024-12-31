import axios from 'axios';

export default class sysEditService {

    static getContractType() {
        return axios.post('http://localhost:8080/SysParamsEdit/getContractType');
    }

    static async addContractType(contractTypeName: string) {
        return axios.post('http://localhost:8080/SysParamsEdit/addContractType', {
            contractTypeName: contractTypeName,
        });
    }

}