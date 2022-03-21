import useStage from '../../hooks/useStage'
import { useState } from 'react'
import Display from '../Display'
import Stage from '../Stage'
import StartBtn from '../StartBtn'
import './index.css'
import usePlayer from '../../hooks/usePlayer'
import createStage from '../../helpers/createStage'
import checkCollision from '../../helpers/checkCollision'
import useInterval from '../../hooks/useInterval'

export default function Tetris() {
   const [dropTime, setDropTime] = useState(null)
   const [gameOver, setGameOver] = useState(false)
   const [player, updatePlayerPos, resetPlayer, playerRotate] = usePlayer()
   const [stage, setStage] = useStage(player, resetPlayer)

   const movePlayer = dir => {
      if (!checkCollision(player, stage, { x: dir, y: 0 })) {
         updatePlayerPos({ x: dir, y: 0 })
      }
   }
   const startGame = () => {
      // reset
      setStage(createStage())
      resetPlayer()
      setGameOver(false)
      setDropTime(1000)
   }
   const drop = () => {
      if (!checkCollision(player, stage, { x: 0, y: 1 })) {
         updatePlayerPos({ x: 0, y: 1, collided: false })
      } else {
         if (player.pos.y < 1) {
            console.log('game over')
            setGameOver(true)
            setDropTime(null)
         }
         updatePlayerPos({ x: 0, y: 0, collided: !false })
      }
   }
   const dropPlayer = () => {
      drop()
      setDropTime(null)
   }
   const move = ({ keyCode }) => {
      // console.log(keyCode)
      if (!gameOver) {
         if (keyCode === 37) {
            movePlayer(-1)
         } else if (keyCode === 39) {
            movePlayer(1)
         } else if (keyCode === 40) {
            dropPlayer()
            console.log('sadd')
         } else if (keyCode === 38) {
            playerRotate(stage, 1)
         }
      }
   }

   useInterval(drop, dropTime)

   return (
      <div
         className="tetris-container"
         role="button"
         tabIndex="0"
         onKeyDown={e => move(e)}
      >
         <main>
            <Stage stage={stage} />
            <aside>
               {gameOver ? (
                  <Display gameOver={gameOver} text="Game Over" />
               ) : (
                  <div>
                     <Display gameOver={gameOver} text="Score" />
                     <Display gameOver={gameOver} text="Rows" />
                     <Display gameOver={gameOver} text="Level" />
                  </div>
               )}

               <StartBtn onClick={startGame} />
            </aside>
         </main>
      </div>
   )
}
