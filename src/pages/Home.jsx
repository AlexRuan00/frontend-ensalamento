import '../styles/Home.css'

import Navbar from '../components/Navbar'

export default function Home() {
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
            </div>
        </div>
    )
}