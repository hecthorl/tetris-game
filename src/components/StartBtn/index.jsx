import './index.css'

export default function StartBtn({ onClick, children }) {
   return (
      <button onClick={onClick} className="start-btn">
         {children}
      </button>
   )
}
