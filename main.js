const hrField = document.querySelector('#hr')
const minField = document.querySelector('#min')
const secField = document.querySelector('#sec')
let hr = 0
let min = 0
let sec = 0
let started = false
let interval

const startPauseButton = document.querySelector('#startPauseButton')
const resetButton = document.querySelector('#resetButton')

// this function is called whenever the time expires
const alarm = async function () {
	resetButton.disabled = false

	// play the alarm tone
	const tone = new Audio('bruh.mp3')
	await tone.play()
	reset()
	alert('It is time.')
}

// this function resets the timer
const reset = function () {
	hrField.value = '00'
	minField.value = '00'
	secField.value = '00'
	started = false
	startPauseButton.innerText = 'Start'
	clearInterval(interval)
}

// this function starts the timer
const start = function () {	
	startPauseButton.innerText = 'Pause'
	hr = hrField.value
	min = minField.value
	sec = secField.value

	// disable the reset button while the timer is running
	resetButton.disabled = true

	started = true
	interval = setInterval(function(){
		tickTimer()
	}, 1000)
}

// this function pauses the timer
const pause = function () {	
	startPauseButton.innerText = 'Start'
	resetButton.disabled = false
	started = false
	clearInterval(interval)
}

// if the timer is running, this function calls pause() function,
// if not, it calls start() function
const startPauseTimer = function () {
	if(!started){
		start()
		return
	}

	pause()
}

const tickTimer = function () {

	// Timer expires if time left is 1 sec or less because this function
	// is called with a 1 second delay because of setInterval function
	if(sec < 2){
		if(min == 0){
			if(hr == 0){
				secField.value = '00'
				clearInterval(interval)
				alarm()
				return				
			}
			else{
				hr --
				min = 59	
				sec = 59			
			}
		}
		else{
			min --
			sec = 59			
		}
	}
	else{
		sec --
	}

	let showHr = hr
	let showMin = min
	let showSec = sec

	if(showSec < 10){
		showSec = '0' + showSec
	}
	if(showMin < 10 && showMin.length != 2){
		showMin = '0' + showMin
	}
	if(showHr < 10 && showHr.length != 2){
		showHr = '0' + showHr
	}

	hrField.value = showHr
	minField.value = showMin
	secField.value = showSec
}