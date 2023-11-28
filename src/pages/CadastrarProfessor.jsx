import React, { useState , useEffect } from 'react';

import axios from 'axios';

import '../styles/CadastrarProfessor.css'

import Navbar from '../components/Navbar'

import CadastrarProfessorComponent from '../components/CadastrarProfessorComponent';

import ConteudoComponent from '../components/ConteudoComponent';

export default function CadastrarProfessor() {

    // Defina um estado para controlar a exibição do modal
    const [isModalOpen, setModalOpen] = useState(false);
    const [materias, setMaterias] = useState([]);
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
            const response = await axios.get('https://backend-ensalamento.onrender.com/professor');
            setDados(response.data);
          } catch (error) {
            console.error('Erro ao buscar dados da API:', error);
          }
        };
    
        fetchData();
        searchMats();
      }, [dados]);

      const searchMats = async () => {
        try {
            const response = await axios.get(`https://backend-ensalamento.onrender.com/disciplina`);
            setMaterias(response.data)
            //console.log('Resposta da API:', response.data);
        } catch (error) {

            console.error('Erro na solicitação para a API:', error);
        }
        
      
    };

    const searchDiscipline = (idMat) => {
        let nomeMat;
        materias.forEach(e => {
            if(idMat === e.id_materia) {
                nomeMat = e.nome_materia;
                return nomeMat;
            }
        });
        return nomeMat; // Certifique-se de retornar o valor
    }   


     
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
                    <ConteudoComponent nome={item.nome_professor} id={item.id_professor} diasDisponiveis={item.dias_disponiveis}  materia={searchDiscipline(item.id_materia)} entidade={'professor'} />
                ))}

                <div className='register-content'>
                    {isModalOpen && (
                        <CadastrarProfessorComponent isModalOpen={isModalOpen} closeModal={closeModal} />
                    )}
                </div>
            </div>
        </div>
    )
}