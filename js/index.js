
// Creating an AudioContext instance for handling audio
const context = new AudioContext();
let oscillator;
let gain;

// Resuming the audio context to allow audio playback
context.resume();

// Importing JSON data from play example
// import tab from './ComeAsYouAre.json' assert { type: 'json' };

// Subscripts for representing musical notes in HTML
const subscripts = {
  '0': '₀',
  '1': '₁',
  '2': '₂',
  '3': '₃',
  '4': '₄',
  '5': '₅',
  '6': '₆',
  '7': '₇',
  '8': '₈',
  '9': '₉',
  '+': '₊',
  '-': '₋',
  '=': '₌',
  '(': '₍',
  ')': '₎',
  'a': 'ₐ',
  'e': 'ₑ',
  'o': 'ₒ',
  'x': 'ₓ',
  'ə': 'ₔ',
};

// Frequencies of musical notes
const frequencies = {
  'C': [
    16.35, 32.70, 65.41, 130.8, 261.6, 523.3, 1047.0, 2093.0, 4186.0
  ],
  'C♯': [
    17.32, 34.65, 69.30, 138.6, 277.2, 554.4, 1109, 2217, 4435
  ],
  'D': [
    18.35, 36.71, 73.42, 146.8, 293.7, 587.3, 1175, 2349, 4699
  ],
  'D♯': [
    19.45, 38.89, 77.78, 155.6, 311.1, 622.3, 1245, 2489, 4978
  ],
  'E': [
    20.60, 41.20, 82.41, 164.8, 329.6, 659.3, 1319, 2637, 5274
  ],
  'F':[
    21.83, 43.65, 87.31, 174.6, 349.2, 698.5, 1397, 2794, 5588
  ],
  'F♯': [
    23.12, 46.25, 92.50, 185.0, 370.0, 740.0, 1480, 2960, 5920
  ],
  'G': [
    24.50, 49.00, 98.00, 196.0, 392.0, 784.0, 1568, 3136, 6272
  ],
  'G♯': [
    25.96, 51.91, 103.8, 207.7, 415.3, 830.6, 1661, 3322, 6645
  ],
  'A': [
    27.5, 55.0, 110.0, 220.0, 440.0, 880.0, 1760.0, 3529.0, 7459.0
  ],
  'A♯': [
    29.14, 58.27, 116.5, 233.1, 466.2, 932.3, 1865, 3729, 7459
  ],
  'B': [
    30.87, 66.74, 123.5, 246.9, 493.9, 987.8, 1976.0, 3951.0, 7902.0
  ]
};

