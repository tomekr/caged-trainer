// Global state (baaaad 8/)
const notes          = ["C", "A", "G", "E", "D"];
let currentNoteIndex = 0;
let currentNote      = notes[currentNoteIndex];
let bpm              = 30;
let running          = false;
let currentTrainingSet = {};
let arpeggios    = true;
let partialForms = true;
let fullForms    = true;

const currentInterval = (bpmIn) => {
  return ((60 / bpmIn) * 1000);
};

let timer =  setInterval(tick, currentInterval(bpm));


$( document ).ready(function() {
    init();
});

function init() {
	$('#bpmInput').val(bpm);

	// Checkboxes
	const cageBox 	      = $("#cage-box");
	const fullFormsBox 	  = $("#full-forms");
	const partialFormsBox = $("#partial-forms");

  const currentImageElement = $("#currentImage");

	// Nicolas Cage image
	const cageImg = $("#cage");
	cageImg.hide();

  $('#stopButton').hide();
	cageBox.on("click", function(){
		if (cageImg.is(':hidden')) {
			cageImg.show();
		} else {
			cageImg.hide();
		}
	});

  refreshCurrentTrainingSet();
}

function randomElement(items) {
  return items[Math.floor(Math.random()*items.length)];
}

function nextNoteIndex() {
  if (currentNoteIndex === (notes.length - 1)) {
    return 0;
  } else {
    return currentNoteIndex + 1;
  }
}

function tick() {
  if (running != true) {
    return;
  }

  currentNoteIndex = nextNoteIndex();
  currentNote = notes[currentNoteIndex];

  const imgSrc = "images/" + randomElement(currentTrainingSet[currentNote]);
  console.log(imgSrc);
  $('#chordImage')[0].src = imgSrc;
  $('#currentNoteHeading').html(currentNote);
}

function refreshCurrentTrainingSet() {
  for (const note of notes) {
    let images = []
    if (arpeggios) {
      mappings[note].arpeggios.forEach(img => {images.push(img)});
    }

    if (partialForms) {
      mappings[note].partials.forEach(img => {images.push(img)});
    }

    if (fullForms) {
      mappings[note].chords.forEach(img => {images.push(img)});
    }

    currentTrainingSet[note] = images;
  }
  console.log(currentTrainingSet);
}

function setBPM() {
	bpm = $('#bpmInput').val();
	console.log("BPM is now: " + bpm);
  clearInterval(timer);
  timer = setInterval(tick, currentInterval(bpm));
  $('#currentBpmLabel').html("Current BPM: " + bpm);
}

function startTraining() {
  running = true;
  $('#startButton').hide();
  $('#stopButton').show();
}

function stopTraining() {
  running = false;
  $('#stopButton').hide();
  $('#startButton').show();
}

// Don't look below this line!!!!!

const mappings = {
  "C": {
    "arpeggios": [
      "C/\"C form\" Arpeggio Pattern.png"
    ],
    "chords": [
      "C/D (\"C form\" barre chord).png",
      "C/E (\"C form\" barre chord).png",
      "C/F (\"C form\" barre chord).png",
      "C/G (\"C form\" barre chord).png"
    ],
    "partials": [
      "C/\"Hole Hearted\" D (partial \"C form\").png",
      "C/\"Jack and Diane\" D (partial \"C form\").png",
      "C/\"Stairway to Heaven\" D (partial \"C form\").png"
    ]
  },
  "A": {
    "arpeggios": [
      "A/\"A form\" Arpeggio Pattern.png"
    ],
    "chords": [
      "A/B (\"A form\" barre chord).png",
      "A/C (\"A form\" barre chord).png",
      "A/D (\"A form\" barre chord).png"
    ],
    "partials": [
      "A/\"Cold Gin\" D (partial \"A form\").png",
      "A/\"Cult of Personality\" (partial \"A form\").png",
      "A/\"Daughters\" D (partial \"A form\").png",
      "A/\"Power Chord\" C (partial \"A\" form).png",
      "A/\"Scar Tissue\" E (partial \"A form\").png",
      "A/\"Stairway to Heaven\" C (partial \"A form\").png",
      "A/\"The Wind Cries Marty\" E5 (partial \"A form\").png"
    ]
  },
  "G": {
    "arpeggios": [
      "G/ A Arpeggio (\"G form\").png"
    ],
    "chords": [
      "G/A (\"G form\" barre chord).png"
    ],
    "partials": [
      "G/\"Fade to Black\" A (partial \"G form\").png",
      "G/\"Landslide\" G:B (partial \"G form\").png",
      "G/\"Stairway to Heaven\" C (partial \"G form\").png",
      "G/\"The Wind Cries Mary\" F (partial \"G form\").png"
    ]
  },
  "E": {
    "arpeggios": [
      "E/G Arpeggio (\"E form\").png"
    ],
    "chords": [
      "E/F (\"E form\" barre chord).png"
    ],
    "partials": [
      "E/\"Gloria\" E (partial \"E form\").png",
      "E/\"Johnny B. Goode\" Bb (partial \"E form\").png",
      "E/\"Never Let You Go\" B (partial \"E form\").png",
      "E/\"Tripping Billies\" G (partial \"E form\").png",
      "E/F (partial \"E form\").png"
    ]
  },
  "D": {
    "arpeggios": [
      "D/E Arpeggio (\"D form\").png"
    ],
    "chords": [
      "D/E (\"D form\" barre chord).png"
    ],
    "partials": [
      "D/\"All the Small Things\" F (partial \"D form\").png",
      "D/\"Jack and Diane\" E (partial \"D form\".png",
      "D/\"Tears in Heaven\" E partial \"D form\".png"
    ]
  }
}
