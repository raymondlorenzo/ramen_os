
let lock_screen = document.getElementById("lock_screen")
let screen = document.getElementById("screen")

document.getElementById("home_screen").classList.add("hidden")


function updateClocks() {
  
  var now = new Date()
  let [hour, min, sec] = [
    now.getHours().toString().padStart(2, '0'),
    now.getMinutes().toString().padStart(2, '0'),
    now.getSeconds().toString().padStart(2, '0')
  ]
  let [month, day, year] = [
    (now.getMonth() + 1).toString().padStart(2, '0'),
    now.getDate().toString().padStart(2, '0'),
    now.getFullYear()
  ]
  
  let nowTime = `${hour}:${min}`
  let nowTimeAlt = `${hour}:${min}:${sec}`
  let nowDate = `${month}/${day}/${year}`
  
  document.getElementById("clock_lock").textContent = nowTime
  document.getElementById("status_clock").textContent = nowTime
  document.getElementById("date_lock").textContent = nowDate
}
setInterval(updateClocks, 1000)
updateClocks()

window.addEventListener("load", () => {
  let str = localStorage.getItem("blur_strength")
  if (str) {
    document.documentElement.style.setProperty("--blurred-ice-fx-strength", str + "px")
    document.getElementById("blur_stren_slider").value = str
    document.getElementById("ammo_blur").textContent = str / 1.5
  }
  
  let savedBackground = localStorage.getItem("fondo")
  if (savedBackground) setWallpaper(savedBackground)
  
  let cutoutType = localStorage.getItem("cutout")
  if (cutoutType) {
    if (cutoutType === "island") {
      islandCutout()
    } else if (cutoutType === "notch") {
      notchCutout()
    } else if (cutoutType === "drop") {
      dropCutout()
    } else if (cutoutType === "droplet") {
      dropNotchCutout()
    }
  }
})

const uploader = document.getElementById("wallpaper_uploader")
function changeWallpaper (element) {
  let imageSource = element.src
  setWallpaper(imageSource)
  uploader.value = ""
  //window.open(imageSource)
}
function setWallpaper(element) {
  screen.style.backgroundImage = `url(${element})`
  document.getElementById("gallery_image").src = element
  localStorage.setItem("fondo", element)
}
document.getElementById("button_gallery").addEventListener("click",  () => window.open(document.getElementById("gallery_image").src))
uploader.addEventListener("change", function () {
  let file = this.files[0]
  if (!file) return
  
  const reader = new FileReader()
  reader.onload = function (e) {
    let dataURL = e.target.result
    setWallpaper(dataURL)
  }
  reader.readAsDataURL(file)
})

navigator.getBattery().then(battery => {
  const batteryLevel = document.getElementById('battery_level')
  const batteryText = document.getElementById('battery_text')

  function updateBatteryStatus() {
    const level = Math.floor(battery.level * 100)
    batteryLevel.style.width = `${level}%`
    batteryLevel.style.background = `${battery.charging ? "#50F3A5" : "#FFFFFF"}`
    batteryText.textContent = `${level}%${battery.charging ? "⚡" : ""}`
  }

  updateBatteryStatus()

  battery.addEventListener('levelchange', updateBatteryStatus)
  battery.addEventListener('chargingchange', updateBatteryStatus)
})

document.getElementById("width_phoen").addEventListener("change", () => {
  screen.style.width = document.getElementById("width_phoen").value + "px"
  document.getElementById("width_height_phoen").textContent = `Width: ${screen.style.width} | Height: ${screen.style.height}`
})
document.getElementById("height_phoen").addEventListener("change", () => {
  screen.style.height = document.getElementById("height_phoen").value + "px"
  document.getElementById("width_height_phoen").textContent = `Width: ${screen.style.width} | Height: ${screen.style.height}`
})
document.getElementById("blur_stren_slider").addEventListener("change", () => {
  document.documentElement.style.setProperty("--blurred-ice-fx-strength", document.getElementById("blur_stren_slider").value + "px")
  document.getElementById("ammo_blur").textContent = document.getElementById("blur_stren_slider").value / 1.5
  localStorage.setItem("blur_strength", document.getElementById("blur_stren_slider").value)
})
let easter_egg_countwr = 0
document.getElementById("easter_egg_thing").addEventListener("click", () => {
  easter_egg_countwr++
  
  if (easter_egg_countwr > 6) {
    easter_egg_countwr = 0
  }
})

// cam cutouts logic
notchCutout = () => {
  document.getElementById("camera").style.top = "0"
  document.getElementById("camera").style.borderTopLeftRadius = "0"
  document.getElementById("camera").style.borderTopRightRadius = "0"
  document.getElementById("camera").style.borderBottomLeftRadius = "10px"
  document.getElementById("camera").style.borderBottomRightRadius = "10px"
  document.getElementById("camera").style.width = "110px"
  document.getElementById("camera").style.height = "22.5px"
  localStorage.setItem("cutout", "notch")
  console.log("Notch cutout set successfully")
}
islandCutout = () => {
  document.getElementById("camera").style.top = "3px"
  document.getElementById("camera").style.borderTopLeftRadius = "20px"
  document.getElementById("camera").style.borderTopRightRadius = "20px"
  document.getElementById("camera").style.borderBottomLeftRadius = "20px"
  document.getElementById("camera").style.borderBottomRightRadius = "20px"
  document.getElementById("camera").style.width = "100px"
  document.getElementById("camera").style.height = "24.5px"
  localStorage.setItem("cutout", "island")
  console.log("Island cutout set successfully")
}
dropCutout = () => {
  document.getElementById("camera").style.top = "3px"
  document.getElementById("camera").style.borderTopLeftRadius = "10px"
  document.getElementById("camera").style.borderTopRightRadius = "10px"
  document.getElementById("camera").style.borderBottomLeftRadius = "10px"
  document.getElementById("camera").style.borderBottomRightRadius = "10px"
  document.getElementById("camera").style.width = "21px"
  document.getElementById("camera").style.height = "19.5px"
  localStorage.setItem("cutout", "drop")
  console.log("Drop cutout set successfully")
}
dropNotchCutout = () => {
  document.getElementById("camera").style.top = "0"
  document.getElementById("camera").style.borderTopLeftRadius = "0"
  document.getElementById("camera").style.borderTopRightRadius = "0"
  document.getElementById("camera").style.borderBottomLeftRadius = "10px"
  document.getElementById("camera").style.borderBottomRightRadius = "10px"
  document.getElementById("camera").style.width = "21px"
  document.getElementById("camera").style.height = "19.5px"
  localStorage.setItem("cutout", "droplet")
  console.log("Infinity-V cutout set successfully")
}