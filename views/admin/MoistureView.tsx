import React from 'react'
import Chart from 'react-apexcharts'
// import MapBoxGL from 'react-map-gl'


const chartOptions = {
    chart: {
        id: "customBarChart"
    },
    xaxis: {
        categories: ["October 10, 2022", "October 11, 2022", "October 12, 2022", "October 13, 2022"]
    },
    stroke: {
        show: true,
        width: 5,
    },
    fill: {
        opacity: 0.5
    }
}

const chartSeries = [
    {
        name: 'Vegetative Stage',
        data: [44, 55, 57, 56]
    }, 
    {
        name: 'Reproductive Stage',
        data: [76, 85, 101, 98]
    }, 
    {
        name: 'Ripening Stage',
        data: [35, 41, 36, 26]
    }
]

const MoistureView = () => {

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
            <h4 className="text-xl font-bold">Soil Moisture</h4>
            {/*  */}
            <div className="w-full border-b border-gray-200 -mt-3"></div>
            {/*  */}
            <div className="w-full h-96">
                <Chart 
                    options={chartOptions}
                    series={ chartSeries }
                    width="100%"
                    height="100%"
                    type="bar"
                    stacked={ true }
                />
            </div>
        </div>
    )
}

export default MoistureView