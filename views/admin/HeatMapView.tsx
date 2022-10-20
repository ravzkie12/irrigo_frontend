import React from 'react'
import Chart from 'react-apexcharts'
// import MapBoxGL from 'react-map-gl'

const chartOptions = {
    chart: {
        id: "customAreaChart"
    },
    xaxis: {
        categories: ["Week 1", "Week 2", "Week 3", "Week 4"]
    }
}

const chartSeries = [
    { name: "Vegetative Stage", data: [30, 40, 45, 50] },
    { name: "Reproductive Stage", data: [35, 25, 30, 55] },
    { name: "Ripening Stage", data: [40, 45, 20, 60] },
] 

const HeatMapView = () => {

    // const [viewPort, setViewPort] = useState({
    //     latitude : 7.3093,
    //     longitude : 125.6615,
    //     width : "100%",
    //     height : "100vh",
    //     zoom : 5
    // })


    return (
        <div className="w-full bg-white font-noto flex flex-col gap-y-5 text-gray-700 p-5 shadow border-b border-gray-200 rounded-lg">
            {/*  */}
            <h4 className="text-xl font-bold">GIS Heat Map</h4>
            {/*  */}
            <div className="w-full border-b border-gray-200 -mt-3"></div>
            {/*  */}
            <div className="w-full h-96">
                <Chart 
                    options={chartOptions}
                    series={ chartSeries }
                    width="100%"
                    height="100%"
                    type="area"
                    stacked={ true }
                />
            </div>
        </div>
    )
}

export default HeatMapView