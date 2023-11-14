
import React, { useState } from 'react';

import '../styles/CadastrarMateriaComponent.css'

import menuClose from '../assets/close-figma.png'

export default function CadastrarMateriaComponent({ isModalOpen, closeModal }) {

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
                                <input placeholder='Ex: Lógica de Programação' />
                            </div>
                            <div className='modal-label'>
                                <a>FASE:</a>
                                <input placeholder='Ex: 1' />
                            </div>
                            <div>
                                <button className='register-button-confirm'>CADASTRAR</button>
                            </div>
                        </div>
                    </div>
                </div>
            )}
        </>

    )
}