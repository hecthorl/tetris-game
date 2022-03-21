import './index.css'

export default function Display({ gameOver, text = '' }) {
   return (
      <div
         style={{
            color: `${gameOver ? 'red' : 'white'}`
         }}
         className="display-container"
      >
         {text}
      </div>
   )
}
