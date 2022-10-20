import React from 'react'
import { useAppSelector } from '../../redux/hooks'

const DasboardView = () => {

    const { userProfile } = useAppSelector((state: any) => state.authState)

    return (
        <div className="w-full font-noto flex flex-col gap-y-5 text-gray-700">
            <h4 className="text-xl font-bold">Hello there, { userProfile.first_name }</h4>
        </div>
    )
}

export default DasboardView