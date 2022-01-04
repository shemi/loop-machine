import bass from '../resources/bass.mp3';
import bass2 from '../resources/bass-2.mp3';
import fx from '../resources/fx.mp3';
import guitars from '../resources/guitars.mp3';
import hiHat from '../resources/hi-hat.mp3';
import kick from '../resources/kick.mp3';
import percussion from '../resources/percussion.mp3';
import percussion2 from '../resources/percussion-2.mp3';
import piano from '../resources/piano.mp3';
import { Sound } from './Player';

const fxLoop: Sound = {
  label: 'FX',
  id: 'fx',
  source: fx,
};

const bassLoop: Sound = {
  label: 'Bass',
  id: 'bass',
  source: bass,
};
const bass2Loop: Sound = {
  label: 'Bass 2',
  id: 'bass2',
  source: bass2,
};
const guitarsLoop: Sound = {
  label: 'Guitars',
  id: 'guitars',
  source: guitars,
};
const hiHatLoop: Sound = {
  label: 'Hi Hat',
  id: 'hiHat',
  source: hiHat,
};
const kickLoop: Sound = {
  label: 'Kick',
  id: 'kick',
  source: kick,
};
const percussionLoop: Sound = {
  label: 'Percussion',
  id: 'percussion',
  source: percussion,
};
const percussion2Loop: Sound = {
  label: 'Percussion 2',
  id: 'percussion2',
  source: percussion2,
};
const pianoLoop: Sound = {
  label: 'Piano',
  id: 'piano',
  source: piano,
};

export default [
  fxLoop,
  bassLoop,
  bass2Loop,
  guitarsLoop,
  hiHatLoop,
  kickLoop,
  percussionLoop,
  percussion2Loop,
  pianoLoop,
];
