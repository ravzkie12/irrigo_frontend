import { backendConn, ubidotsConn } from "./connection";

export default class DataRepository {
    // Accounts
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
    async LivelihoodSummary () {
        const res = await backendConn.get(`livelihoods_summary/`, {
            headers : { Authorization : `Bearer ${localStorage.getItem("jwt_token")}` }
        })
        return JSON.parse(res.data)
    }
    // Ubidots
    async GetUbidotsData() {
        const res = await ubidotsConn.get("api/v1.6/variables/6441f9c0d6005b000e2a8c4a/values", {
            headers : {
                "X-Auth-Token" : "BBFF-6LulPa1RhRrhpThpalh4noXxR3nEER", 
                "Content-Type" : "application/json"
            }
        })
        return res.data.results
    }
    async GetUbidotsCoordinates() {
        const res = await ubidotsConn.get("api/v2.0/devices/", {
            headers : {
                "X-Auth-Token" : "BBFF-snRFqRzDQ0V2PgLU2OrNfp28hK4ZBm", 
                "Content-Type" : "application/json"
            }
        })
        return res.data.results
    }
    async GetDataLogs() {
        const res = await ubidotsConn.get("api/v1.6/variables/6441f9c0d6005b000e2a8c4a/values", {
            headers : {
                "X-Auth-Token" : "BBFF-6LulPa1RhRrhpThpalh4noXxR3nEER", 
                "Content-Type" : "application/json"
            }
        })
        return res.data.results
    }
}