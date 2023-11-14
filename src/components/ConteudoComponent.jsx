
import React, { useState, useEffect } from 'react';
import axios from 'axios'; // Certifique-se de ter o Axios instalado: npm install axios
import '../styles/ConteudoMateria.css';
import arrow from '../assets/arrow-right.png';
import updateIcon from '../assets/update.png';
import deleteIcon from '../assets/delete.png';

export default function ConteudoComponent({ nome }) {
    const [listaDeMaterias, setListaDeMaterias] = useState();

    useEffect(() => {

        const buscarListadeMaterias = async () => {
            try {
                const resposta = await axios.get(`http://localhost:3000/disciplina/`)
                setListaDeMaterias(resposta.data)
                console.log('Lista de Professores')
            } catch (error) {
                console.error('Erro ao buscar a lista de Times:', error);
            }
        }

        buscarListadeMaterias();

    }, []);

    console.log(listaDeMaterias)


    return (
        <div className='component-card'>
            <ul>
                <div className='list-item-row'>
                    <li>
                        <img className='arrow-right' src={arrow} alt='Seta para a direita' />
                        {nome} {/* Substitua 'nome' pelo campo real do seu objeto de dados */}
                    </li>
                    <div className='list-item-box'>
                        <img className='update-icon' src={updateIcon} alt='Seta para a direita' />
                    </div>
                    <div className='list-item-box'>
                        <img className='update-icon' src={deleteIcon} alt='Seta para a direita' />
                    </div>
                </div>
            </ul>
        </div>
    );
}
