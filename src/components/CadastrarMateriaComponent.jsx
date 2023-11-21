
import React, { useState } from 'react';

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
                                <input placeholder='Ex: Lógica de Programação' value={inputValue} onChange={(e) => setInputValue(e.target.value)}  type="text"/>
                            </div>
                            <div className='modal-label'>
                                <a>FASE:</a>
                                <input placeholder='Ex: 1' />
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