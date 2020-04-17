class Canvas {
    constructor() {
        this.elem = document.getElementById('canvas');
        this.ctx = this.elem.getContext('2d');
        this.ctx.strokeStyle = 'black';
    }

    addEventListener(name, fun) {
        this.elem.addEventListener(name, fun);
    }

    setColor(color){
        this.ctx.strokeStyle = color;
        this.ctx.fillStyle = color;
    }

    setLineWidth(width){
        this.ctx.lineWidth = width;
    }

    getWidth() {
        return this.elem.clientWidth;
    }

    getHeight() {
        return this.elem.clientHeight;
    }

    clear() {
        this.ctx.clearRect(0, 0, this.getWidth(), this.getHeight());
    }

    drawPoint(point) {
        this.ctx.beginPath();
        const newCoords = this.mapCoords(point.x, point.y);
        this.ctx.arc(newCoords.x, newCoords.y, 3, 0, 2 * Math.PI);
        this.ctx.fill();
        this.ctx.stroke();
    }

    mapCoords(x, y){
        const minBefore = -1;
        const maxBefore = 1;
        const minAfterX = 0;
        const minAfterY = this.getHeight();
        const maxAfterX = this.getWidth();
        const maxAfterY = 0;
        return {
            //x: (x-minBefore)/(maxBefore-minBefore) * (maxAfterX-minAfterX) + minAfterX,
            //y: (y-minBefore)/(maxBefore-minBefore) * (maxAfterY-minAfterY) + minAfterY,
            x: (1 - ((x - minBefore) / (maxBefore - minBefore))) * minAfterX + ((x - minBefore) / (maxBefore - minBefore)) * maxAfterX,
            y: (1 - ((y - minBefore) / (maxBefore - minBefore))) * minAfterY + ((y - minBefore) / (maxBefore - minBefore)) * maxAfterY
        }
    }

    drawLine(pointA, pointB) {
        const newCoordsA = this.mapCoords(pointA.x, pointA.y);
        const newCoordsB = this.mapCoords(pointB.x, pointB.y);
        this.ctx.beginPath();
        this.ctx.moveTo(newCoordsA.x, newCoordsA.y);
        this.ctx.lineTo(newCoordsB.x, newCoordsB.y);
        this.ctx.stroke();
    }
}