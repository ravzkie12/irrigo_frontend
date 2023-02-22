import { backendConn, ubidotsConn } from "./connection";

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
    async GetUbidotsData() {
        const res = await ubidotsConn.get("api/v1.6/variables/63f5813bd8ab69000c32123b/values", {
            headers : {
                "X-Auth-Token" : "BBFF-KUYJurI4HhBGeERrJX7d1wv8CrCdA7", 
                "Content-Type" : "application/json"
            }
        })
        console.log('Get ubidots response: ', res.data)
        return res.data.results
    }
    async GetUbidotsCoordinates() {
        const res = await ubidotsConn.get("api/v2.0/devices/", {
            headers : {
                "X-Auth-Token" : "BBFF-KUYJurI4HhBGeERrJX7d1wv8CrCdA7", 
                "Content-Type" : "application/json"
            }
        })
        return res.data.results
    }
}