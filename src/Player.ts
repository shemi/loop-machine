import { Howl } from 'howler';
import mitt, { Emitter } from 'mitt';

export interface Sound {
  id: string;
  label: string;
  source: string;
}

interface Players {
  [id: string]: Howl;
}

type Events = {
  onEnd: void;
};

class Player {
  protected players: Players = {};

  protected runningPlayer: Howl;

  public emitter: Emitter<Events> = mitt<Events>();

  constructor(sounds: Sound[]) {
    for (const sound of sounds) {
      this.players[sound.id] = new Howl({
        src: [sound.source],
        autoplay: false,
        loop: true,
      });
    }

    this.runningPlayer = new Howl({
      src: [sounds[0].source],
      autoplay: false,
      loop: true,
      mute: true,
      onend: () => this.emitter.emit<'onEnd'>('onEnd'),
    });
  }

  find(id: string): Howl {
    if (!this.players[id]) {
      throw Error(`Player with the ID ${id} not found`);
    }

    return this.players[id];
  }

  play(id: string): void {
    const player = this.find(id);

    if (!this.runningPlayer.playing()) {
      this.runningPlayer.play();
    }

    player.play();
  }

  stop(id: string): void {
    const player = this.find(id);

    player.stop();

    if (this.isAllStopped()) {
      this.runningPlayer.stop();
    }
  }

  isAllStopped(): boolean {
    return Object.values(this.players)
      .map((player) => player.playing())
      .every((isPLaying) => !isPLaying);
  }

  stopAll(): void {
    this.runningPlayer.stop();

    for (const player of Object.values(this.players)) {
      player.stop();
    }
  }
}

export default Player;
