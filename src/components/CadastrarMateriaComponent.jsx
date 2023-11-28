
import React, { useState, useEffect } from 'react';
import Select from 'react-select'


import makeAnimated from 'react-select/animated';
const animatedComponents = makeAnimated();

import axios from 'axios';

import '../styles/CadastrarMateriaComponent.css'

import menuClose from '../assets/close-figma.png'

export default function CadastrarMateriaComponent({ isModalOpen, closeModal }) {
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
            arrayFases.push({value: e.id_fase, label: e.nome_fase})
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

    const registerFase = async () => {
        try {
            const response = await axios.post('https://backend-ensalamento.onrender.com/fase', {
                nome: novaFase,
            });

            console.log('Resposta da API:', response.data);


            setNovaFase('');

        } catch (error) {

            console.error('Erro na solicitação para a API:', error);
        }
        closeModal();

    };

    const handleSelectChange = (selectedOption) => {
        setInputFaseValue(selectedOption.value);
      };

    const materias = [
        { value: 'Lógica de Programação', label: 'Lógica de Programação' },
        { value: 'Eletrônica', label: 'Eletrônica' },
        { value: 'Teste de Sistemas', label: 'Teste de Sistemas' }
    ]


    const dias = [
        { value: 'Segunda', label: 'Segunda' },
        { value: 'Terça', label: 'Terça' },
    ]

    return (
        <>
            {isModalOpen && (
                <div className="modal">
                    <div>
                        <div className='modal-header'>
                            <h2>CADASTRAR NOVA MATÉRIA</h2>
                            <img className='modal-close-icon' src={menuClose} onClick={closeModal} />
                        </div>
                        <div className='modal-content'>

                            <div className='modal-label'>
                                <a>NOME:</a>
                                <input placeholder='Ex: Lógica de Programação' value={inputValue} onChange={(e) => setInputValue(e.target.value)} type="text" />
                            </div>
                            <div className='modal-label-professor'>
                                <a>CADASTRAR FASE:</a>
                                <div className='modal-professor-grid'>
                                    <input placeholder='Ex: Primeira Fase'  type="text" value={novaFase} onChange={(e) => setNovaFase(e.target.value)}/>
                                    <button className='add-fase' onClick={registerFase}>CADASTRAR</button>
                                </div>
                            </div>
                            <div className='modal-label-professor'>
                                <a>FASES:</a>
                                <Select
                                    className='professor-select'
                                    options={fases}
                                    
                                    onChange={handleSelectChange}
                                />
                            </div>



                            <div>
                                <button className='register-button-confirm' onClick={registerMat}>CADASTRAR</button>
                            </div>
                        </div>
                    </div>
                </div>
            )}
        </>

    )
}