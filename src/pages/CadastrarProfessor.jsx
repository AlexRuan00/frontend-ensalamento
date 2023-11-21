import React, { useState , useEffect } from 'react';

import axios from 'axios';

import '../styles/CadastrarProfessor.css'

import Navbar from '../components/Navbar'

import ConteudoComponent from '../components/ConteudoComponent';

export default function CadastrarProfessor() {

    // Defina um estado para controlar a exibição do modal
    const [isModalOpen, setModalOpen] = useState(false);

    const [dados, setDados] = useState([]);

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
            const response = await axios.get('http://localhost:3000/professor');
            setDados(response.data);
          } catch (error) {
            console.error('Erro ao buscar dados da API:', error);
          }
        };
    
        fetchData();
      }, [dados]);

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

                {dados.map(item => (
                    <ConteudoComponent nome={item.nome_professor} id={item.id_professor} entidade={'professor'}/>
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