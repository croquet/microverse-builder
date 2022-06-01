// Teleporter
// Copyright 2022 Croquet Corporation
// Croquet Microverse

class TeleporterActor {

    // Listener
    setup() {
        this.listen("teleportAvatar", "teleportAvatar");
    }

    // Teleport Avatar To Specified Location
    teleportAvatar() {
        let actors = this.queryCards();
        let avatar = actors.find(o => o.layers.includes("avatar"));
        this.avatar = avatar;
        let quaternion = Worldcore.q_euler(...[0, -(Math.PI / 2), -(Math.PI / 2)]);
        this.avatar.goTo(this._cardData.teleportLocation, quaternion, false);
    }

}

class TeleporterPawn {
    
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
        this.say("teleportAvatar");
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
