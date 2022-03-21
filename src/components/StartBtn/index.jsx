import './index.css'

export default function StartBtn({ onClick }) {
   return (
      <button onClick={onClick} className="start-btn">
         Start Game
      </button>
   )
}
