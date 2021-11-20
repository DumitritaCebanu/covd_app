import React, {useState, useEffect} from 'react'
import {Bar, Doughnut} from 'react-chartjs-2'
import axios from "axios";
import {Container, Row, Col} from "react-bootstrap";
import image from './evaluare-post-COVID-19.jpg';
import vaccin from './mockup2.png';
import '../styles/Home.css';


function Home() {
    const [labels, setLabels] = useState([])
    const [dataRata, setDataRata] = useState([])
    const [dataCazuri, setDataCazuri] = useState([])
    const [dataDecese, setDataDecese] = useState([])
    const [dataDozeVaccin, setDataVaccin] = useState([])
    const [dataDozeRapel, setDataRapel] = useState([])
    const [dataDozeTreia, setDataTreia] = useState([])

    useEffect(() => {
        axios.get('https://covid19.primariatm.ro/istoric-covid19-tm.json')
            .then(response => response.data.slice(0, 1))
            .then(data => {
                setLabels(data.map(item => (item.data)))
                setDataRata(data.map(item => (item.rata)))
                setDataCazuri(data.map(item => (item.cazuri)))
                setDataDecese(data.map(item => (item.decese)))
                setDataVaccin(data.map(item => (item.dozeVaccin24h)))
                setDataRapel(data.map(item => (item.dozeRapel24h)))
                setDataTreia(data.map(item => (item.dozaATreia24h)))
            })
            .catch(err => console.warn(err))
    }, [])

    return <>
        <Container fluid style={{
            backgroundImage: `url(${image})`,
            backgroundSize: "cover",
            height: "80vh",
            color: "#f5f5f5"
        }}>
            <h1 id="text_img">
                Ultimele <br/>date <br/>covid-19
            </h1>
        </Container>

        <Container>
            <Row style={{
                padding: "200px 0px"
            }}>
                <Col xs={2}>
                </Col>
                <Col>
                    <div className="square">
                        <p className="text">Cazuri
                            <h1>{dataCazuri}</h1>
                        </p>
                    </div>
                </Col>
                <Col>
                    <div className="square">
                        <p className="text">Rata
                            <h1>{dataRata}</h1>
                        </p>
                    </div>
                </Col>
                <Col>
                    <div className="square">
                        <p className="text">Decese
                            <h1>{dataDecese}</h1>
                        </p>
                    </div>
                </Col>
            </Row>
            <br/><br/>
        </Container>
        <Container fluid style={{
            backgroundColor: "rgba(61, 90, 128, 1)",
            backgroundSize: "cover",
            color: "#f5f5f5"
        }}>
            <Container>
                <Row>
                    <Col lg={4}>
                        <img src={vaccin} className="vaccin-img"/>
                    </Col>
                    <Col lg={8}>
                        <h1 className="text-vaccin">Statistici vaccinuri in Timsoara 24h</h1>
                        <Row style={{padding: "5px 10px"}}>
                            <Col>
                                <h2 className="nr-vaccin">Doze Vaccin <br/>{dataDozeVaccin}</h2>
                            </Col>
                            <Col>
                                <h2 className="nr-vaccin">Doze Rapel <br/>{dataDozeRapel}</h2>
                            </Col>
                            <Col>
                                <h2 className="nr-vaccin">Doza a treia <br/>{dataDozeTreia}</h2>
                            </Col>
                        </Row>
                    </Col>
                </Row>
            </Container>
        </Container>
    </>
}

export default Home;