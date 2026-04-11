const canvas = document.getElementById("canvas");
const ctx = canvas.getContext("2d");

let puntos = [];

// viewport
const xmin = 100, ymin = 100;
const xmax = 500, ymax = 300;

canvas.addEventListener("click", (e) => {
    const x = e.offsetX;
    const y = e.offsetY;

    if (puntos.length === 2) {
        puntos = [];
        ctx.clearRect(0, 0, canvas.width, canvas.height);
        dibujarViewport();
    }

    puntos.push({ x, y });

    dibujarPunto(x, y);

    if (puntos.length === 2) {
        dibujarLinea(puntos[0], puntos[1]);
    }
});

function dibujarViewport() {
    ctx.strokeStyle = "black";
    ctx.strokeRect(xmin, ymin, xmax - xmin, ymax - ymin);
}

dibujarViewport();

function dibujarPunto(x, y) {
    ctx.fillStyle = "blue";
    ctx.beginPath();
    ctx.arc(x, y, 5, 0, Math.PI * 2);
    ctx.fill();

    ctx.fillText(`(${x},${y})`, x + 5, y - 5);
}

function dibujarLinea(p1, p2) {
    ctx.strokeStyle = "red";
    ctx.beginPath();
    ctx.moveTo(p1.x, p1.y);
    ctx.lineTo(p2.x, p2.y);
    ctx.stroke();
}