import React from 'react'
import dynamic from 'next/dynamic'

const NoSSRHeatMap = dynamic(() => import('../../views/admin/HeatMapView'), {
    ssr: false
})

export default function heat_map() {
    return <NoSSRHeatMap />
}
