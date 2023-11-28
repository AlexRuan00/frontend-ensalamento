
import React, { useState, useEffect } from 'react';
import axios from 'axios';
import '../styles/ConteudoMateria.css';
import arrow from '../assets/arrow-right.png';
import updateIcon from '../assets/update.png';
import deleteIcon from '../assets/delete.png';

export default function ConteudoComponent({ nome, id, entidade, idFase, diasDisponiveis, materia }) {
    const [isOpen, setIsOpen] = useState(false);
    const [entity, setEntity] = useState(false);
    const [fase, setFase] = useState('');
    useEffect(() => {
        if (entidade === 'professor') {
            setEntity(true)
        }

        searchFase()
    }, []);


    const toggleInfo = () => {
        setIsOpen(!isOpen);
    };

    const arrayteste = ['teste1']

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
                if(e.id_fase === idFase){
                    setFase(e.nome_fase);
                }
            });
            //console.log('Resposta da API:', response.data);
        } catch (error) {

            console.error('Erro na solicitação para a API:', error);
        }
        
      
    };



    return (
        <div className='component-card'>
            <ul>
                <div className='list-item-row'>
                    <li onClick={toggleInfo} className='card-tittle'>
                        <img className='arrow-right' src={arrow} alt='Seta para a direita' />
                        {nome}

                    </li>

                    <div className='list-item-box'>
                        <img className='update-icon' src={updateIcon} alt='Seta para a direita' />
                    </div>
                    <div className='list-item-box'>
                        <img className='update-icon' src={deleteIcon} alt='Seta para a direita' onClick={deleteData} />
                    </div>
                </div>
            </ul>
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
