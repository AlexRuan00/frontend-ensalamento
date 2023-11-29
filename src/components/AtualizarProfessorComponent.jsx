import React, { useState, useEffect } from 'react';
import Select from 'react-select'


import makeAnimated from 'react-select/animated';
const animatedComponents = makeAnimated();

import axios from 'axios';

import '../styles/CadastrarProfessorComponent.css'

import menuClose from '../assets/close-figma.png'



export default function AtualizarProfessorComponent({ isModalOpen, closeModal, idProfessor, idMateria, nome, materia, qDias, diasD }) {

    const [inputValue, setInputValue] = useState(nome);
    const [materias, setMateria] = useState([]);
    const [inputMat, setInputMat] = useState({ value: idMateria, label: materia });
    const [diasSemana, setDiasSemana] = useState([])
    const [numeroDias, setNumeroDias] = useState({ value: qDias, label: qDias })
    const [diasSemanais, setDiasSemanais] = useState(diasD)
    useEffect(() => {
        const fetchData = async () => {
            try {
                const response = await axios.get('https://backend-ensalamento.onrender.com/disciplina');
                distribuirMaterias(response.data);
            } catch (error) {
                console.error('Erro ao buscar dados da API:', error);
            }
        };
        changeInputDays(diasSemanais);
        fetchData();
    }, []);

    const distribuirMaterias = (materiasApi) => {
        let arrayMaterias = []
        materiasApi.forEach(e => {
            arrayMaterias.push({ value: e.id_materia, label: e.nome_materia })
        });
        setMateria(arrayMaterias)
    }

    const updateProf =  async () => {
        try {
            const response = await axios.put(`https://backend-ensalamento.onrender.com/professor/${idProfessor}`, {
                id: idProfessor,
                nome: inputValue,
                dias: diasSemana,
                quantidadeDias:numeroDias.value ,
                idMateria: inputMat.value
            });

            console.log('Resposta da API:', response.data);


            setInputValue('');

        } catch (error) {

            console.error('Erro na solicitação para a API:', error);
        }

        closeModal();

    };

    const changeInputMat = (selectedOption) => {
        setInputMat(selectedOption);
    };

    const defineQDias = (selectedOption) => {
        setNumeroDias(selectedOption);
    };


    const changeInputDays = (selectedOption) => {
        setDiasSemanais(selectedOption)
        let arrayDays = [];
        selectedOption.forEach(e => {
            arrayDays.push(e.value);
        });
        setDiasSemana(arrayDays)
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
                                    value={inputMat}
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
                                    value={diasSemanais}
                                />
                            </div>
                            <div className='modal-label-professor'>
                                <a>QUANTIDADE DE DIAS:</a>
                                <Select
                                    className='professor-select'
                                    options={quantidadeDias}
                                    onChange={defineQDias}
                                    value={numeroDias}
                                />
                            </div>
                            <div>
                                <button className='update-button-confirm' onClick={updateProf}>ATUALIZAR</button>
                            </div>
                        </div>
                    </div>
                </div>
            )}
        </>
    )
}