const ctrl = document.getElementById('controller')

let stream = localStorage.getItem('streamURL')
if (stream != null) {
    document.getElementById('player').style.visibility = "visible"
}

let channelName = localStorage.getItem('channelName')
if (channelName != null) {
    document.getElementById("stream-name").innerHTML = channelName
}

let audio = new Audio(stream)

const volume = localStorage.getItem('volume')
if (volume == null) {
    localStorage.setItem('volume', '80')
}
audio.volume = Number(volume) / 100

const toggleMusic = () => {
    if (ctrl.classList[1] == "fa-play") {
        ctrl.className = ctrl.className.replace(/(?:^|\s)fa-play(?!\S)/g, ' fa-stop')

        audio.play()
    } else {
        ctrl.className = ctrl.className.replace(/(?:^|\s)fa-stop(?!\S)/g, ' fa-play')

        audio.pause()
    }
}

const slider = document.getElementById("volume-slider")
slider.addEventListener("change", function (e) {
    let cv = Number(e.currentTarget.value)
    audio.volume = cv / 100
    localStorage.setItem('volume', cv)
});

const playStation = (id, name) => {
    localStorage.setItem('streamURL', `https://stream.open.fm/${id}`)
    localStorage.setItem('channelName', name)

    stream = localStorage.getItem('streamURL')
    audio.pause()
    audio = new Audio(stream)
    audio.play()
    ctrl.className = ctrl.className.replace(/(?:^|\s)fa-play(?!\S)/g, ' fa-stop')
    document.getElementById("stream-name").innerHTML = name
}

const getPage = async (id) => {
    const response = await fetch('https://open.fm/radio/api/v2/ofm/stations_slug.json')
    const body = JSON.parse(await response.text())

    document.getElementById("content").innerHTML = ""

    for (i = 0; i < body["channels"].length; i++) {
        if (body["channels"][i]["group_ids"][0] == Number(id)) {
            const id = body["channels"][i]["instance_id"]
            const name = body["channels"][i]["name"]
            document.getElementById("content").innerHTML += `<div class="station" onclick='playStation(${id}, "${name}")'>
<img src="https://open.fm/logo/140x140/${id}" alt="cover" class="station-cover">
<p class="station-name">${name}</p>
</div>`
        }
    }
}

(async () => {
    const response = await fetch('https://open.fm/radio/api/v2/ofm/stations_slug.json')
    const body = JSON.parse(await response.text())

    for (i = 0; i < body["groups"].length; i++) {
        document.getElementById("station-list").innerHTML += `<li><a onclick='getPage(${body["groups"][i]["id"]})'>${body["groups"][i]["name"]}</a></li>`
    }
})();
