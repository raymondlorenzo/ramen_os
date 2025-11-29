// RamenOS logic, ignore any typo
var cutoutStyle = localStorage.getItem("cutout")
var timeoutVar = null
var timerIslandVar = null
let bar_progress = 0

let loading_text_table = [
	"Turning on the flux capacitator",
	"The quick fox jumps over the lazy dog",
	"A phone with some limits",
	"Loading RSDK (Ramen Software Developer Kit)",
	"Loading RSDK (Ramen Software Developer Kit)",
	"Warming up Noodle Soup..."
]

const docElements = {
	hintsDialogue: document.getElementById("hints_dialogie"),
	hintsOK: document.getElementById("ok_butt"),
	screen: document.getElementById("screen"),
	blankscreen: document.getElementById("blankscreen"),
	camera: document.getElementById("camera"),
	popup: document.getElementById("popup"),
	statusBar: document.getElementById("status_bar"),
	statusClock: document.getElementById("status_clock"),
	lockScreen: document.getElementById("lock_screen"),
	lockClock: document.getElementById("clock_lock"),
	dateLock: document.getElementById("date_lock"),
	homeScreen: document.getElementById("home_screen"),
	permaBlurStrengthSlider: document.getElementById("blur_stren_slider"),
	permaBlurStrenghtValue: document.getElementById("ammo_blur"),
	appsOpacityStrengthSlider: document.getElementById("opa_slide"),
	appsOpacityStrengthValue: document.getElementById("opa_text"),
	wallpaperUploader: document.getElementById("wallpaper_uploader"),
	galleryButton: document.getElementById("button_gallery"),
	galleryImage: document.getElementById("gallery_image"),
	batteryLevel: document.getElementById("battery_level"),
	batteryText: document.getElementById("battery_text"),
	executeCommandButton: document.getElementById("exec_xo"),
	deleteCurrentCommandButton: document.getElementById("del_xo"),
	consoleInput: document.getElementById("console_inpit")
}

docElements.hintsOK.addEventListener("click", () => {
	docElements.hintsDialogue.style.opacity = "0"
	localStorage.setItem("seenHints", true)
	setTimeout(() => {
		docElements.hintsDialogue.style.display = "none"
	}, 255)
})

docElements.homeScreen.classList.add("hidden")
docElements.statusClock.style.opacity = "0"

hideStatusBar = () => {
	docElements.statusBar.classList.toggle("hidden")
}
changePhoneSizeX = (val) => {
	docElements.screen.style.width = `${val}px`
}
changePhoneSizeY = (val) => {
	if (val <= 300) {
		docElements.screen.style.height = `300px`
	} else {
		docElements.screen.style.height = `${val}px`
	}
}

let randomIndex = Math.floor(Math.random() * loading_text_table.length)
let randomText = loading_text_table[randomIndex]
document.getElementById("loa_txtt").textContent = randomText
simulate_loading = () => {
	bar_progress = 0
	document.getElementById("loa_under").style.width = "0%"

	loading_interval = setInterval(() => {
		bar_progress += 1.5
		
		document.getElementById("loa_under").style.width = `${bar_progress}%`

		if (bar_progress >= 100) {
			clearInterval(loading_interval)
			setTimeout(checkLoading, 300)
		}
	}, 55)
}
checkLoading = () => {
	document.getElementById("loa_scre").style.opacity = "0"
	document.getElementById("loa_scre").style.zIndex = "-1"
}
simulate_loading()

//lock logic
lockPhone = () => {
	docElements.homeScreen.classList.add("hidden")
	docElements.lockScreen.classList.remove("hidden")
	docElements.blankscreen.style.display = "flex"
}
docElements.homeScreen.addEventListener("dblclick", () => lockPhone())
docElements.lockScreen.addEventListener("dblclick", () => lockPhone())
docElements.blankscreen.addEventListener("dblclick", () => {
	docElements.blankscreen.style.display = "none"
})

