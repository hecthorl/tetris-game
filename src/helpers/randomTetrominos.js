import { TETRIMINOS } from './tetrimonios'

export default function randomTetrominos() {
   const tetrominos = 'IJLOSTZ'
   const randTetro = tetrominos[Math.floor(Math.random() * tetrominos.length)]
   return TETRIMINOS[randTetro]
}
