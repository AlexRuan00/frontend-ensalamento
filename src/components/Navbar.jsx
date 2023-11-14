import React, { useState } from 'react';
//----------------------------------------------------------------------
import '../styles/Navbar.css'
//----------------------------------------------------------------------
import menuIcon from '../assets/menu_hamburguer.png'
//----------------------------------------------------------------------
import menuHomeIcon from '../assets/Home-figma.png'
import menuCadastrarProfessorIcon from '../assets/cadastrar-professor-figma.png'
import menuCadastrarMateriaIcon from '../assets/cadastrar-materia-figma.png'
//----------------------------------------------------------------------
import { Link } from "react-router-dom";
//----------------------------------------------------------------------
export default function Navbar() {

    const [isModalOpen, setIsModalOpen] = useState(false);
    const [modalSize, setModalSize] = useState('small'); // Adicione um estado para controlar o tamanho do modal



    const toggleModal = () => {
        setIsModalOpen(!isModalOpen);

        // Alterne o tamanho do modal entre 'small' e 'large'
        setModalSize(modalSize === 'small' ? 'large' : 'small');
    };

    return (
        <div className='main'>
            <div className={`nav-bar ${isModalOpen ? 'open' : ''} ${modalSize}`}>
                <img className='menu-icon' src={menuIcon} onClick={toggleModal} />
            </div>
            <div className={`painel-lateral ${isModalOpen ? 'open' : ''} ${modalSize}`}>
                <div className='label'>
                    <Link to={`/`}>
                        <img src={menuHomeIcon} alt='Página Inicial' />
                        {isModalOpen && <a>Página Inicial</a>}
                    </Link>
                </div>
                <div className='label'>
                    <Link to={`/cadastrar-materia`}>
                        <img src={menuCadastrarProfessorIcon} alt='Cadastrar Professores' />
                        {isModalOpen && <a>Cadastrar Professores</a>}
                    </Link>
                </div>
                <div className='label'>
                    <Link to={`/cadastrar-professor`}>
                        <img src={menuCadastrarMateriaIcon} alt='Cadastrar Matérias' />
                        {isModalOpen && <a>Cadastrar Matérias</a>}
                    </Link>
                </div>
            </div>
        </div>

    )
}