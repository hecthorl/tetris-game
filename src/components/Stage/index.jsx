import Cell from '../Cell'
import './index.css'

/**
 * Componente-matriz del Tetris
 * @param {object} props Props
 * @param {Array<Array>} props.stage
 * @returns {JSX.Element} Retorna una matriz en display grid
 */
export default function Stage({ stage }) {
   return (
      <div
         className="stage-container"
         style={{
            gridTemplateRows: `repeat(${stage.length}, calc(25vw / ${stage[0].length}) )`,
            gridTemplateColumns: `repeat(${stage[0].length}, 1fr)`
         }}
      >
         {stage.map(row =>
            row.map((cell, i) => <Cell key={i} type={cell[0]} />)
         )}
      </div>
   )
}
