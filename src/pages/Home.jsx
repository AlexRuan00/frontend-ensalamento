import '../styles/Home.css'

import Navbar from '../components/Navbar'
import QuadroDeHorariosComponent from '../components/QuadroDeHorariosComponent'

import makeAnimated from 'react-select/animated';
const animatedComponents = makeAnimated();
import Select from 'react-select'


export default function Home() {

    const fases = [
        { value: '1º Fase', label: '1º Fase' },
        { value: '2º Fase', label: '2º Fase' },
        { value: '3º Fase', label: '3º Fase' },
        { value: '4º Fase', label: '4º Fase' }
    ]


    return (
        <div className='body'>
            <div>
                <Navbar />
            </div>
            <div className='app'>
                <h1>Home</h1>
                <div>
                    <button className='action-button'>Realizar Ensalamento da Turma</button>
                </div>
                <div>
                    <button className='action-button'>Excluir Ensalamento da Turma</button>
                </div>
                <div className='fases'>
                    <span>FASES:</span>
                    <Select
                        className='fases-select'
                        options={fases}
                    />
                </div>
            </div>
            <QuadroDeHorariosComponent />
        </div>
    )
}