import { useState, useCallback } from 'react'
import checkCollision from '../helpers/checkCollision'
import { STAGE_WIDTH } from '../helpers/constants'
import randomTetrominos from '../helpers/randomTetrominos'

const initial = {
   pos: { x: 0, y: 0 },
   tetrimonio: randomTetrominos().shape,
   collided: false
}

export default function usePlayer() {
   const [player, setPlayer] = useState(initial)

   const updatePlayerPos = ({ x, y, collided }) => {
      setPlayer(prev => ({
         ...prev,
         pos: {
            x: (prev.pos.x += x),
            y: (prev.pos.y += y)
         },
         collided
      }))
   }

   const rotate = (matrix, dir) => {
      // make the rows to become colls
      const rotatedTetro = matrix.map((_, i) => matrix.map(coll => coll[i]))
      // reverse each row to get a rotated matrix
      if (dir > 0) return rotatedTetro.map(row => row.reverse())
      return rotatedTetro.reverse()
   }

   const playerRotate = (stage, dir) => {
      const clonedPlayer = JSON.parse(JSON.stringify(player))
      clonedPlayer.tetrimonio = rotate(clonedPlayer.tetrimonio, dir)

      const pos = clonedPlayer.pos.x
      let offSet = 1

      while (checkCollision(clonedPlayer, stage, { x: 0, y: 0 })) {
         clonedPlayer.pos.x += offSet
         offSet = -(offSet + (offSet > 0 ? 1 : -1))
         if (offSet > clonedPlayer.tetrimonio[0].length) {
            rotate(clonedPlayer, -dir)
            clonedPlayer.pos.x = pos
            return
         }
      }

      setPlayer(clonedPlayer)
   }

   const resetPlayer = useCallback(() => {
      setPlayer({
         pos: { x: STAGE_WIDTH / 2 - 2, y: 0 },
         tetrimonio: randomTetrominos().shape,
         collided: false
      })
   }, [])

   return [player, updatePlayerPos, resetPlayer, playerRotate]
}
