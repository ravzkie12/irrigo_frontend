import React, { useEffect } from 'react'
import { useAppDispatch, useAppSelector } from '../../redux/hooks'
import { getFarmers } from '../../redux/dataSlice'
import MoonLoader from "react-spinners/MoonLoader";
import FarmerListTable from './FarmerListTable';

const FarmerListView = () => {
    
    const dispatch = useAppDispatch()
    const { dataLoading, farmersList } = useAppSelector((state: any) => state.dataState)

    useEffect(() => {
        dispatch(getFarmers())
    }, [])
    
    return (
        <div className="w-full bg-white font-noto flex flex-col gap-y-5 text-gray-700 p-5 shadow border-b border-gray-200 rounded-lg">
            {/*  */}
            <div className="w-full flex justify-between">
                <h4 className="text-xl font-bold">Farmers List</h4>
                <button className="bg-transparent text-[#89644e]">
                    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 h-6">
                        <path strokeLinecap="round" strokeLinejoin="round" d="M3 16.5v2.25A2.25 2.25 0 005.25 21h13.5A2.25 2.25 0 0021 18.75V16.5M16.5 12L12 16.5m0 0L7.5 12m4.5 4.5V3" />
                    </svg>
                </button>
            </div>
            {/*  */}
            <div className="w-full border-b border-gray-200 -mt-3"></div>
            {/*  */}
            {
                dataLoading && 
                <div className="w-full flex justify-center items-center">
                    <MoonLoader 
                        loading={ dataLoading }
                        color="#89644e"
                        speedMultiplier={1}
                        size={70}
                    />
                </div>
            }
            { !dataLoading && <FarmerListTable farmersList={ farmersList } /> }
        </div>
    )
}

export default FarmerListView