var msgForm = document.getElementById("msgForm")

var socket = io();

socket.on("message", msg => {
    const msgfromServer = msg;

    showTheMessage(msg);
})

msgForm.addEventListener("submit", e => {
    e.preventDefault();
    const msg = e.target.elements.message.value;

    socket.emit("message", msg)
    // console.log(msg);
})


function showTheMessage(msg){
    const div = document.createElement("div");
    div.innerHTML = `
        <p class = "msgText">${msg}</p>
    `
    document.querySelector(".msg-box").appendChild(div);
}