const addBox = document.querySelector('.add-box')
const popupBox = document.querySelector('.popup-box')
const popupTitle = popupBox.querySelector('header p')
const closeIcon = popupBox.querySelector('header i')
const titleTag = popupBox.querySelector('input')
const descTag = popupBox.querySelector('textarea')
const addBtn = popupBox.querySelector('button')
const colorTag = document.querySelector('#color')

const months = [
	'January',
	'February',
	'March',
	'April',
	'May',
	'June ',
	'July ',
	'August',
	'September',
	'October',
	'November',
	'December',
]
let notes = JSON.parse(localStorage.getItem('notes') || '[]')
let isUpdate = false,
	updateId

addBox.addEventListener('click', () => {
	titleTag.focus()
	popupBox.classList.add('show')
})

closeIcon.addEventListener('click', () => {
	isUpdate = false
	titleTag.value = ''
	descTag.value = ''
	colorTag.value = ''
	addBtn.innerText = 'Add Note'
	popupTitle.innerText = 'Add a new Note'
	popupBox.classList.remove('show')
})

function sortNotes() {
	let pin = []
	let noPin = []
	for (let i = notes.length - 1; i >= 0; i--) {
		if (notes[i].pin) {
			pin.push(notes[i])
		} else {
			noPin.push(notes[i])
		}
	}
	notes = [...pin, ...noPin]
}

function showNotes() {
	document.querySelectorAll('.note').forEach(note => note.remove())
	console.log(notes)
	sortNotes()
	notes.forEach((note, index) => {
		let liTag = `<li class="note ${note.color}">
                <div class="detalist">
                <p>${note.title}</p>
                <span>${note.description}</span>
                </div>
                <div class="bottom-content">
                <span>${note.date}</span>
                <div class="settings">
                    <i onclick='showMenu(this)' class="uil uil-ellipsis-h"></i>
                    <ul class="menu">
                    <li onclick="updateNote(${index}, '${note.title}', '${note.description}')"><i class="uil uil-pen"></i>Edit</li>
                    <li onclick='deleteNote(${index})'><i class="uil uil-trash"></i>Delete</li>
                    <li onclick="pinNote(${index})"><i class="uil uil-anchor"></i>Pin</li>
                    </ul>
                </div>
                </div>
            </li>`
		addBox.insertAdjacentHTML('afterend', liTag)
	})
}
showNotes()

function showMenu(elem) {
	elem.parentElement.classList.add('show')
	document.addEventListener('click', e => {
		if (e.target.tagName != 'I' || e.target != elem) {
			elem.parentElement.classList.remove('show')
		}
	})
}

function pinNote(noteId) {
	notes[noteId].pin = !notes[noteId].pin
	localStorage.setItem('notes', JSON.stringify(notes))
	showNotes()
}

function deleteNote(noteId) {
	let confirmDel = confirm('Are you sure you want to delete this note?')
	if (!confirmDel) return
	notes.splice(noteId, 1)
	localStorage.setItem('notes', JSON.stringify(notes))
	showNotes()
}

function updateNote(noteId, title, desc) {
	isUpdate = true
	updateId = noteId
	addBox.click()
	titleTag.value = title
	descTag.value = desc
	addBtn.innerText = 'Update Note'
	popupTitle.innerText = 'Update a Note'
	console.log(noteId, title, desc)
}

addBtn.addEventListener('click', e => {
	e.preventDefault()
	let noteTitle = titleTag.value
	let noteDesc = descTag.value
	let noteColor = colorTag.value

	if (noteTitle || noteDesc || noteColor) {
		let dateObj = new Date(),
			month = months[dateObj.getMonth()],
			day = dateObj.getDate(),
			year = dateObj.getFullYear(),
			time = dateObj.getHours(),
			minutes = dateObj.getMinutes()

		let noteInfo = {
			title: noteTitle,
			description: noteDesc,
			date: `${month} ${day} ${year}, ${time}:${minutes}`,
			color: noteColor,
			pin: false,
		}

		if (!isUpdate) {
			notes.push(noteInfo)
		} else {
			isUpdate = false
			notes[updateId] = noteInfo
		}
		localStorage.setItem('notes', JSON.stringify(notes))
		closeIcon.click()
		showNotes()
	}
})
