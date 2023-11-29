
import '../styles/QuadroDeHorarioComponent.css'

export default function QuadroDeHorariosComponent() {



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
                <div className="quadro-box">
                    <span className='span-professor'>Ruan</span>
                    <span className='span-materia'>Desenvolvimento de Sistemas</span>
                </div>
                <div className="quadro-box">
                    <span className='span-professor'>Rodrigo Farias</span>
                    <span className='span-materia'>Teste de Sistemas</span>
                </div>
                <div className="quadro-box">
                    <span className='span-professor'>Paulo</span>
                    <span className='span-materia'>Desenvolvimento de Sistemas</span>
                </div>
                <div className="quadro-box">
                    <span className='span-professor'>Paulo</span>
                    <span className='span-materia'>Desenvolvimento de Sistemas</span>
                </div>
                <div className="quadro-box">
                    <span className='span-professor'></span>
                    <span className='span-materia'></span>
                </div>
                <div className="quadro-box-inferior-direito">
                    <span className='span-professor'></span>
                    <span className='span-materia'></span>
                </div>
            </div>
        </div>
    )
}