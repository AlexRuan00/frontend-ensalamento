import '../styles/QuadroDeHorarioComponent.css'
import React, { useState, useEffect } from 'react';

const teste = [
    {
        dia: "Segunda",
        professor: "Thayse",
        materia: "Lógica de programação"
    },
    {
        dia: "Quarta",
        professor: "Thayse",
        materia: "Lógica de programação"
    },
    {
        dia: "Quinta",
        professor: "Thayse",
        materia: "Lógica de programação"
    },
    {
        dia: "Terça",
        professor: "João",
        materia: "Eletroeletrônica"
    }
]

const teste2 = []

export default function QuadroDeHorariosComponent(props) {
    const [resultado, setResultado] = useState([]);
    
    const DiaComponent = ({ dia }) => {
        let resultadoDoDia = teste2.find(item => item.dia === dia);
        if (props.props && props.props.length > 0){
             resultadoDoDia = props.props.find(item => item.dia === dia);
        } 
    //     if (props.props[0] == 0){
    //         alert('Nenhum dado nessa fase')
    //    } 
        if (resultadoDoDia) {
            return (
                <div className="quadro-box">
                    <span className='span-professor'>{resultadoDoDia.professor}</span>
                    <span className='span-materia'>{resultadoDoDia.materia}</span>
                </div>
            );
        } else {
            return (
                <div className="quadro-box">
                    <span className='span-professor'></span>
                    <span className='span-materia'></span>
                </div>
            );
        }
    };

    return (
        <div className='quadro'>
            <div className='quadro-header'>
                <h1>QUADRO DE HORÁRIOS</h1>
            </div>
            <div className='quadro-linha'>
                <div className='quadro-dias'>
                    <span>DOMINGO</span>
                </div>
                <div className='quadro-dias'>
                    <span>SEGUNDA</span>
                </div>
                <div className='quadro-dias'>
                    <span>TERÇA</span>
                </div>
                <div className='quadro-dias'>
                    <span>QUARTA</span>
                </div>
                <div className='quadro-dias'>
                    <span>QUINTA</span>
                </div>
                <div className='quadro-dias'>
                    <span>SEXTA</span>
                </div>
                <div className='quadro-dias'>
                    <span>SABADO</span>
                </div>

            </div>
            <div className="quadro-linha">
                <div className="quadro-box-inferior-esquerdo">
                    <span className='span-professor'></span>
                    <span className='span-materia'></span>
                </div>
                <DiaComponent dia="Segunda" />
                <DiaComponent dia="Terça" />
                <DiaComponent dia="Quarta" />
                <DiaComponent dia="Quinta" />
                <DiaComponent dia="Sexta" />
                <div className="quadro-box-inferior-direito">
                    <span className='span-professor'></span>
                    <span className='span-materia'></span>
                </div>
            </div>
        </div>
    )
}