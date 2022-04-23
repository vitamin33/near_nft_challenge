const component_config = require('./component_config.js');


const sel_l_0 = document.getElementById('sel_l_0');
const sel_l_1 = document.getElementById('sel_l_1');
const sel_l_2 = document.getElementById('sel_l_2');
const sel_l_3 = document.getElementById('sel_l_3');

const sel_r_0 = document.getElementById('sel_r_0');
const sel_r_1 = document.getElementById('sel_r_1');
const sel_r_2 = document.getElementById('sel_r_2');
const sel_r_3 = document.getElementById('sel_r_3');


module.exports = class MONSTER_CONSTRUCTOR {

    constructor() {
        this.canvas = document.getElementById('monster');
        this.ctx = this.canvas.getContext('2d');

        this.sprites = {};

        this.robot = {}

        sel_l_0.onclick = () => {
            this.prev('eye');
            this.draw();
        }
        sel_l_1.onclick = () => {
            this.prev('arm');
            this.draw();
        }
        sel_l_2.onclick = () => {
            this.prev('body');
            this.draw();
        }
        sel_l_3.onclick = () => {
            this.prev('leg');
            this.draw();
        }

        sel_r_0.onclick = () => {
            this.next('eye');
            this.draw();
        }
        sel_r_1.onclick = () => {
            this.next('arm');
            this.draw();
        }
        sel_r_2.onclick = () => {
            this.next('body');
            this.draw();
        }
        sel_r_3.onclick = () => {
            this.next('leg');
            this.draw();
        }
    }

    async setToken(token) {
        sel_l_0.style.visibility = 'hidden';
        sel_l_1.style.visibility = 'hidden';
        sel_l_2.style.visibility = 'hidden';
        sel_l_3.style.visibility = 'hidden';

        sel_r_0.style.visibility = 'hidden';
        sel_r_1.style.visibility = 'hidden';
        sel_r_2.style.visibility = 'hidden';
        sel_r_3.style.visibility = 'hidden';

        const url = token.metadata.media;
        const image = await MONSTER_CONSTRUCTOR.addImageProcess(url);

        this.ctx.drawImage(image, 0, 0);

        
        document.getElementById('header').innerHTML = `Your NFT monster`;
    }

    next(name) {
        const length = Object.keys(this.sprites[name]).length;
        this.robot[name] += 1;
        if(this.robot[name] >= length ) {
            this.robot[name] = 0;
        }
    }
    prev(name) {
        const length = Object.keys(this.sprites[name]).length;
        this.robot[name] -= 1;
        if(this.robot[name] < 0 ) {
            this.robot[name] = length - 1;
        }
    }

    async load() {
        console.log(component_config);
        for (const key in component_config) {
            this.sprites[key] = {};

            this.robot[key] = 0;
            for (const spriteName in component_config[key].sprites) {
                this.sprites[key][spriteName] = await MONSTER_CONSTRUCTOR.addImageProcess(component_config[key].sprites[spriteName]);
            }
        }

        // const eyeImage = await ROBOT_CONSTRUCTOR.addImageProcess(require('./eye.png'));
        // this.robot = await ROBOT_CONSTRUCTOR.addImageProcess(require('./robot.png'));

        // this.rightEye = new EYE(this.ctx, 155, 80, eyeImage);
        // this.leftEye = new EYE(this.ctx, 210, 80, eyeImage);

        // this.isLoaded = true;

        // this.componentImage
    }

    draw() {
        this.ctx.clearRect(0, 0, this.canvas.width, this.canvas.height);

        for (const componentName in this.robot) {
            const nameSprite = Object.keys(this.sprites[componentName])[this.robot[componentName]];

            const image = this.sprites[componentName][nameSprite];

            const isDouble = component_config[componentName].isDouble;

            if(isDouble) {
                //this.ctx.drawImage(image, component_config[componentName].coords.x - image.width/2, component_config[componentName].coords.y);

                this.ctx.save();
                this.ctx.translate(component_config[componentName].coords.x + image.width/2, component_config[componentName].coords.y);
                this.ctx.scale(-1, 1);
                this.ctx.drawImage(image, 0, 0);
                this.ctx.restore();

                this.ctx.drawImage(image, this.canvas.width - component_config[componentName].coords.x - image.width/2, component_config[componentName].coords.y);
            } else {
                this.ctx.drawImage(image, component_config[componentName].coords.x - image.width/2, component_config[componentName].coords.y);
            }

        }
    }

    static addImageProcess(src, width, height) {
        return new Promise((resolve, reject) => {
            let img = new Image(width, height);
            img.onload = () => resolve(img);
            img.onerror = (err) => reject(err);
            img.src = src;
        })
    }


}
