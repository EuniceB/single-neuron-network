const spanX = document.getElementById('x');
const spanY = document.getElementById('y');
const spanAccuracy = document.getElementById('accuracy');
const loader = document.querySelector('.loader');
let color = 50;

// set the initial values
const settings = new Settings();
settings.setValue('numPoints', 'num-points', 100, numPointsChanged);
settings.setValue('percentageTrainSet', 'percentage-train-set', 66, settingsChanged);
settings.setValue('learningRate', 'learning-rate', 0.1, settingsChanged);

function settingsChanged() {
    runNN();
}
function numPointsChanged() {
    dataset = initializeDataset(settings.getValue('numPoints'), canvas.getWidth(), canvas.getHeight());
    settingsChanged();
}

// create the canvas
const canvas = new Canvas();

// initialize a single neuron
const neuron = new Neuron(2, "sign");

// run the neural network
let dataset = initializeDataset(settings.getValue('numPoints'), canvas.getWidth(), canvas.getHeight());
runNN();

function runNN() {
    canvas.clear();
    neuron.reset();
    const trainSet = train(dataset);
    const testSet = test(dataset);
    updateAccuracy(testSet);
    draw(trainSet, testSet);
}

function draw(trainSet, testSet) {
    canvas.setColor('#eeeeee');
    drawSet(trainSet);
    drawSet(testSet, point => point.guess == 1 ? "blue" : "red");
    canvas.setColor('green');
    let x1 = -1;
    let y1 = f(x1);
    let x2 = 1;
    let y2 = f(x2);
    canvas.setLineWidth(3);
    canvas.setColor('#00ff00');
    canvas.drawLine(new Point(x1, y1), new Point(x2, y2));
    canvas.setLineWidth(1);
    canvas.setColor('black');
    canvas.drawLine(new Point(-1, 0), new Point(1, 0));
    canvas.drawLine(new Point(0, -1), new Point(0, 1));
}

function drawNeuronRegressionLine(){
    canvas.setLineWidth(3);
    canvas.setColor('black');
    const w0 = neuron.weights[0];
    const w1 = neuron.weights[1];
    const w2 = neuron.weights[2];
    const y1 = -(w2/w1) - (w0/w1) * -1;
    const y2 = -(w2/w1) - (w0/w1) * 1;
    const pointA = new Point(-1, y1);
    const pointB = new Point(1, y2);
    canvas.drawLine(pointA, pointB);
    canvas.setLineWidth(1);
}

function drawSet(dataset, colorFunction) {
    for (let point of dataset) {
        if (colorFunction != null) {
            canvas.setColor(colorFunction(point));
        }
        canvas.drawPoint(point.features);
    }
}

function updateAccuracy(testSet) {
    const correctGuesses = testSet.filter(point => point.actual === point.guess).length;
    spanAccuracy.innerHTML = parseFloat("" + correctGuesses / testSet.length * 100).toFixed(2);
}

function test(dataset) {
    const testSet = dataset.slice(Math.floor(settings.getValue('percentageTrainSet') / 100 * dataset.length), dataset.length);
    for (let point of testSet) {
        neuron.guess(point);
    }
    return testSet;
}

function train(dataset) {
    const trainSet = dataset.slice(0, Math.floor(settings.getValue('percentageTrainSet') / 100 * dataset.length));
    for (let point of trainSet) {
        neuron.train(point, settings.getValue('learningRate'));
    }
    drawNeuronRegressionLine();
    return trainSet;
}

function initializeDataset(numPoints) {
    const dataset = [];
    for (let i = 0; i < numPoints; i++) {
        let x = randomNumberBetween(-1, 1);
        let y = randomNumberBetween(-1, 1);
        let actual = y > f(x) ? 1 : -1;
        dataset.push({ features: new Point(x, y), actual });
    }
    return dataset;
}

function f(x){
    // y = mx + b
    return x;
}