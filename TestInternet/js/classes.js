class Player {
    constructor(x, y, txt, color, id) {
        //definiert spieler stats
        this.x = x;
        this.y = y;
        this.text = txt;
        this.color = color;
        this.width = 10;
        this.grounded = true;
        this.jump = false;
        this.airtime = -601;
        this.standingMesh = mesh[0];
        this.cooldown = 100;
        this.health = 100;
        this.healthColor = 'lightgreen';
        this.id = id;
        this.damageBoost = 1;
        this.damage = 26 * this.damageBoost;
        this.width = 10 * this.damageBoost;
        this.tookDCooldown = 0;
        this.resetPos = {health: 100, x: x, y: y, cooldown: 100, standingMesh: mesh[0], airtime: -601, grounded: true};
    }
    update() {
        if (this.health < 75) {
            if (this.health < 50) {
                if (this.health < 25) {
                    this.healthColor = 'red';
                } else {
                    this.healthColor = 'orange';
                }
             } else {
                this.healthColor = 'lightgreen';
            }
        }

        if (this.tookDCooldown > -1) {
            this.tookDCooldown--;
        }

        if (this.health < 100 && this.tookDCooldown < 0) {
            this.health += 0.03;
        }

        if (this.damageBoost > 1) {
            this.damageBoost -= 0.0005;
            this.damage = 26 * this.damageBoost;
            this.width = 10 * this.damageBoost;
        }

    }
    //zeichnet spieler
    draw() {
        if (this.id === 1) {
            ctx.font = "7px Arial";
            ctx.fillStyle = 'white';
            ctx.fillText('YOU', this.x - 8, this.y - 18);
        }

        ctx.fillStyle = 'grey';
        ctx.fillRect(this.x - this.width - 2.5, this.y - 15, this.health/4, this.width/5);

        ctx.fillStyle = this.healthColor;
        ctx.fillRect(this.x - this.width - 2.5, this.y - 15, this.health/4, this.width/5);

    }
}

class WorlMesh {
    constructor(x, y, w, h, color) {
        //definiert mesh position und höhe
        this.x = x;
        this.y = y;
        this.width = w;
        this.height = h;
        this.color = color;
    }
    //zeichnet mesh
    draw() {
        ctx.fillStyle = this.color;
        ctx.fillRect(this.x, this.y, this.width, this.height);
    }
}

class FireBalls {
    constructor(x, y, w, color, direction, target, player) {
        //definiert mesh position und höhe
        this.x = x;
        this.y = y;
        this.width = w;
        this.color = color;
        this.health = 100;
        this.damage = 10;
        this.direction = direction;
        this.timer = 0.001;
        this.target = target;
        this.player = player;
    }
    update() {
        this.health -= this.timer;

        this.x -= this.direction;

        this.y += 0.8 * this.timer;

        this.timer += 0.01;
    }
}
