
import React, { useState, useEffect } from 'react';
import Select from 'react-select'


import makeAnimated from 'react-select/animated';
const animatedComponents = makeAnimated();

import axios from 'axios';

import '../styles/CadastrarMateriaComponent.css'

import menuClose from '../assets/close-figma.png'

export default function AtualizarMateriaComponent({ isModalOpen, closeModal }) {

    const [inputValue, setInputValue] = useState('');
    const [inputFaseValue, setInputFaseValue] = useState(null);
    const [novaFase, setNovaFase] = useState('');
    const [fases, setFases] = useState([]);

    useEffect(() => {
        const fetchData = async () => {
            try {
                const response = await axios.get('https://backend-ensalamento.onrender.com/fase');
                distribuirFases(response.data);
            } catch (error) {
                console.error('Erro ao buscar dados da API:', error);
            }
        };

        fetchData();
    }, []);

    const distribuirFases = (fasesApi) => {
        let arrayFases = []
        fasesApi.forEach(e => {
            arrayFases.push({ value: e.id_fase, label: e.nome_fase })
        });
        setFases(arrayFases)
    }

    const registerMat = async () => {
        try {
            const response = await axios.post('https://backend-ensalamento.onrender.com/disciplina', {
                nome: inputValue,
                idFase: inputFaseValue
            });

            console.log('Resposta da API:', response.data);


            setInputValue('');

        } catch (error) {

            console.error('Erro na solicitação para a API:', error);
        }

        closeModal();

    };

    const handleSelectChange = (selectedOption) => {
        setInputFaseValue(selectedOption.value);
    };

    const quantidadeDias = [
        { value: 1, label: 1 },
        { value: 2, label: 2 },
        { value: 3, label: 3 },
        { value: 4, label: 4 },
        { value: 5, label: 5 },
    ]

    return (
        <>
            {isModalOpen && (
                <div className="modal">
                    <div>
                        <div className='modal-header'>
                            <h2>ATUALIZAR MATÉRIA</h2>
                            <img className='modal-close-icon' src={menuClose} onClick={closeModal} />
                        </div>
                        <div className='modal-content'>

                            <div className='modal-label'>
                                <a>NOME:</a>
                                <input placeholder='Ex: Lógica de Programação' value={inputValue} onChange={(e) => setInputValue(e.target.value)} type="text" />
                            </div>
                            <div className='modal-label-professor'>
                                <a>FASES:</a>
                                <Select
                                    className='professor-select'
                                    options={fases}
                                    onChange={handleSelectChange}
                                />
                            </div>
                            <div className='modal-label-professor'>
                                <a>QUANTIDADE DE DIAS:</a>
                                <Select
                                    className='professor-select'
                                    options={quantidadeDias}
                                    onChange={handleSelectChange}
                                />
                            </div>
                            <div>
                                <button className='update-button-confirm' onClick={registerMat}>ATUALIZAR</button>
                            </div>
                        </div>
                    </div>
                </div>
            )}
        </>
    )
}