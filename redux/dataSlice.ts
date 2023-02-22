import { createSlice, createAsyncThunk, PayloadAction } from "@reduxjs/toolkit";
import DataRepository from '../repositories/DataRepository'
import moment from "moment";

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
    ubidotsData: any;
    moistureOptions: any;
    moistureSeries: any;
    heatOptions: any;
    heatSeries: any;
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
    ubidotsData : [],
    moistureOptions : {},
    moistureSeries : [],
    heatOptions : {},
    heatSeries : []
}


// ACCOUNT THUNKS
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
    async (args, { getState }) => {
        const state: any = getState()
        let today = new Date();
        let dd = String(today.getDate()).padStart(2, '0');
        let mm = String(today.getMonth() + 1).padStart(2, '0'); 
        let yyyy = today.getFullYear();
        const formData = {
            first_name : state.dataState.step1Data.rsbsaFirstName,
            last_name : state.dataState.step1Data.rsbsaLastName,
            enrollment_type : "",
            date_administered : `${yyyy}-${mm}-${dd}`,
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
            laborer_activity : state.dataState.workerActivity,
            fishing_activity : state.dataState.fishingActivity,
            involvement_type : state.dataState.involvementType,
            livelihood_product : state.dataState.livelihoodProduct,
            ownership_document_name : state.dataState.ownershipDocumentName,
            ownership_document : state.dataState.ownershipDocument,
            signature_name : state.dataState.signatureName,
            signature : state.dataState.signature
        }
        const dataRepo = new DataRepository()
        await dataRepo.UpdateAccount(formData)
    }
)

export const deleteAccount = createAsyncThunk(
    'data/deleteAccount',
    async (account_id: number) => {
        const dataRepo = new DataRepository()
        await dataRepo.DeleteAccount(account_id)
    }
)

export const getUbidotsData = createAsyncThunk(
    'data/getUbidotsData',
    async () => {
        const dataRepo = new DataRepository()
        const ubidotsData =  await dataRepo.GetUbidotsData()
        const optionCategories = ubidotsData.map((data: any) => {
            const data_date = new Date(data.created_at)
            return `${data_date.getMonth()+1}-${data_date.getDay()}-${data_date.getFullYear()}`;
        })
        const formattedSeries: any = {
            ripening : [],
            reproductive : [],
            vegetative : []
        }
        ubidotsData.map((data: any) => {
            if (data.value <= 55) {
                formattedSeries.ripening.push(data.value)
            }
            else if (data.value <= 75) {
                formattedSeries.reproductive.push(data.value)
            }
            else if (data.value <= 100) {
                formattedSeries.vegetative.push(data.value)
            }
        }) 
        const dataSeries = ubidotsData.map((data: any) => {
            return data.value
        })
        const dateTimeSeries = ubidotsData.map((data: any) => {
            return data.created_at
        })
        return { optionCategories, formattedSeries, dataSeries, dateTimeSeries }
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
            const { payload } = action
            const prevState: any = { ...state.step1Data }
            
            for (let obj in payload) {
                prevState[obj] = payload[obj]
            }

            console.log('Fvcking previous state: ', prevState)

            return {
                ...state, 
                step1Data : prevState,
                rsbsaStep : 1,
            }
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
        builder.addCase(updateAccount.pending, (state) => {
            return { ...state, dataLoading : true }
        })
        builder.addCase(updateAccount.fulfilled, () => {
            return initialState
        })
        builder.addCase(updateAccount.rejected, (state) => {
            return { ...state, dataLoading : false }
        })
        // DELETE FARMER ACCOUNT
        builder.addCase(deleteAccount.pending, (state) => {
            return { ...state, dataLoading : true  }
        })
        builder.addCase(deleteAccount.fulfilled, (state) => {
            return { ...state, dataLoading : false  }
        })
        builder.addCase(deleteAccount.rejected, (state) => {
            return { ...state, dataLoading : false  }
        })
        // GET UBIDOTS DATA
        builder.addCase(getUbidotsData.pending, (state) => {
            return { ...state, dataLoading : true  }
        })
        builder.addCase(getUbidotsData.fulfilled, (state, action) => {
            const { payload }: any = action
            
            return { 
                ...state, 
                dataLoading : false, 
                ubidotsData : payload,
                moistureOptions : {
                    plotOptions: {
                        bar: {
                            horizontal: true,
                        },
                    },
                    chart: {
                        id: "customBarChart",
                        stacked: true,
                    },
                    xaxis: {
                        categories: payload.dataSeries.slice(0, 30)
                    },
                    yaxis: {
                        show: false,
                        labels: {
                            show: false
                        },
                        axisBorder: {
                            show: false
                        },
                        axisTicks: {
                            show: false
                        }
                    },
                    tooltip: {
                        custom: ({ series, seriesIndex, dataPointIndex }: any) => {
                            return (
                                `
                                <div style={{
                                    padding: '5px',
                                }}>
                                <div>Value: ${series[seriesIndex][dataPointIndex]}</div>
                                <div>Date: ${moment(payload.dateTimeSeries[dataPointIndex]).format("MMMM DD YYYY")}</div>
                                <div>Time: ${moment(payload.dateTimeSeries[dataPointIndex]).format("h:mm a")}</div>
                                </div>
                                `
                            )
                        },
                    },
                    stroke: {
                        show: true,
                        width: 5,
                    },
                    fill: {
                        opacity: 0.5,
                    },
                },
                moistureSeries : [
                    {
                        name : 'Ripening',
                        data : payload.formattedSeries.ripening.slice(0, 10)
                    },
                    {
                        name : 'Reproductive',
                        data : payload.formattedSeries.reproductive.slice(10, 20)
                    },
                    {
                        name : 'Vegetative',
                        data : payload.formattedSeries.vegetative.slice(20, 30)
                    },
                ],
                heatOptions : {
                    dataLabels: {
                        enabled: false
                    },
                    chart: {
                        id: "customAreaChart"
                    },
                    xaxis: {
                        show : false,
                        labels: {
                            show: false
                        },
                        axisBorder: {
                            show: false
                        },
                        axisTicks: {
                            show: false
                        }
                    },
                    tooltip: {
                        custom: ({ series, seriesIndex, dataPointIndex }: any) => {
                            return (
                                `
                                <div style={{
                                    padding: '5px',
                                }}>
                                <div>Value: ${series[seriesIndex][dataPointIndex]}</div>
                                <div>Date: ${moment(payload.dateTimeSeries[dataPointIndex]).format("MMMM DD YYYY")}</div>
                                <div>Time: ${moment(payload.dateTimeSeries[dataPointIndex]).format("h:mm a")}</div>
                                </div>
                                `
                            )
                        },
                    },
                    stroke: {
                        show: true,
                        width: 5,
                    },
                    fill: {
                        opacity: 0.5,
                    },
                },
                heatSeries : [
                    {
                        name : 'Ripening',
                        data : payload.formattedSeries.ripening.slice(0, 10)
                    },
                    {
                        name : 'Reproductive',
                        data : payload.formattedSeries.reproductive.slice(10, 20)
                    },
                    {
                        name : 'Vegetative',
                        data : payload.formattedSeries.vegetative.slice(20, 30)
                    },
                ]
            }
        })
        builder.addCase(getUbidotsData.rejected, (state) => {
            return { ...state, dataLoading : false  }
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