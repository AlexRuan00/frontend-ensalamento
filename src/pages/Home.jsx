import '../styles/Home.css'
import React, { useState, useEffect } from 'react';
import axios from 'axios';
import Navbar from '../components/Navbar'
import QuadroDeHorariosComponent from '../components/QuadroDeHorariosComponent'

import makeAnimated from 'react-select/animated';
const animatedComponents = makeAnimated();
import Select from 'react-select'

const apiFases = [];
export default function Home() {
    const [fases, setFases] = useState([]);
    const [resultado, setResultado] = useState([]);
    const [faseAtual, setFaseAtual] = useState(null)
  
    useEffect(() => {
        const fetchData = async () => {
            try {
                const response = await axios.get('https://backend-ensalamento.onrender.com/fase');
                apiFases.push(response.data);
                distribuirFases(response.data);
            } catch (error) {
                console.error('Erro ao buscar dados da API:', error);
            }
        };

        fetchData();
    }, []);

    const buscaResultado = async (idFase) => {
        
        try {
            const response = await axios.get('https://backend-ensalamento.onrender.com/ensalar');
            setResultado([0]);
            response.data.forEach(e => {
                if(e.fase == idFase) {
                    setResultado(e.resultado)
                }
            });
        } catch (error) {
            console.error('Erro ao buscar dados da API:', error);
        }

        
    };

    const distribuirFases = (fasesApi) => {
        let arrayFases = []
        fasesApi.forEach(e => {
            arrayFases.push({ value: e.id_fase, label: e.nome_fase })
        });
        setFases(arrayFases)
    }

    const atualizaResultado = (selectedOption) => {
        setFaseAtual(selectedOption.value)
        buscaResultado(selectedOption.value)
    }

    const ensalar = () => {
        buscaResultado(faseAtual)
    }

    const naoEnsalar = () => {
        setResultado([]);
    }

    return (
        <div className='body'>
            <div>
                <Navbar />
            </div>
            <div className='app'>
                <h1>Home</h1>
                <div>
                    <button className='action-button' onClick={ensalar}>Realizar Ensalamento da Turma</button>
                </div>
                <div>
                    <button className='action-button' onClick={naoEnsalar}>Excluir Ensalamento da Turma</button>
                </div>
                <div className='fases'>
                    <span>FASES:</span>
                    <Select
                        className='fases-select'
                        options={fases}
                        onChange={atualizaResultado}
                    />
                </div>
            </div>
            {/* {ativou && <QuadroDeHorariosComponent props={resultado} />} */}
            <QuadroDeHorariosComponent props={resultado} />
        </div>
    )
}