//clocks logic
updateClocks = () => {
	var now = new Date()
	let [hour, min, sec] = [
		now.getHours().toString().padStart(2, "0"),
		now.getMinutes().toString().padStart(2, "0"),
		now.getSeconds().toString().padStart(2, "0")
	]
	let [month, day, year] = [
		(now.getMonth() + 1).toString().padStart(2, "0"),
		now.getDate().toString().padStart(2, "0"),
		now.getFullYear()
	]

	let nowTime = `${hour}:${min}`
	let nowTimeAlt = `${hour}:${min}:${sec}`
	let nowDate = `${month}-${day} ${year}`

	docElements.lockClock.textContent = nowTime
	docElements.statusClock.textContent = nowTime
	docElements.dateLock.textContent = nowDate
}
setInterval(updateClocks, 1000)
updateClocks()

//data save logix
window.addEventListener("load", () => {
	let str1 = localStorage.getItem("blur_strength")
	if (str1) {
		document.documentElement.style.setProperty("--perma-blur-fx-strength", str1 + "px")
		docElements.permaBlurStrengthSlider.value = str1
		docElements.permaBlurStrenghtValue.textContent = "x" + str1 / 1.5
	}

	let str2 = localStorage.getItem("opa_amm")
	if (str2) {
		if (str2 >= 0.875) {
			docElements.permaBlurStrengthSlider.disabled = true
		} else {
			docElements.permaBlurStrengthSlider.disabled = false
		}
		document.documentElement.style.setProperty("--opacity-window", str2)
		docElements.appsOpacityStrengthSlider.value = str2
		docElements.appsOpacityStrengthValue.textContent = str2
	}

	let savedBackground = localStorage.getItem("fondo")
	if (savedBackground) setWallpaper(savedBackground)

	if (cutoutStyle) {
		if (cutoutStyle === "island") {
			islandCutout()
		} else if (cutoutStyle === "drop") {
			dropCutout()
		}
	}

	let seenHints = localStorage.getItem("seenHints")
	if (seenHints) {
		docElements.hintsDialogue.style.display = "none"
	} else {
		docElements.hintsDialogue.style.display = "flex"
		docElements.hintsDialogue.style.opacity = "1"
	}
})

//wallpaper logic
function changeWallpaper(element) {
	const imageSource = element.src
	setWallpaper(imageSource)
	docElements.wallpaperUploader.value = ""
}
setWallpaper = (element) => {
	docElements.screen.style.backgroundImage = `url(${element})`
	docElements.galleryImage.src = element
	localStorage.setItem("fondo", element)
}

//gallery logic
docElements.galleryButton.addEventListener("click", () => window.open(docElements.galleryImage.src))

//upload func logic
docElements.wallpaperUploader.addEventListener("change", function () {
	let file = this.files[0]
	if (!file) return

	const reader = new FileReader()
	reader.onload = function (e) {
		let dataURL = e.target.result
		setWallpaper(dataURL)
	}
	reader.readAsDataURL(file)
})

//battery indicator logic
navigator.getBattery().then((battery) => {
	updateBatteryStatus = () => {
		const level = Math.floor(battery.level * 100)
		docElements.batteryLevel.style.width = `${level}%`
		if (battery.charging) {
			docElements.batteryLevel.style.background = "#50F3A5"
		} else {
			if (level <= 15) {
				docElements.batteryLevel.style.background = "#F00"
			} else if (level <= 50) {
				docElements.batteryLevel.style.background = "#FF0"
			} else {
				docElements.batteryLevel.style.background = "#FFFFFF"
			}
		}
		if (level === 20 || level === 15 || level === 5 || level === 1) {
			showHeadsUp("Low battery", 5)
		}
		//batteryLevel.style.background = `${battery.charging ? "#50F3A5" : "#FFFFFF"}`
		docElements.batteryText.textContent = `${battery.charging ? "⚡" : ""}${level}%`
	}

	updateBatteryStatus()

	battery.addEventListener("levelchange", updateBatteryStatus)
	battery.addEventListener("chargingchange", updateBatteryStatus)
})

//blur slider slider
docElements.permaBlurStrengthSlider.addEventListener("input", () => {
	document.documentElement.style.setProperty("--perma-blur-fx-strength", docElements.permaBlurStrengthSlider.value + "px")
	document.getElementById("ammo_blur").textContent = "x" + docElements.permaBlurStrengthSlider.value / 1.5
	localStorage.setItem("blur_strength", docElements.permaBlurStrengthSlider.value)
})