// Tuning configurations for different instruments and string counts
const tuning = {
  'Bass': {
    '4': {
      'Standard': [ 'E' , 'A', 'D', 'G' ],

      'Drop D':   [ 'D' , 'A' , 'D' , 'G'  ],
      'Drop C#':  [ 'C♯', 'G♯', 'C♯', 'F♯' ],
      'Drop C':   [ 'C' , 'G' , 'C' , 'F'  ],
      'Drop B':   [ 'B' , 'F♯', 'B' , 'E'  ],
      'Drop A#':  [ 'A♯', 'F♯', 'A♯', 'D♯' ],
      'Drop A':   [ 'A' , 'E' , 'A' , 'D'  ],

      '1 Down':   [ 'D♯', 'G♯', 'C♯', 'F♯' ],
      '2 Down':   [ 'D' , 'G' , 'C' , 'F'  ],
      '3 Down':   [ 'C♯', 'F♯', 'B' , 'E'  ],
      '4 Down':   [ 'C' , 'F' , 'A♯', 'D♯' ],
      '5 Down':   [ 'B' , 'E' , 'A' , 'D'  ],
      '6 Down':   [ 'A♯', 'D♯', 'G♯', 'C♯' ],
      '7 Down':   [ 'A' , 'D' , 'G' , 'C'  ],

      'Custom':   []
    },
    '5': {
      'Standard': [ 'B' , 'E', 'A', 'D', 'G' ],

      'Drop D':   [ 'A♯', 'D' , 'A' , 'D' , 'G'  ],
      'Drop C#':  [ 'A' , 'C♯', 'G♯', 'C♯', 'F♯' ],
      'Drop C':   [ 'G♯', 'C' , 'G' , 'C' , 'F'  ],
      'Drop B':   [ 'G' , 'B' , 'F♯', 'B' , 'E'  ],
      'Drop A#':  [ 'F♯', 'A♯', 'F♯', 'A♯', 'D♯' ],
      'Drop A':   [ 'F' , 'A' , 'E' , 'A' , 'D'  ],

      '1 Down':   [ 'A♯', 'D♯', 'G♯', 'C♯', 'F♯' ],
      '2 Down':   [ 'A' , 'D' , 'G' , 'C' , 'F'  ],
      '3 Down':   [ 'G♯', 'C♯', 'F♯', 'B' , 'E'  ],
      '4 Down':   [ 'G' , 'C' , 'F' , 'A♯', 'D♯' ],
      '5 Down':   [ 'F♯', 'B' , 'E' , 'A' , 'D'  ],
      '6 Down':   [ 'F' , 'A♯', 'D♯', 'G♯', 'C♯' ],
      '7 Down':   [ 'E' , 'A' , 'D' , 'G' , 'C'  ],
    },
    '6': {
      'Standard': [ 'B' , 'E', 'A', 'D', 'G', 'C' ],

      'Drop D':   [ 'A♯', 'D' , 'A' , 'D' , 'G' , 'B'  ],
      'Drop C#':  [ 'A' , 'C♯', 'G♯', 'C♯', 'F♯', 'A♯' ],
      'Drop C':   [ 'G♯', 'C' , 'G' , 'C' , 'F' , 'A'  ],
      'Drop B':   [ 'G' , 'B' , 'F♯', 'B' , 'E' , 'G♯' ],
      'Drop A#':  [ 'F♯', 'A♯', 'F♯', 'A♯', 'D♯', 'G'  ],
      'Drop A':   [ 'F' , 'A' , 'E' , 'A' , 'D' , 'F♯' ],

      '1 Down':   [ 'A♯', 'D♯', 'G♯', 'C♯', 'F♯', 'B'  ],
      '2 Down':   [ 'A' , 'D' , 'G' , 'C' , 'F' , 'A♯' ],
      '3 Down':   [ 'G♯', 'C♯', 'F♯', 'B' , 'E' , 'A'  ],
      '4 Down':   [ 'G' , 'C' , 'F' , 'A♯', 'D♯', 'G♯' ],
      '5 Down':   [ 'F♯', 'B' , 'E' , 'A' , 'D' , 'G'  ],
      '6 Down':   [ 'F' , 'A♯', 'D♯', 'G♯', 'C♯', 'F♯' ],
      '7 Down':   [ 'E' , 'A' , 'D' , 'G' , 'C' , 'F'  ],
    }
  },
  'Guitar': {
    '6': {
      'Standard': [ 'E', 'A', 'D', 'G', 'B', 'E' ],

      'Drop D':   [ 'D' , 'A' , 'D' , 'G' , 'B' , 'E'  ],
      'Drop C#':  [ 'C♯', 'G♯', 'C♯', 'F♯', 'A♯', 'D♯' ],
      'Drop C':   [ 'C' , 'G' , 'C' , 'F' , 'A' , 'D'  ],
      'Drop B':   [ 'B' , 'F♯', 'B' , 'E' , 'G♯', 'C♯' ],
      'Drop A#':  [ 'A♯', 'F' , 'A♯', 'D♯', 'G' , 'C'  ],
      'Drop A':   [ 'A' , 'E' , 'A' , 'D' , 'F♯', 'B'  ],
      'Drop G#':  [ 'G♯', 'D♯', 'G♯', 'C♯', 'F' , 'A♯' ],
      'Drop G':   [ 'G' , 'D' , 'G' , 'C' , 'F' , 'A'  ],
      'Drop F#':  [ 'F♯', 'C♯', 'F♯', 'B' , 'D♯', 'G♯' ],
      'Drop F':   [ 'F' , 'C' , 'F' , 'A♯', 'D' , 'G'  ],

      '1 Down':   [ 'D♯', 'G♯', 'C♯', 'F♯', 'A♯', 'D♯' ],
      '2 Down':   [ 'D' , 'G' , 'C' , 'F' , 'A' , 'D'  ],
      '3 Down':   [ 'C♯', 'F♯', 'B' , 'E' , 'G♯', 'C♯' ],
      '4 Down':   [ 'C' , 'F' , 'A♯', 'D♯', 'G' , 'C'  ],
      '5 Down':   [ 'B' , 'E' , 'A' , 'D' , 'F♯', 'B'  ],
      '6 Down':   [ 'A♯', 'D♯', 'G♯', 'C♯', 'F' , 'A♯' ],
      '7 Down':   [ 'A' , 'D' , 'G' , 'C' , 'E' , 'A'  ],
    },
    '7': {
      'Standard': [ 'A', 'E', 'A', 'D', 'G', 'B', 'E' ],

      'Drop D':   [ 'A' , 'D' , 'A' , 'D' , 'G' , 'B' , 'E'  ],
      'Drop C#':  [ 'G♯', 'C♯', 'G♯', 'C♯', 'F♯', 'A♯', 'D♯' ],
      'Drop C':   [ 'G' , 'C' , 'G' , 'C' , 'F' , 'A' , 'D'  ],
      'Drop B':   [ 'F♯', 'B' , 'F♯', 'B' , 'E' , 'G♯', 'C♯' ],
      'Drop A#':  [ 'F' , 'A♯', 'F' , 'A♯', 'D♯', 'G' , 'C'  ],
      'Drop A':   [ 'E' , 'A' , 'E' , 'A' , 'D' , 'F♯', 'B'  ],
      'Drop G#':  [ 'D♯', 'G♯', 'D♯', 'G♯', 'C♯', 'F' , 'A♯' ],
      'Drop G':   [ 'D' , 'G' , 'D' , 'G' , 'C' , 'F' , 'A'  ],
      'Drop F#':  [ 'C♯', 'F♯', 'C♯', 'F♯', 'B' , 'D♯', 'G♯' ],
      'Drop F':   [ 'C' , 'F' , 'C' , 'F' , 'A♯', 'D' , 'G'  ],

      '1 Down':   [ 'G♯', 'D♯', 'G♯', 'C♯', 'F♯', 'A♯', 'D♯' ],
      '2 Down':   [ 'G' , 'D' , 'G' , 'C' , 'F' , 'A' , 'D'  ],
      '3 Down':   [ 'F♯', 'C♯', 'F♯', 'B' , 'E' , 'G♯', 'C♯' ],
      '4 Down':   [ 'F' , 'C' , 'F' , 'A♯', 'D♯', 'G' , 'C'  ],
      '5 Down':   [ 'E' , 'B' , 'E' , 'A' , 'D' , 'F♯', 'B'  ],
      '6 Down':   [ 'D♯', 'A♯', 'D♯', 'G♯', 'C♯', 'F' , 'A♯' ],
      '7 Down':   [ 'D' , 'A' , 'D' , 'G' , 'C' , 'E' , 'A'  ],
    }
  }
};

