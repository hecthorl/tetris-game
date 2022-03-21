import { STAGE_HEIGHT, STAGE_WIDTH } from './constants'

export default function createStage() {
   return Array.from(Array(STAGE_HEIGHT), () =>
      new Array(STAGE_WIDTH).fill([0, 'clear'])
   )
}
