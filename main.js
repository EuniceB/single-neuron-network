const canvas = document.getElementById('canvas');
const spanX = document.getElementById('x');
const spanY = document.getElementById('y');
const numPointsInput = document.getElementById('num-points');
numPointsInput.value = 100;
const loader = document.querySelector('.loader');
canvas.addEventListener('mousemove', (e)=>{
    const rect = canvas.getBoundingClientRect();
    spanX.innerHTML =  e.clientX-rect.left;
    spanY.innerHTML =  e.clientY-rect.top
})
numPointsInput.addEventListener('change', (e)=>{
    initializeDatasetAndDraw(e.target.value);
});

function initializeDatasetAndDraw(numPoints){
    setTimeout(()=>{
        loader.classList.add('show');
    },0);
    const dataset = initializeDataset(numPoints, canvas.clientWidth, canvas.clientHeight);
    
    draw(dataset);
    setTimeout(()=>{
        loader.classList.remove('show');
    },0); 
}
/* const dataset = [{
    studyHours: 12,
    sleepHours: 6,
    quizScore: 78,
    actual: 93
},{
    studyHours: 22,
    sleepHours: 6.5,
    quizScore: 24,
    actual: 68
},{
    studyHours: 115,
    sleepHours: 4,
    quizScore: 100,
    actual: 95
},{
    studyHours: 31,
    sleepHours: 9,
    quizScore: 67,
    actual: 75
},{
    studyHours: 0,
    sleepHours: 10,
    quizScore: 58,
    actual: 51
},{
    studyHours: 5,
    sleepHours: 8,
    quizScore: 78,
    actual: 60
},{
    studyHours: 92,
    sleepHours: 6,
    quizScore: 82,
    actual: 89
},{
    studyHours: 57,
    sleepHours: 8,
    quizScore: 91,
    actual: 97
}] */


initializeDatasetAndDraw(100);

function initializeDataset(numPoints, width, height) {
    const dataset = [];
    for(let i = 0; i < numPoints; i++){
        let x = Math.floor(Math.random() * (width + 1));
        let y = Math.floor(Math.random() * (height + 1));
        let label = x>=y? 1: -1;
        dataset.push({x, y, label, actual: 0});
    }
    return dataset;
}

function draw(dataset){
    const ctx = canvas.getContext('2d');
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    ctx.beginPath();
    ctx.moveTo(0, 0);
    ctx.strokeStyle = 'black';
    ctx.lineTo(canvas.width, canvas.height);
    ctx.stroke(); 
    for(let point of dataset){
        ctx.strokeStyle = point.label === 1? "blue": "red";
        ctx.beginPath();
        console.log(point.label, ctx.fillStyle);
        ctx.arc(point.x, point.y, 1, 0, 2 * Math.PI);
        ctx.fill();
        ctx.stroke(); 
    }   
}