
import React, { useState, useEffect } from 'react';
import axios from 'axios';
import '../styles/ConteudoMateria.css';
import arrow from '../assets/arrow-right.png';
import updateIcon from '../assets/update.png';
import deleteIcon from '../assets/delete.png';

import AtualizarMateriaComponent from './AtualizarMateriaComponent';
import AtualizarProfessorComponent from './AtualizarProfessorComponent';

export default function ConteudoComponent({ nome, id, entidade, idFase, diasDisponiveis, materia, dias, idMateria, quantidadeDias }) {
    const [isOpen, setIsOpen] = useState(false);
    const [entity, setEntity] = useState(false);
    const [fase, setFase] = useState('');
    useEffect(() => {
        if (entidade === 'professor') {
            setEntity(true)
        }

        searchFase()
    }, []);

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

    const toggleInfo = () => {
        setIsOpen(!isOpen);
    };

    // const arrayteste = ['teste1']

    const deleteData = async () => {
        try {
            if (entidade === 'matéria') {
                const response = await axios.delete(`https://backend-ensalamento.onrender.com/disciplina/${id}`);
            }
            if (entidade === 'professor') {
                const response = await axios.delete(`https://backend-ensalamento.onrender.com/professor/${id}`);
            }


        } catch (error) {

            console.error('Erro na solicitação para a API:', error);
        }

    };


    const searchFase = async () => {
        try {
            const response = await axios.get(`https://backend-ensalamento.onrender.com/fase`);
            response.data.forEach(e => {
                if (e.id_fase === idFase) {
                    setFase(e.nome_fase);
                }
            });
            //console.log('Resposta da API:', response.data);
        } catch (error) {

            console.error('Erro na solicitação para a API:', error);
        }


    };

    const retornarDias = (arrayDias) => {
        let arrayRetorno = []
        arrayDias.forEach(e => {
            arrayRetorno.push({ value: e, label: e })
        });
        return arrayRetorno;
    }


    return (
        <div className='component-card'>
            <ul>
                <div className='list-item-row'>
                    <li onClick={toggleInfo} className='card-tittle'>
                        <img className='arrow-right' src={arrow} alt='Seta para a direita' />
                        {nome}

                    </li>

                    <div className='list-item-box'>
                        <img className='update-icon' src={updateIcon} alt='Seta para a direita' onClick={openModal} />
                    </div>
                    <div className='list-item-box'>
                        <img className='update-icon' src={deleteIcon} alt='Seta para a direita' onClick={deleteData} />
                    </div>
                </div>
            </ul>
            <div className='register-content'>
                {
                    isModalOpen && !entity && (
                        <AtualizarMateriaComponent isModalOpen={isModalOpen} closeModal={closeModal} idMateria={id} nome={nome} dias={dias} idFase={idFase} nomeFase={fase}/>
                    )
                }
                {
                    isModalOpen && entity && (
                        <AtualizarProfessorComponent isModalOpen={isModalOpen} closeModal={closeModal} idProfessor={id} idMateria={idMateria} nome={nome} materia={materia} qDias={quantidadeDias} diasD={retornarDias(diasDisponiveis)} />
                    )
                }
            </div>
            {
                isOpen && !entity && (
                    <div className='infos-card-materia'>
                        <p>FASE: </p>
                        <span> {fase} </span>
                    </div>
                )
            }

            {
                isOpen && entity && (
                    <div className='infos-card-professor'>
                        <div className='infos-card-professor-disp'>
                            <p>DISCÍPLINA:</p>
                            <span>{materia}</span>
                        </div>
                        <div className='infos-card-professor-disp'>
                            <p>DISPONIBILIDADE:</p>
                            {diasDisponiveis.map(item => (
                                <span>{item}</span>
                            ))}
                        </div>
                    </div>
                )
            }
        </div>
    );
}
