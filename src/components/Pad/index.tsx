import './style.css';

import classNames from 'classnames';
import React, { ReactNode, useCallback } from 'react';

interface PadProps {
  isPlaying: boolean;
  isPending: boolean;
  isStopped: boolean;
  label: string;
  id: string;
  onClick: (id: string) => void;
}

function Pad({
  isPlaying,
  isPending,
  isStopped,
  label,
  id,
  onClick,
}: PadProps): ReactNode {
  const handlePadClick = useCallback(() => {
    if (onClick) {
      onClick(id);
    }
  }, [id, onClick]);

  return (
    <button
      className={classNames('pad', {
        'is-playing': isPlaying,
        'is-pending': isPending,
        'is-stopped': isStopped,
      })}
      onClick={handlePadClick}>
      <p className="label">{label}</p>
      <span className="indicator" />
    </button>
  );
}

export default Pad;
