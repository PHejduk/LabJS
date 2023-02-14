const record = document.querySelectorAll('.record')
const play = document.querySelectorAll('.play')

const KeyToSound = {
	a: document.querySelector('#s1'),
	s: document.querySelector('#s2'),
	d: document.querySelector('#s3'),
	f: document.querySelector('#s4'),
}

const ch1 = []
const ch2 = []
const ch3 = []
const ch4 = []

const mapChannel = {
	1: ch1,
	2: ch2,
	3: ch3,
	4: ch4,
}

function onKeyPress(event) {
	const sound = KeyToSound[event.key]
	playSound(sound)
}
function playSound(sound) {
	sound.currentTime = 0
	sound.play()
}

function startRecord(btn) {
	const id = btn.id.slice(-1)
	const rec = () => {
		document.querySelector('#btnStop').addEventListener('click', () => {
			document.removeEventListener('keypress', rec)
		})
		mapChannel[id].push({
			time: Date.now(),
			key: event.key,
		})
	}
	document.addEventListener('keypress', rec)
	console.log('a')
}

function startPlay(btn) {
	const ch = mapChannel[btn.id.slice(-1)]
	let time = 0
	for (let i = 0; i < ch.length; i++) {
		if (i > 0) {
			time += ch[i].time - ch[i - 1].time
		}
		setTimeout(function () {
			playSound(KeyToSound[ch[i].key])
		}, time)
	}
}

function playAll() {
	for (let i = 0; i < 4; i++) {
		startPlay(play[i])
	}
}

document.querySelector('#btnPlay').addEventListener('click', function () {
	playAll()
})
document.addEventListener('keypress', onKeyPress)

for (let i = 0; i < record.length; i++) {
	record[i].addEventListener('click', function () {
		startRecord(record[i])
	})
}

for (let i = 0; i < play.length; i++) {
	play[i].addEventListener('click', function () {
		startPlay(play[i])
	})
}
