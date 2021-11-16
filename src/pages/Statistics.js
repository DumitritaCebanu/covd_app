import React, {useState, useEffect} from 'react'
import {Line, Doughnut} from 'react-chartjs-2'
import axios from "axios";
import {Container, Row, Col} from "react-bootstrap";

function Statistics() {
    const [labels, setLabels] = useState([])
    const [dataCazuri, setDataCazuri] = useState([])
    const [dataDecese, setDataDecese] = useState([])
    const [dataRata, setDataRata] = useState([])

    const [daysNumber, setDaysNumber] = useState(20)

    useEffect(() => {
        axios.get('https://covid19.primariatm.ro/istoric-covid19-tm.json')
            .then(response => response.data)
            .then(data => data.slice(0, daysNumber).reverse())
            .then(data => {
                setLabels(data.map(item => (item.data)))
                setDataCazuri(data.map(item => (item.cazuri)))
                setDataDecese(data.map(item => (item.decese)))
                setDataRata(data.map(item => (item.rata)))
            })
            .catch(err => console.warn(err))
    }, [])

    return <Container>
        <Row>
            <Col>
                <Line
                    data={{
                        labels: labels,
                        datasets: [
                            {
                                label: 'Cazuri',
                                data: dataCazuri,
                                backgroundColor: //pune doar pentru prima coloana ['red'],prosta 'red' pune culoarea pentru toate
                                    'rgba(54,162,235,0.5)',
                                borderColor: 'rgba(54,162,235,1)',
                                borderWidth: 1,
                            },
                            {
                                label: 'Decse',
                                data: dataDecese,
                                backgroundColor: 'orange',
                                borderColor: 'red',
                            },
                            {
                                label: 'Rata',
                                data: dataRata
                            }
                        ],
                    }}
                    height={400}
                    width={600}
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

export default Statistics;