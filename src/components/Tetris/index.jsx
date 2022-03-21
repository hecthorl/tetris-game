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
import useGameStatus from '../../hooks/useGameStatus'

export default function Tetris() {
   const [dropTime, setDropTime] = useState(null)
   const [gameOver, setGameOver] = useState(false)
   const [player, updatePlayerPos, resetPlayer, playerRotate] = usePlayer()
   const [stage, setStage, rowsCleared] = useStage(player, resetPlayer)
   const { level, rows, score, setLevel, setRows, setScore } =
      useGameStatus(rowsCleared)

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
      setScore(0)
      setLevel(0)
      setRows(0)
   }
   const drop = () => {
      if (rows > (level + 1) * 10) {
         setLevel(prev => prev + 1)
         setDropTime(1000 / (level + 1) + 200)
      }
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

   const keyUp = ({ keyCode }) => {
      if (gameOver) {
         if (keyCode === 40) setDropTime(1e3)
      }
   }

   const dropPlayer = () => {
      drop()
      // setDropTime(null)
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
         onKeyUp={keyUp}
      >
         <main>
            <Stage stage={stage} />
            <aside>
               {gameOver ? (
                  <Display gameOver={gameOver} text="Game Over" />
               ) : (
                  <div>
                     <Display gameOver={gameOver} text={`Level ${level}`} />
                     <Display gameOver={gameOver} text={`Score ${score}`} />
                     <Display gameOver={gameOver} text={`Rows ${rows}`} />
                  </div>
               )}

               <StartBtn onClick={startGame} />
            </aside>
         </main>
      </div>
   )
}
