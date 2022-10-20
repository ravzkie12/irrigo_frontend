import React from 'react'
import dynamic from 'next/dynamic'

const NoSSRMoisture = dynamic(() => import('../../views/admin/MoistureView'), {
    ssr: false
})

export default function moisture() {
    return <NoSSRMoisture />
}
