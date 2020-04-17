class Neuron {

    constructor(numFeatures, activationFunctionName) {
        this.activationFunction = this.activationFunctionFromName(activationFunctionName);
        this.numTrainSteps = 1;
        this.initializeWeights(numFeatures + 1);
    }

    activationFunctionFromName(name) {
        switch (name) {
            case "threshold": return this.thresholdActivationFunction;
            case "sigmoid": return this.sigmoidActivationFunction;
            case "rectifier": return this.rectifierActivationFunction;
            case "hyperbolic": return this.hyperbolicTangentActivationFunction;
            case "sign": return this.signActivationFunction;
            default: throw Error("unknow activation function " + name);
        }
    }

    reset(){
        this.initializeWeights(this.weights.length + 1);
    }

    guess(data) {
        let weightedSum = 0;
        const features = Object.keys(data.features);
        for (let i = 0; i < features.length; i++) {
            weightedSum += data.features[features[i]] * this.weights[i]
        }
        weightedSum += this.weights[features.length];
        let guess = this.activationFunction(weightedSum);
        data.guess = guess;
        return guess;
    }

    train(data, learningRate) {
        let error = 1000;
        for (let i = 0; i < this.numTrainSteps && error != 0; i++) {
            this.guess(data);
            error = data.actual - data.guess;
            const features = Object.keys(data.features);
            for (let i = 0; i < this.weights.length; i++) {
                this.weights[i] += error * (data.features[features[i]] || 1) * learningRate
            }
            if (error != 0 && data.features[features[i]] != 0 && learningRate != 0) {
            }
        }
    }

    initializeWeights(num) {
        this.weights = [];
        for (let i = 0; i < num; i++) {
            this.weights.push(Math.random() * 2 - 1)
        }
    }

    signActivationFunction(x) {
        if (x < 0) {
            return -1;
        } else {
            return 1;
        }
    }

    thresholdActivationFunction(x) {
        if (x < 0) {
            return 0;
        } else {
            return 1;
        }
    }

    sigmoidActivationFunction(x) {
        return 1 / (1 + Math.pow(Math.E, x));
    }

    rectifierActivationFunction(x) {
        return Math.max(x, 0);
    }

    hyperbolicTangentActivationFunction(x) {
        return ((1 - Math.pow(Math.E, -2 * x)) / (1 + Math.pow(Math.E, -2 * x)));
    }
}