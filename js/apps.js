/*document
	.getElementById("icon_settings")
	.addEventListener("click", () => document.getElementById("app_settings").classList.add("opened"))

document.getElementById("open_personal").addEventListener("click", () => {
	document.getElementById("app_personal").classList.add("opened")
})
document
	.getElementById("close_persolan")
	.addEventListener("click", () => document.getElementById("app_personal").classList.remove("opened"))

document.getElementById("open_about").addEventListener("click", () => document.getElementById("app_about").classList.add("opened"))
document.getElementById("close_about").addEventListener("click", () => document.getElementById("app_about").classList.remove("opened"))

document.getElementById("icon_calc").addEventListener("click", () => document.getElementById("app_calc").classList.add("opened"))

document.getElementById("icon_gallery").addEventListener("click", () => document.getElementById("app_gallery").classList.add("opened"))

document.getElementById("icon_clock").addEventListener("click", () => showHeadsUp("Clock app no implemented", 4))
document.getElementById("icon_terminal").addEventListener("click", () => {
	document.getElementById("app_terminal").classList.add("opened")
	//showHeadsUp("Terminal app no implemented", 4000)
})
document.getElementById("icon_music").addEventListener("click", () => showHeadsUp("Music app no implemented", 4))

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
			}, 1000)
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

document.getElementById("home_screen").addEventListener("click", () => {
	if (!finalizedTimeout) {
		document.getElementById("home_screen").classList.remove("config")
	}
})
*/

// Función genérica para abrir cualquier app
openApp = (appId) => {
	const appElement = document.getElementById(appId)
	if (appElement) {
		appElement.classList.add("opened")
	}
}

// Mapeo de eventos a la nueva función
document
	.getElementById("icon_settings")
	.addEventListener("click", () => openApp("app_settings"))

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

var timeoutOfHome = null
let finalizedTimeout = false
configHomeScreen = () => {
	// ... (El resto de la lógica de configHomeScreen se mantiene igual) ...
	onTouchStartHome = () => {
		if (!finalizedTimeout) {
			timeoutOfHome = setTimeout(() => {
				finalizedTimeout = true
				document.getElementById("home_screen").classList.add("config")
				setTimeout(() => {
					finalizedTimeout = false
				}, 50)
			}, 750) // Reducido a 750ms para una respuesta más rápida
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
		// Se añadió una comprobación para no cerrar si se está haciendo clic en un icono
		if (e.target.classList.contains("icon_home") || e.target.id === "home_screen") {
			document.getElementById("home_screen").classList.remove("config")
		}
	}
})
