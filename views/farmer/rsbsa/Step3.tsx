import React from 'react'
import { useAppSelector } from '../../../redux/hooks'
import ForFarmer from './ForFarmer'
import ForWorker from './ForWorker'
import ForFisher from './ForFisher'
import ForAgri from './ForAgri'

const Step3 = () => {

    const { selectedLivelihood } = useAppSelector((state: any) => state.dataState)

    const livelihoodComponents = (selected: string) => {
        switch (selected) {
            case 'Farmer':
                return <ForFarmer />
            case 'Farmworker/Laborer':
                return <ForWorker />
            case 'Fisherfolk':
                return <ForFisher />
            case 'Agri Youth':
                return <ForAgri />
            default:
                'Unknown Livelihood';
        }
    }

    return (
        <div className="w-[850px]">
            { livelihoodComponents(selectedLivelihood) }
        </div>
    )
}

export default Step3