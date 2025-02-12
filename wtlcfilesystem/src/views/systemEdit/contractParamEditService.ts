import axios from 'axios';
import { ContractType, Organ } from './contractParamEdit.model';

export default class ContractParamEditService {

    public getContractType(): Promise<any> {
        return axios.post("http://localhost:8080/ContractParamEdit/getContractType");
    }

    public deleteContractType(contractType: any): Promise<any> {
        return axios.post("http://localhost:8080/ContractParamEdit/deleteContractType", contractType, {
            headers: {
                "Content-Type": "application/json"
            }
        });
    }
    public getContractOrganType(): Promise<any> {
        return axios.post("http://localhost:8080/ContractParamEdit/getContractOrganType");
    }

}