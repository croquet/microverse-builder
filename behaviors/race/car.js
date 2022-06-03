// Car (Driver)
// Copyright 2022 Croquet Corporation
// Croquet Microverse

class DriveActor {

    setup() {
        if (this.angle === undefined) this.angle = 0.0;
        if (this.speed === undefined) this.speed = 0.0;
        if (this.accel === undefined) this.accel = 0.0;
        if (this.running === undefined) {
            this.running = true;
            this.run(); }
        // this.addEventListener("keyDown", "control");
        // this.addEventListener("keyUp", "endControl");
        // this.addEventListener("pointerDown", "ride");
        this.subscribe(this._cardData.myScope, "newAngle", "newAngle");
        this.subscribe(this._cardData.myScope, "newSpeed", "newSpeed");
        this.subscribe(this._cardData.myScope, "slowDown", "slowDown");
    }

    run() {
        if (!this.running) {
            this.speed /= 1.015;
            this.angle /= 1.015; }
        this.future(25).run();
        this.speed = this.speed + this.accel; // Add current acceleration to speed
        if (this.speed > 2.0) { // Speed limits
            this.speed = 1.0; }
        if (this.speed < -0.2) {
            this.speed = -0.2; }
        this.rotateBy([0, -this.angle, 0]);
        this.forwardBy(-this.speed);
        // if (this.avatar) {
        //     let t = this._translation;
        //     this.avatar._translation = [t[0], t[1] + 1.4, t[2]];
        //     this.avatar._rotation = this._rotation;
        //     this.avatar.say("forceOnPosition");
        // }
    }

    // ride() {
    //     let actors = this.queryCards();
    //     let avatar = actors.find(o => o.layers.includes("avatar"));
    //     this.avatar = avatar;
    //     this.riding = true;
    // }

    // Gives New Angle From Controller
    newAngle(angle) {
        angle = angle / 15;
        this.angle = angle;
    }

    // Gives New Speed From Controller
    newSpeed(speed) {
        speed = speed / 3;
        this.speed = speed;
    }

    // Starts or Stops Slowdown
    slowDown(runSlowDown) {
        this.running = !runSlowDown;
    }

    // Old Version: (Rotation)
    // let q = Worldcore.q_euler(...angles);
    // q = Worldcore.q_multiply(this.rotation, q);
    // this.rotateTo(q);

    rotateBy(angle) {
        let angularVelocity = this.speed * Math.sin(angle[1]);
        this.rotateTo(Worldcore.q_multiply(this.rotation, Worldcore.q_axisAngle([0, 1, 0], angularVelocity)));
    }

    // New Version: (Not Implemented, Velocity)
    // let velocityScale = Worldcore.v3_scale(Worldcore.v3_rotate([0, 0, 1], this.rotation), velocity);
    // const target = Worldcore.v3_add(this.translation, velocityScale);
    // this.moveTo(target);

    forwardBy(velocity) {
        let vS = Worldcore.v3_rotate([0, 0, velocity], this.rotation);
        this.translateTo([
            this.translation[0] + vS[0],
            this.translation[1] + vS[1],
            this.translation[2] + vS[2]]);
    }

    // control(key) {
    //     if (key.key === "ArrowRight") { // Right/Left arrow keys spin the car while held
    //         this.angle = 0.02;
    //     } else if (key.key === "ArrowLeft") {
    //         this.angle = -0.02;
    //     } else if (key.key === "ArrowUp") { // Up/Down arrow keys accelerate the car while held
    //         this.accel = 0.01;
    //     } else if (key.key === "ArrowDown") {
    //         this.accel = -0.02;
    //     } else if (key.key === "Shift") { // Shift/Escape arrow keys handle exiting and resetting
    //         this.avatar = undefined;
    //         this.riding = false;
    //     } else if (key.key === "Escape") {
    //         this.translateTo(this._cardData.startPoint);
    //         this.rotateTo(Worldcore.q_identity());
    //         this.speed = 0.0;
    //         this.accel = 0.0;
    //         this.angle = 0.0;
    //     }
    // }

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

    // endControl(key){
    //     if (key.key === "ArrowRight") { // Stopping spin on release
    //         this.angle = 0.0;
    //     } else if (key.key === "ArrowLeft") {
    //         this.angle = 0.0;
    //     } else if (key.key === "ArrowUp") { // Stopping acceleration on release
    //         this.accel = 0.0;
    //     } else if (key.key === "ArrowDown") {
    //         this.accel = 0.0;
    //     } 
    // }

    destroy() {
        // this.removeEventListener("pointerDown", "toggle");
        // this.removeEventListener("keyDown", "turn", "keyUp");
        this.running = undefined;
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
