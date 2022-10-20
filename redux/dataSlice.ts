import { createSlice, createAsyncThunk, PayloadAction } from "@reduxjs/toolkit";
import DataRepository from '../repositories/DataRepository'

interface Step1DataShape {
    rsbsaFirstName: string;
    rsbsaLastName: string;
    rsbsaExtension: string;
    rsbsaSex: number;
    rsbsaMobile: string;
    rsbsaDateOfBirth: string;
    rsbsaPlaceOfBirth: string;
    rsbsaCivilStatus: string;
    rsbsaEducation: string;
    rsbsaIsPWD: number;
    rsbsaIs4ps: number;
    rsbsaIsIP: number;
}

interface DataShape {
    dataLoading: boolean;
    farmersList: any;
    rsbsaStep: number;
    step1Data : Step1DataShape;
    selectedLivelihood: string;
    livelihoodProduct: string;
    workerActivity: string;
    fishingActivity: string;
    involvementType: string;
    ownershipDocumentName: string;
    signatureName: string;
    ownershipDocument: string;
    signature: string;
}

interface OptionShape {
    name: string;
    value: string;
}

const initialState: DataShape = {
    dataLoading : false,
    farmersList : [],
    rsbsaStep : 0,
    step1Data : {
        rsbsaFirstName: '',
        rsbsaLastName : '',
        rsbsaExtension : '',
        rsbsaSex : 0,
        rsbsaMobile : '',
        rsbsaDateOfBirth : '',
        rsbsaPlaceOfBirth: '',
        rsbsaCivilStatus: '',
        rsbsaEducation: '',
        rsbsaIsPWD: 0,
        rsbsaIs4ps: 0,
        rsbsaIsIP: 0
    },
    selectedLivelihood : "Farmer",
    livelihoodProduct : "",
    workerActivity : "",
    fishingActivity : "",
    involvementType : "",
    ownershipDocumentName : "",
    signatureName : "",
    ownershipDocument : "",
    signature : "",
}

export const getFarmers = createAsyncThunk(
    'data/getFarmers',
    async () => {
        const dataRepo = new DataRepository()
        const farmersList = await dataRepo.GetFarmersList()
        const formattedFarmersList = farmersList.filter((farmer: any) => farmer.id !== 1)
        return formattedFarmersList
    }
)

export const updateAccount = createAsyncThunk(
    'data/updateAccount',
    async (arg, { getState }) => {
        const state: any = getState()
        let today = new Date();
        let dd = String(today.getDate()).padStart(2, '0');
        let mm = String(today.getMonth() + 1).padStart(2, '0'); 
        let yyyy = today.getFullYear();
        const formData = {
            first_name : state.dataState.step1Data.rsbsaFirstName,
            last_name : state.dataState.step1Data.rsbsaLastName,
            enrollment_type : "",
            date_administered : `${mm}/${dd}/${yyyy}`,
            extension : state.dataState.step1Data.rsbsaExtension,
            sex : state.dataState.step1Data.rsbsaSex,
            date_of_birth : state.dataState.step1Data.rsbsaDateOfBirth,
            place_of_birth : state.dataState.step1Data.rsbsaPlaceOfBirth,
            civil_status : state.dataState.step1Data.rsbsaCivilStatus,
            educational_attainment : state.dataState.step1Data.rsbsaEducation,
            is_pwd : state.dataState.step1Data.rsbsaIsPWD,
            is_4ps_beneficiary : state.dataState.step1Data.rsbsaIs4ps,
            is_ip : state.dataState.step1Data.rsbsaIsIP,
            main_livelihood : state.dataState.selectedLivelihood,
            livelihood_product : state.dataState.livelihoodProduct,
            laborer_activity : state.dataState.workerActivity,
            fishing_activity : state.dataState.fishingActivity,
            involvement_type : state.dataState.involvementType,
            ownership_document : state.dataState.ownershipDocument,
            signature : state.dataState.signature
        }
        const dataRepo = new DataRepository()
        await dataRepo.UpdateAccount(formData)
    }
)

const dataSlice = createSlice({
    name : 'data',
    initialState,
    reducers : {
        onNextStep : (state) => {
            const step = state.rsbsaStep
            return { ...state, rsbsaStep : step + 1 }
        },
        onPrevStep : (state) => {
            const step = state.rsbsaStep
            return { ...state, rsbsaStep : step - 1 }
        },
        onSubmitRSBSAStep1 : (state, action) => {
            return
        },
        onSelectLivelihood : (state, action) => {
            return { ...state, selectedLivelihood : action.payload }
        },
        onSelectOption : (state, action: PayloadAction<OptionShape>) => {
            const { payload } = action
            return { ...state, [payload.name] : payload.value }
        },
        onUploadFile : (state, action) => {
            const { payload } = action
            return { ...state, [payload.name] : payload.value }
        },
        onRemoveFile : (state, action) => {
            return { ...state, [action.payload] : '' }
        }
    },
    extraReducers : builder => {
        // FETCH ALL FARMERS
        builder.addCase(getFarmers.pending, (state) => {
            return { ...state, dataLoading : true }
        })
        builder.addCase(getFarmers.fulfilled, (state, action) => {
            return { ...state, dataLoading : false, farmersList : action.payload }
        })
        builder.addCase(getFarmers.rejected, (state) => {
            return { ...state, dataLoading : false }
        })
        // UPDATE FARMER ACCOUNT
        // FETCH ALL FARMERS
        builder.addCase(updateAccount.pending, (state) => {
            return { ...state, dataLoading : true }
        })
        builder.addCase(updateAccount.fulfilled, (state) => {
            return { ...state, dataLoading : false }
        })
        builder.addCase(updateAccount.rejected, (state) => {
            return { ...state, dataLoading : false }
        })
    }
})

export const {
    onNextStep,
    onPrevStep,
    onSubmitRSBSAStep1,
    onSelectLivelihood,
    onSelectOption,
    onUploadFile,
    onRemoveFile
} = dataSlice.actions

export default dataSlice.reducer