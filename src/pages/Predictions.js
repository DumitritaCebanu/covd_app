import React, {useState, useEffect} from 'react';
import axios from "axios";
import functionPlot from "function-plot";
import {Container, Row, Col} from "react-bootstrap";
import {Line, Bar} from 'react-chartjs-2'
import '../styles/Predictions.css';

const plotFunc = (func) => {
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
            {
                fn: func
            }
        ],
        disableZoom: true,
        grid: true
    })
}

/*
{fn: '10.41213868872623 + 2.018962201780475 * log(x)'}, //logaritmic  a +b * log(x)
            //{fn: '35.3325 * 1.0083^x'} //exponential, nu merge pentru ca nu pot face
 */

function Predictions() {
    const [data, setData] = useState([])
    //pentru chart nr de cazuri
    const [dataCazuri, setDataCazuri] = useState([])
    //data
    const [labels, setLabels] = useState([])

    const makeReq = (typeReq) => {
        /*
                axios({
                    method: 'get',
                    url: `http://localhost:5000/predictions/${typeReq}`,
                    withCredentials: false
                })
                    .then(res => {
                        setData(res.data)
                        if(typeReq === "linear"){
                            // plotFunc(`${res.data.aValue} + ${res.data.bValue} * x`)
                            plotFunc(`121 + 22 * x`)
                        } else if(typeReq === "log"){
                            //plotFunc(`${res.data.aValue} + ${res.data.bValue} * log(x)`)
                            plotFunc(`33 + 2 * log(x)`)
                        } else if(typeReq === "expo"){
                            plotFunc(`${res.data.aValue} * ${res.data.bValue} * exp(x)`)
                        }
                    })
                    .catch(err => {
                        console.warn(err)
                    })
        */
        /*
        if (typeReq === "linear") {
            // plotFunc(`${res.data.aValue} + ${res.data.bValue} * x`)
            plotFunc(`121 + 22 * x`)
        } else if (typeReq === "log") {
            //plotFunc(`${res.data.aValue} + ${res.data.bValue} * log(x)`)
            plotFunc(`33 + 2 * log(x)`)
        }
    }*/

    useEffect(() => {
        makeReq("linear")
        axios.get('https://covid19.primariatm.ro/istoric-covid19-tm.json')
            .then(response => response.data)
            .then(data => data.reverse())
            .then(data => {
                setLabels(data.map(item => (item.data)))
                setDataCazuri(data.map(item => (item.cazuri)))
            })
            .catch(err => console.warn(err))
    }, [])

    return (
        <div className="backgr">
            <Container fluid style={{
                backgroundColor: "#023047",
                backgroundSize: "cover",
                height: "10vh",
                color: "#f5f5f5"
            }}>
            </Container>
            <Container fluid style={{
                backgroundColor: "#ffb703",
                backgroundSize: "cover",
                height: "2vh",
                color: "#f5f5f5"
            }}>
            </Container>
            <Container style={{
                backgroundColor: "#f5f5f5",
                backgroundSize: "cover",
                borderRadius: "15px"
            }}>
                <Row>
                    <h3 className="text-cazuri">
                        Nr. de cazuri
                    </h3>
                    <Col>
                        <Line
                            data={{
                                labels: labels,
                                datasets: [
                                    {
                                        label: '',
                                        data: dataCazuri,
                                        backgroundColor: //pune doar pentru prima coloana ['red'],prosta 'red' pune culoarea pentru toate
                                            'rgba(54,162,235,1)',
                                        borderColor: 'rgba(54,162,235,0.5)'
                                    },
                                ],
                            }}
                            height={400}
                            width={200}
                            options={{
                                maintainAspectRatio: false,
                                legend: {
                                    labels: {
                                        fontSize: 2
                                    }
                                }
                            }}
                        />
                    </Col>
                </Row>
            </Container>
            <Container>
                <Row style={{
                    backgroundColor: "#023047",
                    borderRadius: "15px",
                    padding: "0px 20px"
                }}>
                    <Row style={{
                        backgroundColor: "#f5f5f5",
                        borderColor: "black",
                        marginTop: "20px",
                        marginLeft: "5px",
                        marginRight: "7px",
                        padding: "0px 20px"

                    }}>
                        <h2 className="text-pred">
                            Urmareste evolutia covid in baza algoritmilor de regresie liniara
                        </h2>
                    </Row>
                    <Col lg={8} style={{
                        marginBottom: "50px",
                        backgroundColor: "#f5f5f5",
                        borderRadius: "15px",
                        marginTop: "50px",
                        padding: "0px 30px"
                    }}>
                        <div id="test"></div>
                    </Col>
                    <Col lg={4} style={{
                        backgroundColor: "#023047",
                        borderRadius: "15px",
                        padding: "100px 0px",
                        color: "#f5f5f5"
                    }}>
                        <div className="space-button">
                            <button className="button-pd"
                                    onClick={() => makeReq("linear")}>Linear
                            </button>
                        </div>
                        <div className="space-button">
                            <button className="button-pd"
                                    onClick={() => makeReq("log")}>Logarithmic
                            </button>
                        </div>
                        <div className="space-button">
                            <button className="button-pd"
                                    onClick={() => makeReq("expo")}>Exponential
                            </button>
                        </div>
                    </Col>
                </Row>
            </Container>
        </div>
    );
}

export default Predictions;