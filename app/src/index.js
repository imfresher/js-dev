import { version } from '../package.json';
import Player from './player';

function xmedia(id, options = {}) {
  let player = xmedia.getPlayer(id);

  if (player) {
    player.ready();
  }

  const el = document.getElementById(id);

  player = new Player(el, options);

  console.log(Player.players);

  return player;
}

xmedia.VERSION = version;

xmedia.getPlayer = (id) => {
  const players = Player.players;
  const player = players[id];

  return player;
};

export default xmedia;
