const canvas = document.getElementById("canvas");
const ctx = canvas.getContext("2d");

let puntos = [];

canvas.addEventListener("click", (e) => {
    const x = e.offsetX
    const y = e.offsetY

    puntos.push({x, y});

    dibujarPunto(x, y);

    if (puntos.length === 2) {
        dibujarLinea(puntos[0], puntos[1]);
    }
});

function dibujarPunto(x, y) {
    ctx.fillStyle = "blue"
    ctx.beginPath()
    ctx.arc(x, y, 5, 0, Math.PI * 2)
    ctx.fill()
}

function dibujarLinea(p1, p2) {
    ctx.strokeStyle = "red"
    ctx.beginPath()
    ctx.moveTo(p1.x, p1.y)
    ctx.lineTo(p2.x, p2.y)
    ctx.stroke()
}