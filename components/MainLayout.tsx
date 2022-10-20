import React from 'react'
import { useRouter } from 'next/router'
import AdminSideNav from './admin/AdminSideNav'
import AdminTopNav from './admin/AdminTopNav'
import FarmerSideNav from './farmer/FarmerSideNav'
import FarmerTopNav from './farmer/FarmerTopNav'

const MainLayout = ({ children }: any) => {
    
    const { pathname } = useRouter()
    const paths = pathname.split('/')
    
    const Layout = () => {
        if (paths[1] === 'admin') {
            return (
                <div className="grid grid-cols-layout">
                    {/* SIDENAV */}
                    <AdminSideNav />
                    {/*  */}
                    <div className="w-full h-screen grid grid-rows-layout">
                        {/* TOPNAV */}
                        <AdminTopNav />
                        {/*  */}
                        <div className="w-full bg-gray-100 overflow-y-auto overflow-x-hidden p-8">
                            { children }
                        </div>
                        {/*  */}
                    </div>
                    {/*  */}
                </div>
            )
        } 
        else if (paths[1] === 'farmer') {
            return (
                <div className="grid grid-cols-layout">
                    {/* SIDENAV */}
                    <FarmerSideNav />
                    {/*  */}
                    <div className="w-full h-screen grid grid-rows-layout">
                        {/* TOPNAV */}
                        <FarmerTopNav />
                        {/*  */}
                        <div className="w-full bg-gray-100 overflow-y-auto overflow-x-hidden p-8">
                            { children }
                        </div>
                        {/*  */}
                    </div>
                    {/*  */}
                </div>
            )
        }
        return <div>{ children }</div>
    }

    return (
        <div>
            <Layout />
        </div>
    )

}

export default MainLayout