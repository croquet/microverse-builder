// Controller
// Copyright 2022 Croquet Corporation
// Croquet Microverse

class ControllerActor {

    // Listeners
    setup() {
        this.listen("startRotating", "startRotating");
        this.listen("stopRotating", "stopRotating");
        this.listen("newAngle", "newAngle");
        this.listen("newSpeed", "newSpeed");
    }

    // startRotating(rotation) {
    //     this.isSpinning = true;
    //     this.qSpin = Worldcore.q_euler(0, rotation, 0);
    //     this.doSpin();
    // }

    // doSpin() {
    //     if(this.isSpinning) {
    //         this.setRotation(Worldcore.q_multiply(this._rotation, this.qSpin));
    //         this.future(50).doSpin();
    //     }
    // }

    // Stop All Rotation (Dir)
    stopRotating() {
        this.isRotating = false;
    }

    // Publish New Angle
    newAngle(newAngle) {
        this.publish(this._cardData.myScope, "newAngle", newAngle);
    }

    // Publish New Speed
    newSpeed(newSpeed) {
        this.publish(this._cardData.myScope, "newSpeed", newSpeed);
    }

    // Deletion
    destroy() {
        delete this.isSpinning;
        this.unsubscribe(this.id, "startRotating");
        this.unsubscribe(this.id, "stopRotating");
        this.unsubscribe(this.id, "newAngle");
    }

}

class ControllerPawn {
    
    // Controller Shape, Listeners
    setup() {
        if (this.obj) {
            this.shape.remove(this.obj);
            this.shape.children = [];
        }
        let geometry = new Worldcore.THREE.SphereGeometry(0.5, 32, 16);
        let material = new Worldcore.THREE.MeshStandardMaterial({color: this.actor._cardData.color});
        this.obj = new Worldcore.THREE.Mesh(geometry, material);
        this.shape.add(this.obj);
        this.addEventListener("pointerDown", "onPointerDown");
        this.addEventListener("pointerUp", "onPointerUp");
        this.addEventListener("pointerMove", "onPointerMove");
    }

    // theta(xyz) {
    //     // As the thing itself rotates, we need to get the "theta" in global.
    //     let origin = this.translation;
    //     return (Math.atan2(origin[2] - xyz[2], xyz[0] - origin[0]) + Math.PI * 2) % (Math.PI * 2);
    // }

    // Click Down
    onPointerDown(p3d) {
        this.moveBuffer = [];
        this.say("stopRotating"); // on click
        this._startDrag = p3d.xy; // xy values (tuple)
        this._baseRotation = this._rotation;
        let avatar = Worldcore.GetPawn(p3d.avatarId);
        avatar.addFirstResponder("pointerMove", {}, this);
        // if pointer hasnt moved for ? then stop rotating vehicle
    }

    // Move Click
    onPointerMove(p3d) {
        this.moveBuffer.push(p3d.xy);
        this.deltaAngle = (p3d.xy[0] - this._startDrag[0]) / 2 / 180 * Math.PI; // xz rotation
        let deltaAnglexy = (p3d.xy[1] - this._startDrag[1]) / 2 / 180 * Math.PI; // xy rotation
        let newRot = Worldcore.q_multiply(this._baseRotation, Worldcore.q_euler(deltaAnglexy, this.deltaAngle, 0));
        this.rotateTo(newRot); // New rotation call
        this.say("newAngle", this.deltaAngle);
        this.say("newSpeed", -deltaAnglexy);
        if (this.moveBuffer.length >= 3) {
            setTimeout(() => this.shiftMoveBuffer(), 100);
        }
    }

    shiftMoveBuffer() {
        this.moveBuffer.shift();
    }

    // Unclick
    onPointerUp(p3d) {
        let avatar = Worldcore.GetPawn(p3d.avatarId);
        avatar.removeFirstResponder("pointerMove", {}, this);
        this._startDrag = null;
        this._baseRotation = null;
        // slowdown
        // if (this.moveBuffer.length < 3) {return;}
        // if(Math.abs(this.deltaAngle) > 0.01) {
        //     let a = this.deltaAngle;
        //     a = Math.min(Math.max(-0.1, a), 0.1);
        //     this.say("startSpinning", a);
        // }
    }

    // Delete Listeners
    destroy() {
        this.removeEventListener("pointerDown", "onPointerDown");
        this.removeEventListener("pointerUp", "onPointerUp");
        this.removeEventListener("pointerMove", "onPointerMove");
    }
}

export default {
    modules: [
        {
            name: "Controller",
            actorBehaviors: [ControllerActor],
            pawnBehaviors: [ControllerPawn]
        }
    ]
}

/* globals Worldcore */
