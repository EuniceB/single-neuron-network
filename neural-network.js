class NeuralNetwork {
    constructor(dataset, hiddenLayer){
        this.hiddenLayer = hiddenLayer;
        this.dataset = dataset;
    }

    train(){
        let cost = 0; // goal is to minimize this cost
        for(let data of this.dataset){
            for(let neuron of this.hiddenLayer){
                let output = neuron.process(data);
                console.log('Output:', output);
                console.groupEnd('neuron');
                cost += this.costFunction(output, data.actual)
            }
        }
        console.log('Cost:', cost);
    }

    costFunction(output, actual){
        return (Math.pow(output - actual), 2) / 2;
    }
}