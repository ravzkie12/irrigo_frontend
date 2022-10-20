import React from 'react'
import { useRouter } from 'next/router'

const FarmerSideNav = () => {

    const router = useRouter()
    const isItemClicked = (path: string) => {
        router.push(path)
    }

    return (
        <div className="w-full h-screen bg-white shadow flex flex-col items-center font-noto gap-y-5 px-5">
            {/*  */}
            <div className="w-full flex gap-x-1 pt-16 pb-5 px-5">
                <svg 
                    xmlns="http://www.w3.org/2000/svg"  
                    preserveAspectRatio="xMidYMid meet" 
                    viewBox="0 0 24 24"
                    className="w-5 h-5 text-[#89644e]"
                >
                    <path 
                        fill="currentColor" 
                        d="M12 2c-5.33 4.55-8 8.48-8 11.8c0 4.98 3.8 8.2 8 8.2s8-3.22 8-8.2c0-3.32-2.67-7.25-8-11.8zM7.83 14c.37 0 .67.26.74.62c.41 2.22 2.28 2.98 3.64 2.87c.43-.02.79.32.79.75c0 .4-.32.73-.72.75c-2.13.13-4.62-1.09-5.19-4.12a.75.75 0 0 1 .74-.87z"
                    />
                </svg>
                <h4 className="text-2xl text-[#89644e] font-black tracking-widest">Irrigo.</h4>
            </div>
            {/*  */}
            <div 
                className={`w-full flex items-center gap-x-5 px-5 py-3 ${ router.pathname === '/farmer' ? 'bg-[#EEEEEE]' : 'bg-transparent' } rounded-lg hover:cursor-pointer`}
                onClick={ () => isItemClicked('/farmer') }
            >
                <svg 
                    xmlns="http://www.w3.org/2000/svg" 
                    fill="none" 
                    viewBox="0 0 24 24" 
                    strokeWidth={1.5} 
                    stroke="currentColor" 
                    className={`w-6 h-6 ${ router.pathname === '/farmer' ? 'text-[#89644e]' : 'text-gray-700' }`}
                >
                    <path strokeLinecap="round" strokeLinejoin="round" d="M3.75 6A2.25 2.25 0 016 3.75h2.25A2.25 2.25 0 0110.5 6v2.25a2.25 2.25 0 01-2.25 2.25H6a2.25 2.25 0 01-2.25-2.25V6zM3.75 15.75A2.25 2.25 0 016 13.5h2.25a2.25 2.25 0 012.25 2.25V18a2.25 2.25 0 01-2.25 2.25H6A2.25 2.25 0 013.75 18v-2.25zM13.5 6a2.25 2.25 0 012.25-2.25H18A2.25 2.25 0 0120.25 6v2.25A2.25 2.25 0 0118 10.5h-2.25a2.25 2.25 0 01-2.25-2.25V6zM13.5 15.75a2.25 2.25 0 012.25-2.25H18a2.25 2.25 0 012.25 2.25V18A2.25 2.25 0 0118 20.25h-2.25A2.25 2.25 0 0113.5 18v-2.25z" />
                </svg>
                <p className={`font-medium ${ router.pathname === '/farmer' ? 'text-[#89644e]' : 'text-gray-700' }`}>Dashboard</p>
            </div>
            {/*  */}
            <div 
                className={`w-full flex items-center gap-x-5 px-5 py-3 ${ router.pathname === '/farmer/rsbsa' ? 'bg-[#EEEEEE]' : 'bg-transparent' } rounded-lg hover:cursor-pointer`}
                onClick={ () => isItemClicked('/farmer/rsbsa') }
            >
                <svg 
                    xmlns="http://www.w3.org/2000/svg" 
                    fill="none" 
                    viewBox="0 0 24 24" 
                    strokeWidth={1.5} 
                    stroke="currentColor" 
                    className={`w-6 h-6 ${ router.pathname === '/farmer/rsbsa' ? 'text-[#89644e]' : 'text-gray-700' }`}
                >
                    <path strokeLinecap="round" strokeLinejoin="round" d="M15.666 3.888A2.25 2.25 0 0013.5 2.25h-3c-1.03 0-1.9.693-2.166 1.638m7.332 0c.055.194.084.4.084.612v0a.75.75 0 01-.75.75H9a.75.75 0 01-.75-.75v0c0-.212.03-.418.084-.612m7.332 0c.646.049 1.288.11 1.927.184 1.1.128 1.907 1.077 1.907 2.185V19.5a2.25 2.25 0 01-2.25 2.25H6.75A2.25 2.25 0 014.5 19.5V6.257c0-1.108.806-2.057 1.907-2.185a48.208 48.208 0 011.927-.184" />
                </svg>
                <p className={`font-medium ${ router.pathname === '/farmer/rsbsa' ? 'text-[#89644e]' : 'text-gray-700' }`}>RSBSA Form</p>
            </div>
            {/*  */}
        </div>
    )
}

export default FarmerSideNav