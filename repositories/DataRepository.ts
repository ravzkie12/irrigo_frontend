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
        const res = await backendConn.post(`account/update`, formData, {
            headers : { Authorization : `Bearer ${localStorage.getItem("jwt_token")}` }
        })
        console.log('Update account res:', res)
        return res.data
    }
    async DeleteAccount(account_id: number) {
        const res = await backendConn.delete(`account/delete/${account_id}`, {
            headers : {
                Authorization : `Bearer ${ localStorage.getItem("jwt_token") }`
            }
        })
        console.log('Delete account res:', res)
        return res.data
    }
}