// Array of musical note names
const notes = [
  'C', 'C♯', 'D', 'D♯', 'E', 'F', 'F♯', 'G', 'G♯', 'A', 'A♯', 'B'
];

// Colors associated with musical notes for visualization
const colors = {
  'C':  '#FF0000',
  'C♯': '#7F0000',
  'D':  '#FF7F00',
  'D♯': '#7F3D00',
  'E':  '#FFFF00',
  'F':  '#7FFF00',
  'F♯': '#3F7F00',
  'G':  '#00FF00',
  'G♯': '#007F00',
  'A':  '#00FF7F',
  'A♯': '#007F00',
  'B':  '#00FFFF'
};

// Mapping instrument abbreviations to their full names
const instruments = {
  'b': 'Bass',
  'g': 'Guitar'
};

// Points guide on fretboard
const points = [
  3, 5, 7, 9, 12, 15, 17, 19, 21, 24
];

// Octave configurations for different instruments and string counts
const octaves = {
  '4b': [ 1, 1, 2, 2 ],
  '5b': [ 0, 1, 1, 2, 2 ],
  '6b': [ 0, 1, 1, 2, 2, 3 ],

  '6g': [ 2, 2, 3, 3, 3, 4 ],
  '7g': [ 1, 2, 2, 3, 3, 3, 4 ],
};

// Total number of frets on the instrument (cannot be modified for now)
const fretCount = 24;

