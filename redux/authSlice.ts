import { createSlice, createAsyncThunk, PayloadAction, nanoid } from '@reduxjs/toolkit'
import AuthRepo from '../repositories/AuthRepository'

interface AuthShape {
    authLoading: boolean;
    loginEmail: string;
    loginPassword: string;
    registerFirstName: string;
    registerLastName: string;
    registerMobile: string;
    registerEmail: string;
    userCredentials: any;
    userProfile: any;
    requestStatus: number;
    currentStep: number;
}

const initialState: AuthShape = {
    authLoading : false,
    loginEmail : '',
    loginPassword : '',
    registerFirstName: '',
    registerLastName: '',
    registerMobile: '',
    registerEmail: '',
    userCredentials : {},
    userProfile : {},
    requestStatus : 0,
    currentStep : 0
}

export const loginUser = createAsyncThunk(
    'auth/loginUser',
    async (arg: { loginEmail: string, loginPassword: string }) => {
        const authRepo = new AuthRepo()
        const formData = new FormData()
        formData.append("email", arg.loginEmail)
        formData.append("password", arg.loginPassword)
        return await authRepo.LoginUser(formData)
    }
)

export const registerUser = createAsyncThunk(
    'auth/registerUser',
    async (password: string, { getState }) => {
        const authRepo = new AuthRepo()
        const state: any = getState()
        const splittedEmail = state.authState.registerEmail.split('@')
        return await authRepo.RegisterUser({ 
            first_name : state.authState.registerFirstName,
            last_name : state.authState.registerLastName,
            mobile : state.authState.registerMobile,
            email : state.authState.registerEmail,
            username : `${splittedEmail[0]}${nanoid()}`,
            password : password,
            role : "farmer"
        })
    }
)

export const retrieveAccount = createAsyncThunk(
    'auth/retrieveAccount',
    async (user_id: number, { getState }) => {
        const authRepo = new AuthRepo()
        const state: any = getState()
        return await authRepo.RetrieveAccount(user_id)
    }
)

const authSlice = createSlice({
    name : 'auth',
    initialState,
    reducers : {
        onPrevStep : (state) => {
            const step = state.currentStep
            return {
                ...state,
                currentStep : step - 1
            }
        },
        onSubmitRegisterStep1 : (state, action: PayloadAction<any>) => {
            const { payload } = action
            // const step = state.currentStep
            return {
                ...state,
                registerFirstName : payload.registerFirstName,
                registerLastName : payload.registerLastName,
                currentStep : 1
            }
        },
        onSubmitRegisterStep2 : (state, action: PayloadAction<any>) => {
            const { payload } = action
            // const step = state.currentStep
            return {
                ...state,
                registerMobile : payload.registerMobile,
                registerEmail : payload.registerEmail,
                currentStep : 2
            }
        },
        onSuccessfulAuth : (state, action) => {
            return { ...state, requestStatus : action.payload }
        }
    },
    extraReducers : builder => {
        // LOGIN
        builder.addCase(loginUser.pending, (state) => {
            return { ...state, authLoading : true }
        })
        builder.addCase(loginUser.fulfilled, (state, action) => {
            return { ...state, authLoading : false, userCredentials : action.payload }
        })
        builder.addCase(loginUser.rejected, (state) => {
            return { ...state, authLoading : false }
        })
        // REGISTER
        builder.addCase(registerUser.pending, (state) => {
            return { ...state, authLoading : true }
        })
        builder.addCase(registerUser.fulfilled, (state) => {
            return { 
                ...state, 
                authLoading : false,
                registerFirstName : '',
                registerLastName : '',
                registerEmail : '',
                registerMobile : '',
                currentStep : 0
            }
        })
        builder.addCase(retrieveAccount.rejected, (state) => {
            return { ...state, authLoading : false }
        })
        // RETRIEVE ACCOUNT
        builder.addCase(retrieveAccount.pending, (state) => {
            return { ...state, authLoading : true }
        })
        builder.addCase(retrieveAccount.fulfilled, (state, action) => {
            return { ...state, authLoading : false, userProfile : action.payload }
        })
        builder.addCase(registerUser.rejected, (state) => {
            return { ...state, authLoading : false }
        })
    }
})

export const {
    onPrevStep,
    onSubmitRegisterStep1,
    onSubmitRegisterStep2,
    onSuccessfulAuth
} = authSlice.actions

export default authSlice.reducer