export default function checkCollision(player, stage, { x: moveX, y: moveY }) {
   for (let y = 0; y < player.tetrimonio.length; y++) {
      for (let x = 0; x < player.tetrimonio[0].length; x++) {
         // check that we're on a tetrimonio cell
         if (player.tetrimonio[y][x] !== 0) {
            // check that our move is inside the game areas height(y)
            // we shouldn't go throught the bottom of the play area
            if (
               !stage[y + player.pos.y + moveY] ||
               // check that our move is inside the game areas with (x)
               !stage[y + player.pos.y + moveY][x + player.pos.x + moveX] ||
               // check that the cell we're moving to isn't set toe clear
               stage[y + player.pos.y + moveY][x + player.pos.x + moveX][1] !==
                  'clear'
            ) {
               return true
            }
         }
      }
   }
}
