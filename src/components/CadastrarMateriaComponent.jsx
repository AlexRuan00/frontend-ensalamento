
import React, { useState } from 'react';
import Select from 'react-select'


import makeAnimated from 'react-select/animated';
const animatedComponents = makeAnimated();

import axios from 'axios';

import '../styles/CadastrarMateriaComponent.css'

import menuClose from '../assets/close-figma.png'

export default function CadastrarMateriaComponent({ isModalOpen, closeModal }) {
    const [inputValue, setInputValue] = useState('');

    const registerProf = async () => {
        try {
            const response = await axios.post('http://localhost:3000/disciplina', {
                nome: inputValue,
                idFase: 1
            });

            console.log('Resposta da API:', response.data);


            setInputValue('');

        } catch (error) {

            console.error('Erro na solicitação para a API:', error);
        }

        closeModal();

    };

    const materias = [
        { value: 'Lógica de Programação', label: 'Lógica de Programação' },
        { value: 'Eletrônica', label: 'Eletrônica' },
        { value: 'Teste de Sistemas', label: 'Teste de Sistemas' }
    ]

    const fases = [
        { value: 'Primeira Fase', label: 'Primeira Fase' },
        { value: 'Segunda Fase', label: 'Segunda Fase' },
        { value: 'Terceira Fase', label: 'Terceira Fase' }
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
                                    <input placeholder='Ex: Primeira Fase' value={inputValue} onChange={(e) => setInputValue(e.target.value)} type="text" />
                                    <button className='add-fase'>CADASTRAR</button>
                                </div>
                            </div>
                            <div className='modal-label-professor'>
                                <a>FASES:</a>
                                <Select
                                    className='professor-select'
                                    options={fases}
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