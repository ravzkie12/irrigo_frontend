import { backendConn } from "./connection";
import jwt_decode from 'jwt-decode'

export default class AuthRepository {
    // LOGIN
    async LoginUser(formData: any): Promise<any> {
        const loginRes = await backendConn.post('api/token/', formData, {
            headers : { 'Content-Type' : 'application/x-www-form-urlencoded' }
        })
        localStorage.setItem("jwt_token", loginRes.data.access)
        return loginRes.data
    }
    // REGISTER
    async RegisterUser(formData: any): Promise<any> {
        const registerRes = await backendConn.post('register/', formData, {
            headers : { 'Content-Type' : 'application/json' }
        })
        return registerRes
    }
    // RETRIEVE ACCOUNT INFO
    async RetrieveAccount(user_id: number): Promise<any> {
        const retrievalRes = await backendConn.get(`account/${user_id}`, {
            headers : {
                Authorization : `Bearer ${localStorage.getItem("jwt_token")}`
            }
        })
        return retrievalRes.data
    }
}