import axios from 'axios';
import { ContractType } from './systemEdit.model';

export default {

    getContractType: async function (): Promise<any> {
        const result = axios.post('http://localhost:8080/SysParamsEdit/getContractType');
        return result;
    },

    addContractType: async function (contractTypeName: string): Promise<any> {
        const result = axios.post('http://localhost:8080/SysParamsEdit/addContractType', {
            contractTypeName: contractTypeName,
        });
        return result;
    },

    deleteContractType: async function (deleteArray: any): Promise<any> {
        const result = await axios.post(`http://localhost:8080/SysParamsEdit/deleteContractType`, deleteArray);
        return result;
    },

    editContractType: async function (contractType: ContractType) {
        const result = await axios.post('http://localhost:8080/SysParamsEdit/editContractType', contractType)
        return result;
    }

}