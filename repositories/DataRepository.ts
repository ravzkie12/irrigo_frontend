import { backendConn } from "./connection";

export default class DataRepository {
    async GetFarmersList(): Promise<any> {
        const farmerListRes = await backendConn.get('account_list/', {
            headers : {
                'Authorization' : `Bearer ${localStorage.getItem("jwt_token")}`
            }
        })
        console.log(farmerListRes)
        return farmerListRes.data.results
    }
    async UpdateAccount(formData: any): Promise<any> {
        const updateAccountRes = await backendConn.post('account/update', formData)
        console.log('Update account res:', updateAccountRes)
        return updateAccountRes
    }
}