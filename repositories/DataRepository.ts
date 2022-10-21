import { backendConn } from "./connection";

export default class DataRepository {
    async GetFarmersList(): Promise<any> {
        const farmerListRes = await backendConn.get('account_list/', {
            headers : { Authorization : `Bearer ${localStorage.getItem("jwt_token")}` }
        })
        console.log(farmerListRes)
        return farmerListRes.data.results
    }
    async UpdateAccount(formData: any): Promise<any> {
        console.log('This is the fvcking token', localStorage.getItem("jwt_token"))
        const updateAccountRes = await backendConn.post('account/update', formData, {
            headers : { Authorization : `Bearer ${localStorage.getItem("jwt_token")}` }
        })
        console.log('Update account res:', updateAccountRes)
        return updateAccountRes
    }
}