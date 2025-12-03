function enableSwipeToClose(element) {
	let startY = 0

	let onTouchStart = (e) => {
		document.getElementById("nav_handle").style.bottom = `8px`
		startY = e.touches ? e.touches[0].clientY : e.clientY
	}
	let onTouchEnd = (e) => {
		document.getElementById("nav_handle").style.bottom = `4.5px`
		let endY = e.changedTouches ? e.changedTouches[0].clientY : e.clientY

		if (startY - endY > 50) {
			if (rUI.isLock) {
				document.getElementById("home_screen").classList.remove("hidden")
				document.getElementById("lock_screen").classList.add("hidden")
				document.getElementById("status_clock").style.opacity = "1"
				rUI.isLock = false
			} else {
				document.getElementById("app_personal").classList.remove("opened")
				document.getElementById("app_settings").classList.remove("opened")
				document.getElementById("app_about").classList.remove("opened")
				document.getElementById("app_calc").classList.remove("opened")
				document.getElementById("app_gallery").classList.remove("opened")
				document.getElementById("app_terminal").classList.remove("opened")
				document.getElementById("cntrl_panel").classList.remove("shown")
				document.getElementById("home_screen").classList.remove("config")
			}
		}
	}

	element.addEventListener("touchstart", onTouchStart)
	element.addEventListener("mousedown", onTouchStart)
	element.addEventListener("touchend", onTouchEnd)
	element.addEventListener("mouseup", onTouchEnd)
}
enableSwipeToClose(document.getElementById("nav_underlay"))
enableSwipeToClose(document.getElementById("nav_handle"))

const enableSwipeToNotif = () => {
	let startYNotif = 0

	let onTouchStartNotif = (e) => {
		startYNotif = e.touches ? e.touches[0].clientY : e.clientY
	}
	let onTouchEndNotif = (e) => {
		let endYNotif = e.changedTouches ? e.changedTouches[0].clientY : e.clientY
		if (endYNotif - startYNotif >= 50) {
			document.getElementById("lock_screen").classList.remove("hidden")
			document.getElementById("cntrl_panel").classList.remove("shown")
			document.getElementById("home_screen").classList.add("hidden")
			document.getElementById("status_clock").style.opacity = "0"
			rUI.isLock = true
		}
	}

	document.getElementById("status_notif").addEventListener("touchstart", onTouchStartNotif)
	document.getElementById("status_notif").addEventListener("mousedown", onTouchStartNotif)
	document.getElementById("status_notif").addEventListener("touchend", onTouchEndNotif)
	document.getElementById("status_notif").addEventListener("mouseup", onTouchEndNotif)
}
enableSwipeToNotif()

const enableSwipeToCtrl = () => {
	let startYNotif = 0

	let onTouchStartCtrl = (e) => {
		startYNotif = e.touches ? e.touches[0].clientY : e.clientY
	}
	let onTouchEndCtrl = (e) => {
		let endYNotif = e.changedTouches ? e.changedTouches[0].clientY : e.clientY
		if (endYNotif - startYNotif >= 50) {
			document.getElementById("cntrl_panel").classList.add("shown")
			document.getElementById("notif_panel").classList.remove("shown")
		}
	}

	document.getElementById("status_cntrl").addEventListener("touchstart", onTouchStartCtrl)
	document.getElementById("status_cntrl").addEventListener("mousedown", onTouchStartCtrl)
	document.getElementById("status_cntrl").addEventListener("touchend", onTouchEndCtrl)
	document.getElementById("status_cntrl").addEventListener("mouseup", onTouchEndCtrl)
}
enableSwipeToCtrl()

const enableSwipeToCloseCtrl = () => {
	let startYCCtrl = 0

	let onTouchStartCCtrl = (e) => {
		startYCCtrl = e.touches ? e.touches[0].clientY : e.clientY
	}
	let onTouchEndCCtrl = (e) => {
		let endYCCtrl = e.changedTouches ? e.changedTouches[0].clientY : e.clientY
		if (startYCCtrl - endYCCtrl >= 50) {
			document.getElementById("cntrl_panel").classList.remove("shown")
		}
	}

	document.getElementById("cntrl_panel").addEventListener("touchstart", onTouchStartCCtrl)
	document.getElementById("cntrl_panel").addEventListener("mousedown", onTouchStartCCtrl)
	document.getElementById("cntrl_panel").addEventListener("touchend", onTouchEndCCtrl)
	document.getElementById("cntrl_panel").addEventListener("mouseup", onTouchEndCCtrl)
}
enableSwipeToCloseCtrl()
