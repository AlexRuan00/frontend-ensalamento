import React, { useState, useEffect } from 'react';
import Select from 'react-select'


import makeAnimated from 'react-select/animated';
const animatedComponents = makeAnimated();

import axios from 'axios';

import '../styles/CadastrarProfessorComponent.css'

import menuClose from '../assets/close-figma.png'


export default function CadastrarProfessorComponent({ isModalOpen, closeModal }) {
    const [inputValue, setInputValue] = useState('');
    const [materias, setMateria] = useState([]);
    const [inputMat, setInputMat] = useState(null);
    const [diasSemana, setDiasSemana] = useState([])

    useEffect(() => {
        const fetchData = async () => {
            try {
                const response = await axios.get('https://backend-ensalamento.onrender.com/disciplina');
                distribuirMaterias(response.data);
            } catch (error) {
                console.error('Erro ao buscar dados da API:', error);
            }
        };

        fetchData();
    }, []);

    const distribuirMaterias = (materiasApi) => {
        let arrayMaterias = []
        materiasApi.forEach(e => {
            arrayMaterias.push({ value: e.id_materia, label: e.nome_materia })
        });
        setMateria(arrayMaterias)
    }

    const registerProf = async () => {
        try {
            const response = await axios.post('https://backend-ensalamento.onrender.com/professor', {
                nome: inputValue,
                dias: diasSemana,
                quantidadeDias: 3,
                idMateria: inputMat,
               
            });

            console.log('Resposta da API:', response.data);


            setInputValue('');

        } catch (error) {

            console.error('Erro na solicitação para a API:', error);
        }

        closeModal();

    };

    const changeInputMat = (selectedOption) => {
        setInputMat(selectedOption.value);
    };


    const changeInputDays = (selectedOption) => {
        let arrayDays = [];
        selectedOption.forEach(e => {
            arrayDays.push(e.value);
        });
        setDiasSemana(arrayDays)
    };

    // const materias = [
    //     { value: 'Lógica de Programação', label: 'Lógica de Programação' },
    //     { value: 'Eletrônica', label: 'Eletrônica' },
    //     { value: 'Teste de Sistemas', label: 'Teste de Sistemas' }
    // ]

    // const fases = [
    //     { value: 'Primeira Fase', label: 'Primeira Fase' },
    //     { value: 'Segunda Fase', label: 'Segunda Fase' },
    //     { value: 'Terceira Fase', label: 'Terceira Fase' }
    // ]

    const dias = [
        { value: 'Segunda', label: 'Segunda' },
        { value: 'Terça', label: 'Terça' },
        { value: 'Quarta', label: 'Quarta' },
        { value: 'Quinta', label: 'Quinta' },
        { value: 'Sexta', label: 'Sexta' },
    ]

    return (
        <>
            {isModalOpen && (
                <div className="modal-professor">
                    <div>
                        <div className='modal-professor-header'>
                            <h2>CADASTRAR NOVO PROFESSOR</h2>
                            <img className='modal-professor-close-icon' src={menuClose} onClick={closeModal} />
                        </div>
                        <div className='modal-professor-content-professor'>

                            <div className='modal-label-professor'>
                                <a>NOME:</a>
                                <input placeholder='Ex: Rodrigão' value={inputValue} onChange={(e) => setInputValue(e.target.value)} type="text" />
                            </div>

                            <div className='modal-label-professor'>
                                <a>MATÉRIAS:</a>
                                <Select
                                    className='professor-select'
                                    options={materias}
                                    onChange={changeInputMat}
                                />
                            </div>
                            <div className='modal-label-professor'>
                                <a>DIAS DISPONÍVEIS:</a>
                                <Select
                                    className='professor-select'
                                    closeMenuOnSelect={false}
                                    components={animatedComponents}
                                    isMulti
                                    options={dias}
                                    onChange={changeInputDays}
                                />
                            </div>
                            <div>
                                <button className='register-button-confirm' onClick={registerProf}>CADASTRAR</button>
                            </div>
                        </div>
                    </div>
                </div>
            )}
        </>

    )
}