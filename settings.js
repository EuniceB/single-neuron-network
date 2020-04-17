class Settings {
    
    constructor(){
        this.settings = {};
    }

    setValue(key, id, initialValue, changeCallback){
        this.settings[key] = initialValue;
        const elem = document.getElementById(id);
        elem.value = initialValue;
        elem.addEventListener('change', (e) => {
            this.settings[key] = e.target.value;
            changeCallback();
        });
    }

    getValue(key){
        return this.settings[key];
    }
}