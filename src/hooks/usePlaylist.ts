import { useCallback, useMemo, useState } from 'react';

import Player, { Sound } from '../Player';

type isPlaying = (id: string) => boolean;
type play = (ids: string[], forceState?: boolean) => void;
type stop = (id: string) => void;
type stopAll = () => void;
type playAll = () => void;
type emptyPlaylist = () => void;

type usePlaylist = {
  playing: string[];
  isStopped: boolean;
  isPlaying: isPlaying;
  play: play;
  stop: stop;
  stopAll: stopAll;
  playAll: playAll;
  emptyPlaylist: emptyPlaylist;
  player: Player;
};

const usePlaylist = (sounds: Sound[]): usePlaylist => {
  const [stopped, setStopped] = useState<boolean>(true);
  const [playing, setPlaying] = useState<string[]>([]);

  const isStopped = useMemo<boolean>(
    () => stopped || playing.length <= 0,
    [stopped, playing],
  );

  const player = useMemo<Player>(() => new Player(sounds), []);

  const isPlaying = useCallback((id: string) => playing.indexOf(id) >= 0, [playing]);

  const play = useCallback(
    (ids: string[], forceState = false) => {
      setStopped(false);

      ids.forEach((id) => {
        if (!isPlaying(id)) {
          player.play(id);
        }
      });

      setPlaying(
        forceState
          ? ids
          : [...playing, ...ids].filter(
              (value, index, self) => self.indexOf(value) === index,
            ),
      );
    },
    [playing, isPlaying, player],
  );

  const stop = useCallback(
    (id: string) => {
      if (isPlaying(id)) {
        player.stop(id);
        setPlaying(playing.filter((itemId) => itemId !== id));
      }
    },
    [playing, isPlaying, player],
  );

  const stopAll = useCallback(() => {
    setStopped(true);

    player.stopAll();
  }, [player, playing]);

  const playAll = useCallback(() => {
    setStopped(false);

    playing.forEach((id) => {
      player.play(id);
    });
  }, [playing, player]);

  const emptyPlaylist = () => {
    setPlaying([]);
  };

  return {
    playing,
    isStopped,
    isPlaying,
    play,
    stop,
    stopAll,
    playAll,
    emptyPlaylist,
    player,
  };
};

export default usePlaylist;
