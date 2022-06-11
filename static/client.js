let socket = io();
let btnContainer = document.getElementById("btnContainer");
let ownerTextInput = document.getElementById("ownerTextInput");
let colourSelector = document.getElementById("colorSelector");

socket.on("state", (data) => {
    btnContainer.innerHTML = "";
    for(let i = 0; data.length > i; i++) {
        addButton(data[i], i);
    }
})

function addButton(btnData, index) {
    let btn = document.createElement("button");
    btn.innerText = btnData.owner + " | " + btnData.time;
    btn.style.backgroundColor = btnData.colour;
    btn.style.height = "200px";
    btn.style.width = "200px"
    btn.setAttribute("index", index);
    btn.onclick = ownButton;

    btnContainer.appendChild(btn);
}

function ownButton(e) {
    let button = e.srcElement;
    let index = button.getAttribute("index");
    let claim = {"index":index, "owner":ownerTextInput.value, "colour":colourSelector.value}

    socket.emit("claim", claim)

}