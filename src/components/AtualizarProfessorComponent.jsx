import React, { useState, useEffect } from 'react';
import Select from 'react-select'


import makeAnimated from 'react-select/animated';
const animatedComponents = makeAnimated();

import axios from 'axios';

import '../styles/CadastrarProfessorComponent.css'

import menuClose from '../assets/close-figma.png'



export default function AtualizarProfessorComponent({ isModalOpen, closeModal }) {

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

    const handleSelectChange = (selectedOption) => {
        setInputFaseValue(selectedOption.value);
    };


    const dias = [
        { value: 'Segunda', label: 'Segunda' },
        { value: 'Terça', label: 'Terça' },
        { value: 'Quarta', label: 'Quarta' },
        { value: 'Quinta', label: 'Quinta' },
        { value: 'Sexta', label: 'Sexta' },
    ]

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
                <div className="modal-professor">
                    <div>
                        <div className='modal-professor-header'>
                            <h2>ATUALIZAR PROFESSOR</h2>
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
                            <div className='modal-label-professor'>
                                <a>QUANTIDADE DE DIAS:</a>
                                <Select
                                    className='professor-select'
                                    options={quantidadeDias}
                                    onChange={handleSelectChange}
                                />
                            </div>
                            <div>
                                <button className='update-button-confirm' onClick={registerProf}>ATUALIZAR</button>
                            </div>
                        </div>
                    </div>
                </div>
            )}
        </>
    )
}