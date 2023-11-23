

import React, { useState, useEffect } from 'react';

import axios from 'axios';

import '../styles/CadastrarMateria.css'

import Navbar from '../components/Navbar'

import CadastrarMateriaComponent from '../components/CadastrarMateriaComponent';

import ConteudoComponent from '../components/ConteudoComponent';


export default function CadastrarMateria() {
    const [dados, setDados] = useState([]);

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

    useEffect(() => {
        const fetchData = async () => {
          try {
            const response = await axios.get('http://localhost:3000/disciplina');
            setDados(response.data);
          } catch (error) {
            console.error('Erro ao buscar dados da API:', error);
          }
        };
    
        fetchData();
      }, [closeModal]);


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
                
                {dados.map(item => (
                    <ConteudoComponent nome={item.nome_materia} id={item.id_materia} idFase={item.id_fase} entidade={'matéria'}/>
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