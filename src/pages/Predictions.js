import React, {useState, useEffect} from 'react';
import axios from "axios";
import functionPlot from "function-plot";
import {Container, Row, Col} from "react-bootstrap";
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

    const makeReq = (typeReq) => {
        /*
        axios({
            method: 'get',
            url: `http://localhost:5000/predictions/${typeReq}`,
            withCredentials: false
        })
            .then(res => {
                setData(res.data)
            })
            .catch(err => {
                console.warn(err)
            })
         */
        if(typeReq === "linear"){
            plotFunc(`${103.13743010975357} + ${-0.019994922230700932} * x`)
        } else if(typeReq === "log"){
            plotFunc('10.41213868872623 + 2.018962201780475 * log(x)')
        }
    }

    useEffect(() => {
        makeReq("linear")
    }, [])

    return (
        <div className="back">
            <Container>
                <Row>
                    <Col lg={8} style={{
                        marginBottom: "50px",
                        backgroundColor: "#f5f5f5",
                        backgroundSize: "cover",
                        borderRadius: "15px",
                        marginTop: "50px",
                    }}>
                        <div id="test"></div>
                    </Col>
                    <Col lg={4} style={{
                        marginTop: "80px",
                        padding: "0px, 50px"
                    }}>
                        <div className="space-button">
                            <button className="button-pd"
                                    onClick={() => makeReq("linear")}>Linear
                            </button>
                        </div>
                        <div className="space-button">
                            <button className="button-pd"
                                    onClick={() => makeReq("log")}>Logarithmic</button>
                        </div>
                        <div className="space-button">
                            <button className="button-pd">Exponential</button>
                        </div>
                    </Col>
                </Row>
            </Container>
        </div>
    );
}

export default Predictions;