let animating = false; // Flag for animation state
document.getElementById('animate').addEventListener('click', () => {
  animating = !animating; // Toggling animation state when the button is clicked
  document.getElementById('animate').textContent = (animating ? 'Stop' : 'Animate');
});
let note = notes[0]; // Initial note for animation
let i = 0; // Index for animation sequence
setInterval(() => {
  if (animating){ // Interval function for animating notes
    document.getElementById('highlight-selector').value = note;
    document.getElementById('highlight').click();
    note = notes[(notes.indexOf(note) >= notes.length - 1 ? 0 : notes.indexOf(note) + 1)];
    i++;
    if (note == notes[0]) i = 0;
  };
}, 500);

// Play example tab
/*
let playing = false;
document.getElementById('play').addEventListener('click', async () => {
  playing = !playing; // Toggles playing
  document.getElementById('play').textContent = `${playing ? 'Stop' : 'Play'}`;
  if (playing) drawFrets(tab.info.tuning.split('').reverse(), `${tab.info.tuning.length}${reverseObj(instruments)[tab.info.instrument]}`);
  else highlightNote(-1, -1);
});
let j = 0;
setInterval(() => { // Play the notes one by one with delay (setTimeout not working)
  if (playing){
    let notes = [];
    for (let k = 0; k < tab.tabs[j].length; k++) if (!isNaN(parseInt(tab.tabs[j][k]))) notes.push(highlightNote(k, parseInt(tab.tabs[j][k])));
    j++;
    if (j == tab.tabs.length) j = 0;
  };
}, 60000 / tab.info.bpm);
*/
/**
 * Function to create a new HTML element with specified properties
 * @function
 * @param {String} type 
 * @param {ObjectConstructor} properties 
 * @returns {HTMLElement}
 */
function newElement(type, properties){
  let output = document.createElement(type);
  for (let key in properties) {
    output[key] = properties[key];
    if (typeof properties[key] == 'object' && properties[key] !== null){
      for (let key_ in properties[key]){
        output[key][key_] = properties[key][key_];
      };
    };
  };
  return output;
};

/**
 * Function to play a musical note
 * @function
 * @param {Number} frequency 
 * @param {String} type 
 * @returns {void}
 */
function playNote(frequency, type) {
  if (!type) type = 'triangle';
  oscillator = context.createOscillator(); // Creating and configuring an oscillator to play the specified note
  gain = context.createGain();
  oscillator.type = type;
  oscillator.connect(gain);
  oscillator.frequency.value = frequency;
  gain.connect(context.destination);
  oscillator.start(0);
  gain.gain.exponentialRampToValueAtTime(0.00001, context.currentTime + 1);
};

// Event listener for changes in the tuning selector
document.getElementById('tuning-selector').addEventListener('change', () => {
  if (!document.getElementById('tuning-selector').value) return;
  
  let value = document.getElementById('tuning-selector').value.split('-');
  let strings = [...tuning[instruments[value[0].substring(value[0].length - 1, value[0].length)]][value[0].substring(0, value[0].length - 1)][value[1]]].reverse();
  
  if (strings.length <= 0) return document.getElementById('custom-tuning').hidden = false;
  document.getElementById('custom-tuning').hidden = true;

  document.getElementById('highlighter').hidden = false;
  document.getElementById('animate').hidden = false;

  drawFrets(strings, value[0]);
});

// Event listener for generating custom tuning
document.getElementById('custom-tuning-generate').addEventListener('click', () => {
  let strings = [];
  for (let i = 0; i < 4; i++) strings.push(document.getElementById(`custom-tuning-${i}`).value);
  drawFrets([...strings].reverse(), '4b');
});

/**
 * Function to draw frets on the instrument visualization
 * @function
 * @param {String[]} strings 
 * @param {String} instrument 
 * @returns {void}
 */
