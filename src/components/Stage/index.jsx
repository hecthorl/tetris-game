import Cell from '../Cell'
import './index.css'

export default function Stage({ stage = [] }) {
   return (
      <div
         className="stage-container"
         style={{
            gridTemplateRows: `repeat(${stage.length}, calc(25vw / ${stage[0].length}) )`,
            gridTemplateColumns: `repeat(${stage[0].length}, 1fr)`
         }}
      >
         {stage.map(row =>
            row.map((cell, x) => <Cell key={x} type={cell[0]} />)
         )}
      </div>
   )
}
