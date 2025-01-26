import axios from 'axios';
import { ContractType, Organ } from './contractParamEdit.model';

export default {

    getContractType: async function (): Promise<any> {
        const result = axios.post('http://localhost:8080/ContractParamEdit/getContractType');
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
    },

    getOrgan: async function (): Promise<any> {
        const result = axios.post('http://localhost:8080/SysParamsEdit/getOrgan');
        return result;
    },

    editOrgan: async function (organ: Organ) {
        const result = await axios.post('http://localhost:8080/SysParamsEdit/editOrgan', organ)
        return result;
    },

    deleteOrgan: async function (deleteArray: any) {
        const result = await axios.post(`http://localhost:8080/SysParamsEdit/deleteOrgan`, deleteArray);
        return result;
    }

}