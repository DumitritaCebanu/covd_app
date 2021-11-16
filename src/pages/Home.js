import React, {useState, useEffect} from 'react'
import {Bar, Doughnut} from 'react-chartjs-2'
import axios from "axios";
import {Container, Row, Col} from "react-bootstrap";

function Home() {
    const [labels, setLabels] = useState([])
    const [dataRata, setDataRata] = useState([])
    const [dataCazuri, setDataCazuri] = useState([])

    useEffect(() => {
        axios.get('https://covid19.primariatm.ro/istoric-covid19-tm.json')
            .then(response => response.data.slice(0, 1))
            .then(data =>  {
                setLabels(data.map(item => (item.data)))
                setDataRata(data.map(item => (item.rata)))
                setDataCazuri(data.map(item => (item.cazuri)))
            })
            .catch(err => console.warn(err))
    }, [])

    return <Container>
        <Row className="align-items-center">
            <h1>Ceva de scris aici sau de pus</h1>
        </Row>
        <br/><br/>
        <Row className="align-items-center">
            <Col xs={2}>
            </Col>
            <Col className='col-3'>
                <Bar
                    data={{
                        labels: dataCazuri,
                        datasets: [
                            {
                                label: 'Cazuri in ultimele 24h',
                                data: dataCazuri,
                                backgroundColor: 'rgba(214,40,40,1)'
                            }
                        ],
                    }}
                    height={400}
                    width={50}
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
            <Col>
                <Doughnut
                    data={{
                        labels: dataRata,
                        datasets: [
                            {
                                label: 'Rata de incidenta la 14 zile',
                                data: [
                                    dataRata,
                                    25 - dataRata
                                ],
                                backgroundColor: [
                                    'rgba(252, 191, 73, 1)',
                                    'rgba(167, 164, 158, 1)'
                                    ],
                            }
                        ],
                    }}
                    height={400}
                    width={400}
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
}

export default Home;