import './App.css';

import React, { ReactNode, useCallback, useEffect } from 'react';

import Pad from './components/Pad';
import usePlaylist from './hooks/usePlaylist';
import useQueue from './hooks/useQueue';
import sounds from './sounds';

function App(): ReactNode {
  const {
    isStopped,
    isPlaying,
    stop,
    play,
    stopAll,
    playAll,
    emptyPlaylist,
    player,
    playing,
  } = usePlaylist(sounds);

  const { queue, isInQueue, addToQueue, removeFromQueue, emptyQueue } = useQueue();

  const handlePadClick = useCallback(
    (id: string) => {
      if (isStopped) {
        emptyPlaylist();
        emptyQueue();
        play([id], true);

        return;
      }

      if (isInQueue(id)) {
        removeFromQueue(id);
        return;
      }

      if (isPlaying(id)) {
        stop(id);

        if (queue.length > 0 && playing.length === 1 && playing.indexOf(id) === 0) {
          play(queue, true);
          emptyQueue();
        }
      } else {
        addToQueue(id);
      }
    },
    [
      isStopped,
      emptyPlaylist,
      play,
      stop,
      isPlaying,
      addToQueue,
      removeFromQueue,
      emptyQueue,
      playing,
      queue,
    ],
  );

  const handlePlayAllClick = useCallback(() => {
    if (!isStopped) {
      return;
    }

    emptyQueue();
    playAll();
  }, [emptyQueue, playAll, isStopped]);

  const handleLoopEnd = () => {
    play(queue);

    emptyQueue();
  };

  useEffect(() => {
    player.emitter.off('onEnd');
    player.emitter.on('onEnd', handleLoopEnd);
  }, [queue, play, playing]);

  const handleStopAllClick = useCallback(() => {
    if (isStopped) {
      return;
    }

    emptyQueue();
    stopAll();
  }, [emptyQueue, stopAll, isStopped]);

  return (
    <div className="App">
      <div className="controls">
        <button
          className="action-button action-button-play"
          disabled={!isStopped || playing.length <= 0}
          onClick={handlePlayAllClick}>
          Play
        </button>
        <button
          className="action-button action-button-stop"
          disabled={isStopped}
          onClick={handleStopAllClick}>
          Stop
        </button>
      </div>

      <div className="pads-container">
        <div className="pads">
          {sounds.map((sound) => (
            <Pad
              key={sound.id}
              isPlaying={isPlaying(sound.id)}
              isPending={isInQueue(sound.id)}
              isStopped={isPlaying(sound.id) && isStopped}
              label={sound.label}
              id={sound.id}
              onClick={handlePadClick}
            />
          ))}
        </div>
      </div>
    </div>
  );
}

export default App;
