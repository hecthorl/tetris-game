import { memo } from 'react'
import { TETRIMINOS } from '../../helpers/tetrimonios'

export default memo(function Cell({ type }) {
   return (
      <div
         style={{
            backgroundColor: `rgba(${TETRIMINOS[type].color}, 0.8)`,
            border: `${type === 0 ? '0 solid' : '4px solid'}`,
            borderBottomColor: `rgba(${TETRIMINOS[type].color}, 0.1)`,
            borderRightColor: `rgba(${TETRIMINOS[type].color}, 1)`,
            borderTopColor: `rgba(${TETRIMINOS[type].color}, 1)`,
            borderLeftColor: `rgba(${TETRIMINOS[type].color}, 0.3)`
         }}
      />
   )
})
