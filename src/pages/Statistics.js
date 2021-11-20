import React, {useState, useEffect} from 'react'
import {Line, Bar} from 'react-chartjs-2'
import axios from "axios";
import {Container, Row, Col, AccordionContext} from "react-bootstrap";
import '../styles/Statistics.css';


function Statistics() {
    //data
    const [labels, setLabels] = useState([])
    //pentru chart nr de cazuri, decese pe o perioada mai lunga, de facut pe mai multe chart-uri
    const [dataCazuri, setDataCazuri] = useState([])
    const [dataDecese, setDataDecese] = useState([])
    //char cu rata
    const [dataRata, setDataRata] = useState([])
    //pentru chart cu pacientii
    const [dataPacienti, setDataPacienti] = useState([])
    const [dataPacientiCopii, setDataPacientiCopii] = useState([])
    const [dataPacientiAti, setDataPacientiAti] = useState([])
    //pentru chart cu  paturi libere
    const [dataPaturiOxigenLibere, setDataPaturiOxigenLibere] = useState([])
    const [dataPaturiOxigen, setDataPaturiOxigen] = useState([])


    const [daysNumber, setDaysNumber] = useState(30)

    useEffect(() => {
        axios.get('https://covid19.primariatm.ro/istoric-covid19-tm.json')
            .then(response => response.data)
            .then(data => data.slice(0, daysNumber).reverse())
            .then(data => {
                setLabels(data.map(item => (item.data)))
                setDataCazuri(data.map(item => (item.cazuri)))
                setDataDecese(data.map(item => (item.decese)))
                setDataRata(data.map(item => (item.rata)))
                setDataPacienti(data.map(item => (item.pacienti)))
                setDataPacientiCopii(data.map(item => (item.pacientiCopii)))
                setDataPacientiAti(data.map(item => (item.pacientiAti)))
                setDataPaturiOxigenLibere(data.map(item => (item.paturiOxigenLibere)))
                setDataPaturiOxigen(data.map(item => (item.paturiOxigen)))
            })
            .catch(err => console.warn(err))
    }, [])

    return <div className="back">
        <Container fluid style={{
            backgroundColor: "#fcbf45",
            backgroundSize: "cover",
            height: "30vh",
            color: "#f5f5f5"
        }}>
            <h1 className="text-top">
                Statistici covid extinse
            </h1>
        </Container>


        <Container style={{
            backgroundColor: "#023047",
            backgroundSize: "cover",
            maxWidth: "100%",
            margin: "0 auto",
            marginTop: "50px",
            marginBottom: "30px"
        }}>
            <Container style={{
                        marginBottom: "100px",
                        backgroundColor: "#f5f5f5",
                        backgroundSize: "cover",
                        borderRadius: "15px"
                        }}>
            <Row>
                <h1 className="text-grafic">
                    Rata de infectare in Timisoara
                </h1>
                <Col>
                    <Line
                        data={{
                            labels: labels,
                            datasets:
                                [
                                    {
                                        label: 'Rata de infectare',
                                        data: dataRata,
                                        backgroundColor: 'rgba(252, 191, 73, 1)'
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
            <Container style={{
                marginBottom: "100px",
                backgroundColor: "#f5f5f5",
                backgroundSize: "cover",
                borderRadius: "15px"
            }}>
            <Row>
                <h1 className="text-grafic">
                    Cazurile si decesle in Timisoara
                </h1>
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
                                },
                                {
                                    label: 'Decse',
                                    data: dataDecese,
                                    backgroundColor: 'orange',
                                    borderColor: 'red',
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
            <Container style={{
                marginBottom: "100px",
                backgroundColor: "#f5f5f5",
                backgroundSize: "cover",
                borderRadius: "15px"
            }}>
            <Row>
                <h1 className="text-grafic">
                    Situatia in Spitale
                </h1>
            </Row>
            <Row>
                <Col>
                    <Bar
                        data={{
                            labels: labels,
                            datasets: [
                                {
                                    label: 'Pacienti',
                                    data: dataPacienti,
                                    backgroundColor: 'rgba(61, 90, 128, 1)',
                                    borderWidth: 1,
                                },
                                {
                                    label: 'Pacienti Copii',
                                    data: dataPacientiCopii,
                                    backgroundColor: 'rgba(203, 108, 77, 1)',
                                    borderWidth: 1,
                                },
                                {
                                    label: 'Pacienti ATI',
                                    data: dataPacientiAti,
                                    backgroundColor: 'rgba(152, 193, 217, 1)',
                                    borderWidth: 1,
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
            <Container style={{
                marginBottom: "100px",
                backgroundColor: "#f5f5f5",
                backgroundSize: "cover",
                borderRadius: "15px"
            }}>
            <Row>
                <h1 className="text-grafic">
                    Disponibilitate Paturi cu Oxigen
                </h1>
            </Row>
            <Row>
                <Col>
                    <Bar
                        data={{
                            labels: labels,
                            datasets:
                                [
                                    {
                                        label: 'Paturi Oxigen',
                                        data: dataPaturiOxigen,
                                        backgroundColor: 'rgba(0, 48, 73, 1)',
                                    },
                                    {
                                        label: 'Paturi Oxigen Libere',
                                        data: dataPaturiOxigenLibere,
                                        backgroundColor: 'rgba(214, 40, 40, 1)',
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
        </Container>
    </div>
}

export default Statistics;