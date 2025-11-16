
function enableSwipeToClose(element) {
  let startY = 0
  
  let onTouchStart = (e) => {
    document.getElementById("nav_handle").style.bottom = `9px`
    startY = e.touches ? e.touches[0].clientY : e.clientY
  }
  let onTouchEnd = (e) => {
    document.getElementById("nav_handle").style.bottom = `4.5px`
    let endY = e.changedTouches ? e.changedTouches[0].clientY : e.clientY
    
    if (startY - endY > 50) {
      document.getElementById("home_screen").classList.remove("hidden")
      document.getElementById("app_personal").classList.remove("opened")
      document.getElementById("app_settings").classList.remove("opened")
      document.getElementById("lock_screen").classList.add("hidden")
      document.getElementById("app_about").classList.remove("opened")
      document.getElementById("app_calc").classList.remove("opened")
      document.getElementById("app_gallery").classList.remove("opened")
    }
  }
  
  element.addEventListener("touchstart", onTouchStart)
  element.addEventListener("mousedown", onTouchStart)
  element.addEventListener("touchend", onTouchEnd)
  element.addEventListener("mouseup", onTouchEnd)
}
enableSwipeToClose(document.getElementById("nav_underlay"))
enableSwipeToClose(document.getElementById("nav_handle"))