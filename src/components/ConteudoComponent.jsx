
import React, { useState } from 'react';
import axios from 'axios';
import '../styles/ConteudoMateria.css';
import arrow from '../assets/arrow-right.png';
import updateIcon from '../assets/update.png';
import deleteIcon from '../assets/delete.png';

export default function ConteudoComponent({ nome, id, entidade }) {
    const [isOpen, setIsOpen] = useState(false);
    const toggleInfo = () => {
        setIsOpen(!isOpen);
    };

    const arrayteste = ['teste1', 'teste2', 'teste3']

    const deleteData = async () => {
        try {
            if (entidade === 'matéria') {
                const response = await axios.delete(`http://localhost:3000/disciplina/${id}`);
            }
            if (entidade === 'professor') {
                const response = await axios.delete(`http://localhost:3000/professor/${id}`);
            }


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
                isOpen && (
                    <ul className='infos-card'>
                        {arrayteste.map((item, index) => (
                            <li key={index}>{item}</li>
                        ))}
                    </ul>
                )
            }
        </div>
    );
}
