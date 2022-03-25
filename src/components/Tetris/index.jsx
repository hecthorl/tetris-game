import useStage from '../../hooks/useStage'
import { useState, useRef } from 'react'
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
   const [pause, setPause] = useState(false)
   const [player, updatePlayerPos, resetPlayer, playerRotate] = usePlayer()
   const [stage, setStage, rowsCleared] = useStage(player, resetPlayer)
   const { level, rows, score, setLevel, setRows, setScore } =
      useGameStatus(rowsCleared)
   const timeRef = useRef(dropTime)

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
   timeRef.current = dropTime
   const pauseGame = () => {
      // setDropTime(pause ? null : timeRef.current)
      console.log(timeRef.current)
      setPause(prev => !prev)
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
      if (keyCode === 40 && gameOver) setDropTime(1e3)
   }

   const dropPlayer = () => {
      drop()
      // setDropTime(null)
   }
   const move = ({ keyCode }) => {
      // console.log(keyCode)
      if (gameOver) return

      try {
         const KEY_CODES = {
            37: () => movePlayer(-1),
            39: () => movePlayer(1),
            38: () => playerRotate(stage, 1),
            40: () => dropPlayer()
         }
         KEY_CODES[keyCode]()
      } catch (err) {
         // console.log(error)
      }
   }
   // console.log({ dropTime })
   useInterval(drop, pause ? null : dropTime)

   return (
      <div
         className="tetris-container"
         role="button"
         tabIndex="0"
         onKeyDown={pause ? () => {} : move}
         onKeyUp={keyUp}
      >
         <main>
            <Stage stage={stage} />
            <aside>
               {gameOver ? (
                  <>
                     <Display gameOver={gameOver} text="Game Over" />
                     <Display
                        gameOver={gameOver}
                        text={`Final Score ${score}`}
                     />
                  </>
               ) : (
                  <div>
                     <Display gameOver={gameOver} text={`Level ${level}`} />
                     <Display gameOver={gameOver} text={`Score ${score}`} />
                     <Display gameOver={gameOver} text={`Rows ${rows}`} />
                  </div>
               )}
               <button onClick={pauseGame}>Pause</button>
               <StartBtn onClick={startGame}>Start Game</StartBtn>
            </aside>
         </main>
      </div>
   )
}
