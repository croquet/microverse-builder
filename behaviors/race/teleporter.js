// Teleporter
// Copyright 2022 Croquet Corporation
// Croquet Microverse

class TeleporterActor {

    // Listener
    setup() {
        this.listen("teleportAvatar", "teleportAvatar");
        this.listen("defController", "defController");
    }

    // this.avatar.goTo(this._cardData.teleportLocation, Worldcore.q_euler(0, this._cardData.teleportYaw, 0), false); // Yaw Control, Avatar Location
    // this.avatar.lookOffset = [0, 0, 0]; // Controls Offset
    // this.avatar.lookPitch = this._cardData.teleportPitch; // Controls Avatar Pitch (Camera Angle Up, Down)
    // this.avatar.lookYaw = 0; // Placeholder
    // this.avatar.say("setLookAngles", {pitch: this._cardData.teleportPitch, yaw: 0, lookOffset: [0, 0, 0]}) // Controls Pitch, Offset

    // Teleport Avatar To Specified Location
    teleportAvatar(playerId) {
        let actors = this.queryCards();
        let avatar = actors.find(o => o.playerId === playerId);
        this.avatar = avatar;
        if (window.innerWidth / window.innerHeight < 1.67) { // Phone
            this.avatar.goTo(this._cardData.teleportLocationP, Worldcore.q_euler(0, this._cardData.teleportYawP, 0), false); // Yaw Control, Avatar Location
            this.avatar.say("setLookAngles", {pitch: this._cardData.teleportPitchP, yaw: 0, lookOffset: [0, 0, 0]}) // Controls Pitch, Offset
        } else { // Computer
            this.avatar.goTo(this._cardData.teleportLocationC, Worldcore.q_euler(0, this._cardData.teleportYawC, 0), false); // Yaw Control, Avatar Location
            this.avatar.say("setLookAngles", {pitch: this._cardData.teleportPitchC, yaw: 0, lookOffset: [0, 0, 0]}) // Controls Pitch, Offset
        }
    }

    defController() {
        if (window.innerWidth < 950 || window.innerHeight < 750) { // Phone
            this.publish(this._cardData.myScope, "newTranslation", [this._cardData.teleportLocationP[0], this._cardData.teleportLocationP[1] - 5, this._cardData.teleportLocationP[2] - 1.25]);
        } else { // Computer
            this.publish(this._cardData.myScope, "newTranslation", [this._cardData.teleportLocationC[0] - 1, this._cardData.teleportLocationC[1] - 5, this._cardData.teleportLocationC[2]]);
        }
    }

}

class TeleporterPawn {
    
    // Teleporter Shape, Listener
    setup() {
        if (this.obj) {
            this.shape.remove(this.obj);
            this.shape.children = [];
        }
        let geometry = new Worldcore.THREE.BoxGeometry(1, 1, 1);
        let material = new Worldcore.THREE.MeshStandardMaterial({color: this.actor._cardData.color});
        this.obj = new Worldcore.THREE.Mesh(geometry, material);
        this.shape.add(this.obj);
        this.addEventListener("pointerDown", "onPointerDown");
    }

    // Click Down (Teleport To Specified Location)
    onPointerDown() {
        this.say("teleportAvatar", this.viewId);
        this.say("defController");
    }

    // Delete Listeners
    destroy() {
        this.removeEventListener("pointerDown", "onPointerDown");
    }

}

export default {
    modules: [
        {
            name: "Teleporter",
            actorBehaviors: [TeleporterActor],
            pawnBehaviors: [TeleporterPawn]
        }
    ]
}

/* globals Worldcore */
