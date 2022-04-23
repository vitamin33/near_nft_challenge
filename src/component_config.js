module.exports = {
    body: {
        coords: {
            x: 200, y: 90
        },
        sprites: {
            body_blueA: require('./assets/body_blueA.png'),
            body_blueB: require('./assets/body_blueB.png'),
            body_blueC: require('./assets/body_blueC.png'),
            body_blueD: require('./assets/body_blueD.png')
        }
    },
    leg: {
        coords: {
            x: 140, y: 250
        },
        isDouble: true,
        sprites: {
            leg_blueA: require('./assets/leg_blueA.png'),
            leg_blueB: require('./assets/leg_blueB.png'),
            leg_blueC: require('./assets/leg_blueC.png'),
            leg_blueD: require('./assets/leg_blueD.png'),
        }
    },
    arm: {
        coords: {
            x: 100, y: 130
        },
        isDouble: true,
        sprites: {
            arm_blueA: require('./assets/arm_blueA.png'),
            arm_blueB: require('./assets/arm_blueB.png'),
            arm_blueC: require('./assets/arm_blueC.png'),
            arm_blueD: require('./assets/arm_blueD.png')
        }
    },
    eye: {
        coords: {
            x: 150, y: 130
        },
        isDouble: true,
        sprites: {
            eye_closed_feminine: require('./assets/eye_closed_feminine.png'),
            eye_angry_blue: require('./assets/eye_angry_blue.png'),
            eye_closed_happy: require('./assets/eye_closed_happy.png'),
            eye_human_red: require('./assets/eye_human_red.png')
        }
    },
}