// opacity slider logic
docElements.appsOpacityStrengthSlider.addEventListener("input", () => {
	if (docElements.appsOpacityStrengthSlider.value >= 0.875) {
		docElements.permaBlurStrengthSlider.disabled = true
	} else {
		docElements.permaBlurStrengthSlider.disabled = false
	}
	document.documentElement.style.setProperty("--opacity-window", docElements.appsOpacityStrengthSlider.value)
	document.getElementById("opa_text").textContent = docElements.appsOpacityStrengthSlider.value
	localStorage.setItem("opa_amm", docElements.appsOpacityStrengthSlider.value)
})
let easter_egg_countwr = 0
document.getElementById("easter_egg_thing").addEventListener("click", () => {
	easter_egg_countwr++
	if (easter_egg_countwr > 6) {
		easter_egg_countwr = 0
	}
})

// cam cutouts logic
var cutoutString = ""
var showingMessage = false
islandCutout = () => {
	if (!showingMessage) {
		//docElements.camera.style.transition = "all 0.4s cubic-bezier(0.68, -0.55, 0.265, 1.55)"
		docElements.camera.style.top = "2px"
		docElements.camera.style.borderTopLeftRadius = "20px"
		docElements.camera.style.borderTopRightRadius = "20px"
		docElements.camera.style.borderBottomLeftRadius = "20px"
		docElements.camera.style.borderBottomRightRadius = "20px"
		docElements.camera.style.width = "100px"
		docElements.camera.style.height = "24.5px"
		localStorage.setItem("cutout", "island")
		cutoutString = "island"
	}
}
dropCutout = () => {
	if (!showingMessage) {
		//docElements.camera.style.transition = "all 0.4s cubic-bezier(0.68, -0.55, 0.265, 1.55)"
		docElements.camera.style.top = "4px"
		docElements.camera.style.borderTopLeftRadius = "12px"
		docElements.camera.style.borderTopRightRadius = "12px"
		docElements.camera.style.borderBottomLeftRadius = "12px"
		docElements.camera.style.borderBottomRightRadius = "12px"
		docElements.camera.style.width = "21px"
		docElements.camera.style.height = "21px"
		localStorage.setItem("cutout", "drop")
		cutoutString = "drop"
	}
}

//helper func
checkCutoutStyle = () => {
	if (cutoutString === "island") {
		return "iphone"
	} else {
		return "android"
	}
}
setInterval(checkCutoutStyle, 75)

//notification logic
showHeadsUp = (message, duration) => {
	clearTimeout(timeoutVar)

	if (checkCutoutStyle() === "iphone") {
		clearTimeout(timerIslandVar)
		docElements.camera.textContent = message
		docElements.statusBar.style.scale = "175% 100%"
		docElements.camera.style.width = "97.5%"
		docElements.camera.style.height = "60px"
		docElements.camera.style.borderTopLeftRadius = "calc(var(--border-rad-sys) - 4px)"
		docElements.camera.style.borderTopRightRadius = "calc(var(--border-rad-sys) - 4px)"
		docElements.camera.style.borderBottomLeftRadius = "calc(var(--border-rad-sys) - 4px)"
		docElements.camera.style.borderBottomRightRadius = "calc(var(--border-rad-sys) - 4px)"
		docElements.camera.style.color = "whitesmoke"
		showingMessage = true
		timerIslandVar = setTimeout(() => {
			docElements.camera.style.color = "#000"
			docElements.statusBar.style.scale = "100% 100%"
			showingMessage = false
			islandCutout()
			setTimeout(() => {
				docElements.camera.textContent = ""
			}, 100)
		}, duration * 1000)
	} else {
		docElements.popup.style.top = "40px"
		docElements.popup.textContent = message
		showingMessage = true
		timeoutVar = setTimeout(() => {
			docElements.popup.style.top = "-40%"
			docElements.popup.textContent = ""
			showingMessage = false
		}, duration * 1000)
	}
	return "Successful"
}
docElements.popup.addEventListener("click", () => {
	clearTimeout(timeoutVar)
	docElements.popup.style.top = "-40%"
	docElements.popup.textContent = ""
	showingMessage = false
})

//command logic
docElements.executeCommandButton.addEventListener("click", (e) => {
	e.preventDefault()
	executeCommand(docElements.consoleInput.value.trim())
})
docElements.deleteCurrentCommandButton.addEventListener("click", () => {
	docElements.consoleInput.value = ""
})
executeCommand = (commandSet) => {
	try {
		setTimeout(commandSet, 5)
	} catch (e) {}
}
