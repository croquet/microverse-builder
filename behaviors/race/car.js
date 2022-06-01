// Car (Driver)
// Copyright 2022 Croquet Corporation
// Croquet Microverse

class DriveActor {

    setup() {
        if (this.speed === undefined) this.speed = 0.0;
        if (this.accel === undefined) this.accel = 0.0;
        if (this.angle === undefined) this.angle = 0.0;
        if (this.running === undefined) {
            this.running = true;
            this.run(); }
        this.addEventListener("keyDown", "control");
        this.addEventListener("keyUp", "endControl");
        this.addEventListener("pointerDown", "ride");
        this.subscribe(this._cardData.myScope, "newAngle", "newAngle");
        this.subscribe(this._cardData.myScope, "newSpeed", "newSpeed");
    }

    run() {
        if (!this.running) { return; }
        this.future(20).run();
        this.speed = this.speed + this.accel; // Add current acceleration to speed
        if (this.speed > 2.0) { // Speed limits
            this.speed = 1.0; }
        if (this.speed < -0.2) {
            this.speed = -0.2; }
        // if (this.speed != 0.0) { // Speed slowdown
        //     this.speed /= 1.010; }
        // if (this.angle != 0.0) { // Angle slowdown
        //     this.angle /= 1.010; }
        this.rotateBy([0, -this.angle, 0]);
        this.forwardBy(-this.speed);
        if (this.avatar) {
            let t = this._translation;
            this.avatar._translation = [t[0], t[1] + 1.4, t[2]];
            this.avatar._rotation = this._rotation;
            this.avatar.say("forceOnPosition");
        }
    }

    ride() {
        let actors = this.queryCards();
        let avatar = actors.find(o => o.layers.includes("avatar"));
        this.avatar = avatar;
        this.riding = true;
    }

    newAngle(angle) {
        angle = angle / 20;
        this.angle = angle;
    }

    newSpeed(speed) {
        speed = speed / 5;
        this.speed = speed;
    }

    rotateBy(angles) {
        let q = Worldcore.q_euler(...angles);
        q = Worldcore.q_multiply(this.rotation, q);
        this.rotateTo(q);
    }

    forwardBy(dist) {
        let v = Worldcore.v3_rotate([0, 0, dist], this.rotation);
        this.translateTo([
            this.translation[0] + v[0],
            this.translation[1] + v[1],
            this.translation[2] + v[2]]);
    }

    control(key) {
        if (key.key === "ArrowRight") { // Right/Left arrow keys spin the car while held
            this.angle = 0.02;
        } else if (key.key === "ArrowLeft") {
            this.angle = -0.02;
        } else if (key.key === "ArrowUp") { // Up/Down arrow keys accelerate the car while held
            this.accel = 0.01;
        } else if (key.key === "ArrowDown") {
            this.accel = -0.02;
        } else if (key.key === "Shift") { // Shift/Escape arrow keys handle exiting and resetting
            this.avatar = undefined;
            this.riding = false;
        } else if (key.key === "Escape") {
            this.translateTo(this._cardData.startPoint);
            this.rotateTo(Worldcore.q_identity());
            this.speed = 0.0;
            this.accel = 0.0;
            this.angle = 0.0;
        }
    }

    // getOff() {
    //     if (this.avatar) {
    //         let t = this._translation;
    //         this.avatar._translation = [t[0], t[1] + 1.4, t[2]];
    //         this.avatar._rotation = this._rotation;
    //         this.avatar.say("forceOnPosition");
    //     }
    //     this.avatar = undefined;
    //     this.riding = false;
    // }

    endControl(key){
        if (key.key === "ArrowRight") { // Stopping spin on release
            this.angle = 0.0;
        } else if (key.key === "ArrowLeft") {
            this.angle = 0.0;
        } else if (key.key === "ArrowUp") { // Stopping acceleration on release
            this.accel = 0.0;
        } else if (key.key === "ArrowDown") {
            this.accel = 0.0;
        } 
    }

    destroy() {
        this.removeEventListener("pointerDown", "toggle");
        this.removeEventListener("keyDown", "turn", "keyUp");
        this.running = false;
    }
    
}

export default {
    modules: [
        {
            name: "Drive",
            actorBehaviors: [DriveActor]
        }
    ]
}

/* globals Worldcore */
