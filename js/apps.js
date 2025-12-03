openApp = (appId) => {
	const appElement = document.getElementById(appId)
	if (appElement) {
		appElement.classList.add("opened")
	}
}

document.getElementById("icon_settings").addEventListener("click", () => openApp("app_settings"))

document.getElementById("open_personal").addEventListener("click", () => {
	openApp("app_personal")
})
document
	.getElementById("close_persolan")
	.addEventListener("click", () => document.getElementById("app_personal").classList.remove("opened"))

document.getElementById("open_about").addEventListener("click", () => openApp("app_about"))
document.getElementById("close_about").addEventListener("click", () => document.getElementById("app_about").classList.remove("opened"))

document.getElementById("icon_calc").addEventListener("click", () => openApp("app_calc"))

document.getElementById("icon_gallery").addEventListener("click", () => openApp("app_gallery"))

document.getElementById("icon_clock").addEventListener("click", () => showHeadsUp("Clock app no implemented", 4))
document.getElementById("icon_terminal").addEventListener("click", () => {
	openApp("app_terminal")
})
document.getElementById("icon_music").addEventListener("click", () => showHeadsUp("Music app no implemented", 4))
document.getElementById("icon_notes").addEventListener("click", () => showHeadsUp("Notes app no implemented", 4))
document.getElementById("icon_files").addEventListener("click", () => showHeadsUp("Files app no implemented", 4))
document.getElementById("icon_store").addEventListener("click", () => showHeadsUp("App Store no implemented", 4))
document.getElementById("icon_messages").addEventListener("click", () => showHeadsUp("Messages app no implemented", 4))

var timeoutOfHome = null
let finalizedTimeout = false
configHomeScreen = () => {
	onTouchStartHome = () => {
		if (!finalizedTimeout) {
			timeoutOfHome = setTimeout(() => {
				finalizedTimeout = true
				document.getElementById("home_screen").classList.add("config")
				setTimeout(() => {
					finalizedTimeout = false
				}, 50)
			}, 750)
		}
	}
	onTouchEndHome = () => {
		if (!finalizedTimeout) {
			clearTimeout(timeoutOfHome)
		}
	}

	document.getElementById("home_screen").addEventListener("touchstart", onTouchStartHome)
	document.getElementById("home_screen").addEventListener("mousedown", onTouchStartHome)
	document.getElementById("home_screen").addEventListener("touchend", onTouchEndHome)
	document.getElementById("home_screen").addEventListener("mouseup", onTouchEndHome)
}
configHomeScreen()

document.getElementById("home_screen").addEventListener("click", (e) => {
	if (!finalizedTimeout) {
		if (e.target.classList.contains("icon_home") || e.target.id === "home_screen") {
			document.getElementById("home_screen").classList.remove("config")
		}
	}
})
