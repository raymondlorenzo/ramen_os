document.getElementById("icon_settings").addEventListener("click", () => document.getElementById("app_settings").classList.add("opened"))
document.getElementById("close_settings").addEventListener("click", () => document.getElementById("app_settings").classList.remove("opened"))

document.getElementById("open_personal").addEventListener("click", () => {
  document.getElementById("app_personal").classList.add("opened")
document.getElementById("close_persolan").addEventListener("click", () => document.getElementById("app_personal").classList.remove("opened"))
})

document.getElementById("open_about").addEventListener("click", () => document.getElementById("app_about").classList.add("opened"))
document.getElementById("close_about").addEventListener("click", () => document.getElementById("app_about").classList.remove("opened"))

document.getElementById("icon_calc").addEventListener("click", () => document.getElementById("app_calc").classList.add("opened"))

document.getElementById("icon_gallery").addEventListener("click", () => document.getElementById("app_gallery").classList.add("opened"))