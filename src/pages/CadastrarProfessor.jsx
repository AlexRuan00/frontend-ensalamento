import React, { useState } from 'react';

import '../styles/CadastrarProfessor.css'

import Navbar from '../components/Navbar'

import ConteudoComponent from '../components/ConteudoComponent';

export default function CadastrarProfessor() {

    // Defina um estado para controlar a exibição do modal
    const [isModalOpen, setModalOpen] = useState(false);

    // Função para abrir o modal
    const openModal = () => {
        setModalOpen(true);
    }

    // Função para fechar o modal
    const closeModal = () => {
        setModalOpen(false);
    }

    const prof = [
        {
            nome: 'Rodrigo'
        },
        {
            nome: 'Thaise',
        },
        {
            nome: 'Ruan',
        },
        {
            nome: 'Thaise',
        }
       
    ]

    return (
        <div className='cadastrar-professor-body'>
            <div>
                <Navbar />
            </div>
            <div className='app-professor'>
                <div className='title-content'>
                    <h1>Professores</h1>
                    <button className='register-button-materia' onClick={openModal}>Cadastrar</button>
                </div>

                {prof.map(item => (
                    <ConteudoComponent nome={item.nome} />
                ))}

                <div className='register-content'>
                    {isModalOpen && (
                        <CadastrarMateriaComponent isModalOpen={isModalOpen} closeModal={closeModal} />
                    )}
                </div>
            </div>
        </div>
    )
}