

import React, { useState } from 'react';

import '../styles/CadastrarMateria.css'

import Navbar from '../components/Navbar'

import CadastrarMateriaComponent from '../components/CadastrarMateriaComponent';

import ConteudoComponent from '../components/ConteudoComponent';


export default function CadastrarMateria() {

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
            nome: 'Lógica de Programação'
        },
        {
            nome: 'Fundamentos da Eletrônica Aplicada',
        }
       
    ]


    return (
        <div className='cadastrar-materia-body'>
            <div>
                <Navbar />
            </div>
            <div className='app-materia'>
                <div className='title-content'>
                    <h1>Matérias</h1>
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