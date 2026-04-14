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
function getCode(x, y) {
    let code = 0;
    if (x < xmin) code |= 1; // izquierda
    if (x > xmax) code |= 2; // derecha
    if (y < ymin) code |= 4; // arriba
    if (y > ymax) code |= 8; // abajo
    return code;
}   
function cohenSutherland(p1, p2) {
    let x1 = p1.x, y1 = p1.y;
    let x2 = p2.x, y2 = p2.y;
    let code1 = getCode(x1, y1);
    let code2 = getCode(x2, y2);

    while (true) {
        if ((code1 & code2) === 0){
            return { x1, y1, x2, y2 }; // ambos puntos dentro
        } 
        else if (code1 & code2) {
            return null;
        }
        let codeOut = code1 !== 0 ? code1 : code2;
        let x, y;

        if (codeOut & 8) { // abajo
            x = x1 + (x2 - x1) * (ymax - y1) / (y2 - y1);
            y = ymax;
        } else if (codeOut & 4) { // arriba
            x = x1 + (x2 - x1) * (ymin - y1) / (y2 - y1);
            y = ymin;
        } else if (codeOut & 2) { // derecha
            y = y1 + (y2 - y1) * (xmax - x1) / (x2 - x1);
            x = xmax;
        } else if (codeOut & 1) { // izquierda
            y = y1 + (y2 - y1) * (xmin - x1) / (x2 - x1);
            x = xmin;
        }   
        if (codeOut === code1) {
            x1 = x;
            y1 = y;
            code1 = getCode(x1, y1);
        }
        else {
            x2 = x;
            y2 = y;
            code2 = getCode(x2, y2);
        }
    }
}