function drawFrets(strings, instrument){
  while (document.getElementById('frets').firstChild) document.getElementById('frets').removeChild(document.getElementById('frets').firstChild);
  while (document.getElementById('fret-points').firstChild) document.getElementById('fret-points').removeChild(document.getElementById('fret-points').firstChild);
  
  for (let i = 0; i <= strings.length; i++){
    let fretLength = window.innerWidth * 1.5;
    let fretScale = 34;
    let currentOctaves = [...octaves[instrument]].reverse();

    for (let j = 0; j <= fretCount; j++){
      if (i == strings.length){
        document.getElementById('fret-points').appendChild(newElement('div', {
          className: (points.includes(j) ? 'fret-point' : 'fret-nopoint'),
          style: {
            width: `${fretLength / fretScale}px`
          }
        }));
      }
      else {
        let octave = currentOctaves[i];

        if (notes.indexOf(getNote(strings[i], j)) == notes.indexOf('B') && j > 0) currentOctaves[i]++;
        
        let fret = newElement('div', {
          className: `fret tooltip-trigger ${instruments[instrument.substring(instrument.length - 1, instrument.length)].toLowerCase()}` + (j == 0 ? ' first-fret' : (j >= fretCount ? ' last-fret' : ' middle-fret')),
          name: getNote(strings[i], j),
          id: `${strings[i]}${j}${subscripts[octave]}`,
          style: {
            width: `${fretLength / fretScale}px`,
            gridRow: `${i + 1}`,
            gridColumn: `${j + 1}`
          }
        });

        fret.appendChild(newElement('p', {
          textContent: `${getNote(strings[i], j)}`,
          className: 'fret-text'
        }))

        document.getElementById('frets').appendChild(fret);
      };
      fretLength -= fretLength / fretScale;
    };

    if (i !== strings.length) document.getElementById('frets').appendChild(newElement('br'));
  };

  for (let trigger of document.getElementsByClassName('tooltip-trigger')) {
    trigger.addEventListener('mousemove', event => {
      let el = document.getElementById('tooltip')
      if (el) el.remove();
      let tooltip = newElement('div', {
        style: {
          display: 'block',
          zIndex: 69,
          left: `${event.pageX + 15}px`,
          top: `${event.pageY + 15}px`
        },
        id: 'tooltip',
        textContent: trigger.id ? trigger.id : 'Not found.',
        className: 'tooltip'
      });
      trigger.appendChild(tooltip);
    });
    
    trigger.addEventListener('mouseout', () => {
      let el = document.getElementById('tooltip');
      if (el) el.remove();
    });
    trigger.addEventListener('click', () => {
      playNote(frequencies[trigger.textContent.replace(trigger.id, '')][reverseObj(subscripts)[trigger.id.substring(trigger.id.length - 1, trigger.id.length)]]);
    });
  };

  document.getElementById('highlight').addEventListener('click', () => {
    document.getElementById('highlight-selector').value;
    for (let fret of document.getElementById('frets').children){
      if (fret.nodeName != 'DIV') continue;
      if (fret.textContent == document.getElementById('highlight-selector').value) fret.children.item(0).style.color = colors[fret.children.item(0).textContent];
      else fret.children.item(0).style.color = '#999';
    };
  });
};

/**
 * Gets the corresponding note by string and fret
 * @function
 * @param {Number} string 
 * @param {Number} fret 
 * @returns {String}
 */
function getNote(string, fret){
  return notes[(fret + notes.indexOf(string)) % notes.length];
};

/**
 * Highlights a specific note on fretboard
 * @function
 * @param {Number} row 
 * @param {Number} column 
 * @returns {void}
 */
function highlightNote(column, row){
  let note = '';
  for (let fret of document.getElementById('frets').children){
    if (fret.style.gridArea != `${column + 1} / ${row + 1}`) {
      if (fret.children.length > 0) fret.children.item(0).style.color = '#999';
      continue;
    };
    fret.children.item(0).style.color = colors[fret.children.item(0).textContent];
    playNote(frequencies[fret.children.item(0).textContent][2]);
    note = fret.children.item(0).textContent;
  };
  return note;
};

// Event listener for toggling particle visualization
document.getElementById('particles-js-toggler').addEventListener('click', () => {
  document.getElementById('particles-js').hidden = !document.getElementById('particles-js').hidden;
  document.getElementById('particles-js-toggler').textContent = (document.getElementById('particles-js').hidden ? 'Show' : 'Hide') + ' particles';
});

/**
 * Function to reverse the keys and values of an object
 * @function
 * @param {ObjectConstructor} obj 
 * @returns {ObjectConstructor}
 */
function reverseObj(obj){
  return Object.fromEntries(Object.entries(obj).map(a => a.reverse()));
};
