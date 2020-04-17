class Neuron {
    
    constructor(activationFunctionName){
        this.activationFunction = this.activationFunctionFromName(activationFunctionName);
    }
    
    activationFunctionFromName(name) {
        switch(name){
            case "threshold": return this.thresholdActivationFunction;
            case "sigmoid": return this.sigmoidActivationFunction;
            case "rectifier": return this.rectifierActivationFunction;
            case "hyperbolic": return this.hyperbolicTangentActivationFunction;
            case "sign": return this.signActivationFunction;
            default: throw Error("unknow activation function " + name);
        }
    }
    
    process(data){
        let weightedSum = 0;
        let keys = Object.keys(data);
        let weights = this.initializeWeights(keys.length);
        for(let i = 0; i < keys.length; i++){
            weightedSum += data[keys[i]] * weights[i] 
        }
        return this.activationFunction(weightedSum)
    }
    
    initializeWeights(num){
        let weights = [];
        for(let i=0;i<num;i++){
            weights.push(Math.random() * 2 - 1)
        }
        console.group('neuron');
        console.log('Using weights:',weights);
        return weights;
    }
    
    signActivationFunction(x){
        if(x < 0){
            return -1;
        }else{
            return 1;
        }
    }
    
    thresholdActivationFunction(x){
        if(x < 0){
            return 0;
        }else{
            return 1;
        }
    }
    
    sigmoidActivationFunction(x){
        return 1 / (1 + Math.pow(Math.E, x));
    }
    
    rectifierActivationFunction(x){
        return Math.max(x,0);
    }
    
    hyperbolicTangentActivationFunction(x){
        return ((1-Math.pow(Math.E, -2*x))/(1+Math.pow(Math.E, -2*x)));
    }
}