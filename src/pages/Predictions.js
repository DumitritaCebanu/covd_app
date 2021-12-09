import React, {useState, useEffect} from 'react';
import axios from "axios";
import functionPlot from "function-plot";

const plot = () => {
    functionPlot({
        target: '#test',
        width: 800,
        height: 400,
        yAxis: {
            label: 'y axis',
            domain: [-20, 400]
        },
        xAxis: {
            label: 'x axis',
            domain: [-20, 200]
        },
        data: [
            {fn: '103.13743010975357 + ( -0.019994922230700932 * x )'}, //linear regression
            {fn: '10.41213868872623 + 2.018962201780475 * log(x)'}, //logaritmic
            {fn: '35.3325 * 1.0083^x'} //exponential, nu merge pentru ca nu pot face
        ],
        disableZoom: true,
        grid: true
    })
}



function Predictions() {
    const [data, setData] = useState([])

    useEffect(() => {
        /*
        axios({
            method: 'get',
            url: 'http://localhost:5000/predictions',
            withCredentials: false
        })
            .then(res => {
                setData(res.data)
            })
            .catch(err => {
                console.warn(err)
            })
         */
        plot()
    }, [])

    return (
        //<>
        <div id="test"></div>

        //<pre>{JSON.stringify(data, null, 2)}</pre>
        //<p>{data.aValue}</p>

        //</>
    );
}

export default Predictions;