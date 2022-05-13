class DriveActor {
    setup() {
        if (this.speed === undefined) this.speed = 0.1;
        if (this.angle === undefined) this.angle = 0.02;
        if (this.running === undefined) {
            this.running = true;
            this.run();
        }
        this.addEventListener("keyDown", "control");
        this.addEventListener("pointerDown", "nop");
        // this.addEventListener("pointerDown", "ride");
        // this.subscribe("scope", "newAngle", "newAngle");
    }
    run() {
        if (!this.running) {return;}
        this.future(20).run();
        this.rotateBy([0, -this.angle, 0]);
        this.forwardBy(-this.speed);
        if (this.avatar) {
            let t = this._translation;
            this.avatar.translateTo([t[0], t[1] + 1.6, t[2]]);
            this.avatar.rotateTo(this._rotation);
        }
    }
    ride() {
        let actors = this.queryCards();
        let avatar = actors.find(o => o.layers.includes("avatar"));
        this.avatar = avatar;
    }
    /*
    newAngle(angle) {
        // angle = angle / 20;
        // console.log(angle);
        this.angle = angle;
    }
    */
    rotateBy(angles) {
        let q = Worldcore.q_euler(...angles);
        q = Worldcore.q_multiply(this.rotation, q);
        this.rotateTo(q);
    }
    forwardBy(dist) {
        let v = Worldcore.v3_rotate([dist, 0, 0], this.rotation);
        this.translateTo([
            this.translation[0] + v[0],
            this.translation[1] + v[1],
            this.translation[2] + v[2]]);
    }
    control(key) {
        if (key.key === "ArrowRight") {
            this.angle = Math.min(0.05, this.angle + 0.004);
        } else if (key.key === "ArrowLeft") {
            this.angle = Math.max(-0.05, this.angle - 0.004);
        } else if (key.key === "ArrowUp") {
            this.speed = Math.min(1, this.speed + 0.025);
        } else if (key.key === "ArrowDown") {
            this.speed = Math.max(-0.2, this.speed - 0.025);
        }
    }
    destroy() {
        this.removeEventListener("pointerDown", "toggle");
        this.removeEventListener("keyDown", "turn");
        this.running = false;
    }
}

class CircleActor {
    setup() {
        if (!this.circling) {
            this.circling = true;
            this.step();
        }
        this.addEventListener("pointerDown", "toggle");
    }

    step() {
        if (!this.circling) {return;}
        this.future(20).step();
        this.rotateBy([0, 0.01, 0]);
        this.forwardBy(0.03);
    }

    toggle() {
        this.circling = !this.circling;
        if (this.circling) {
            this.step();
        }
    }

    rotateBy(angles) {
        let q = Worldcore.q_euler(...angles);
        q = Worldcore.q_multiply(this.rotation, q);
        this.rotateTo(q);
    }

    forwardBy(dist) {
        let v = Worldcore.v3_rotate([0, 0, dist], this.rotation)
        this.translateTo([
            this.translation[0] + v[0],
            this.translation[1] + v[1],
            this.translation[2] + v[2]]);
    }

    destroy() {
        this.removeEventListener("pointerDown", "toggle");
        this.circling = false;
    }
}

class PerlinActor {
    setup() {
        console.log("PerlinActor");
        let firstTime = false;
        if (this.visible === undefined) {
            firstTime = true;
            this.visible = false;
        }

        this.initPerlin(firstTime);

        this.listen("hiliteRequest", "hilite");
        this.listen("unhiliteRequest", "unhilite");
        this.listen("showHideRequest", "showHide");
        this.listen("enterHiliteRequest", "enterHilite");
        this.listen("leaveHiliteRequest", "leaveHilite");
    }

    hilite(_p3d) {
        this.say("hilite", 0x081808);
    }

    unhilite(_p3d) {
        this.say("hilite", 0x000000);
    }

    enterHilite(_p3d) {
        this.say("hilite", 0x181808);
    }
    leaveHilite(_p3d) {
        this.say("hilite", 0x000000);
    }

    initPerlin(firstTime) {
        this.currentRow = this.rows = 20;
        this.columns = 20;
        let d = this.delta = 0.1;

        this.data = [...Array(this.rows).keys()].map(i => {
            return [...Array(this.columns).keys()].map(j => {
                return this.call("PerlinNoise", "noise2D", i * d, j * d);
            });
        });

        if (firstTime) {
            this.updatePerlin();
        }
    }

    updatePerlin() {
        this.future(100).updatePerlin();
        if (!this.data) {return;}
        this.data.shift(); // dump the first row
        let d = this.delta;

        let row = [...Array(this.columns).keys()].map(i => {
            return this.call("PerlinNoise", "noise2D", this.currentRow * d, i * d);
        });
        this.data.push(row);
        this.currentRow++;
        this.say("updatePerlin", row);

    }

    showHide() {
        this.visible = !this.visible;
        this.say("showMe", this.visible);
    }
}

class PerlinNoise {
    generateHashTable() {
        const table = [];
        this.items = [];
        for (let n = 0; n < 256; n++) {
            this.push({key: Math.random(), value: n});
        }
        while (!this.isEmpty()) {
            table.push(this.pop().value);
        }
        return table.concat(table);
    }

    signedNoise2D(x,y) {
        return this.noise2D(x, y) - 0.5;
    }

    noise2D(x,y) {
        if (!this.hashTable) {
            this.hashTable = this.generateHashTable();
        }

        const table = this.hashTable;
        const xInt = Math.floor(x);
        const yInt = Math.floor(y);
        const xf = x - xInt;
        const yf = y - yInt;
        const u = this.fade(xf);
        const v = this.fade(yf);
        const xi = xInt & 0xff;
        const yi = yInt & 0xff;
        const aa = table[table[xi    ] + yi];
        const ab = table[table[xi + 1] + yi];
        const ba = table[table[xi    ] + yi + 1];
        const bb = table[table[xi + 1] + yi + 1];

        const aaGrad = this.grad(aa, xf, yf);
        const abGrad = this.grad(ab, xf - 1, yf);
        const baGrad = this.grad(ba, xf, yf - 1);
        const bbGrad = this.grad(bb, xf - 1, yf - 1);

        const lerp0 = this.lerp(aaGrad, abGrad, u);
        const lerp1 = this.lerp(baGrad, bbGrad, u);

        return (this.lerp(lerp0, lerp1, v) + 1) / 2;
    }

    lerp(a, b, t) {
        return a + t * (b - a);
    }

    fade(t) {
        return t * t * t * (t * (t * 6 - 15) + 10);
    }

    grad(hash, x, y) {
        switch (hash & 0x3) {
            case 0: return x + y;
            case 1: return x - y;
            case 2: return -x + y;
            case 3: return -x - y;
            default: return 0;
        }
    }

    comparator(a, b){
        return a.key < b.key;
    }

    isEmpty() {
        return (this.items.length === 0);
    }

    clear() {
        this.items.length = 0;
    }

    push(item) {
        let n = this.items.length;
        while (n > 0 && !this.comparator(this.items[n >> 1], item)) {
            this.items[n] = this.items[n >> 1];
            n >>= 1;
        }
        this.items[n] = item;
    }

    pop() {
        const top = this.items[0];
        const last = this.items.pop();
        if (this.items.length > 0) {
            this.items[0] = last;
            this.heapify(0);
        }
        return top;
    }

    traverse(callback) {
        this.items.forEach(callback);
    }

    heapify(n) {
        let m = n;
        const left = n << 1;
        const right = left + 1;
        if (left < this.items.length && this.comparator(this.items[left], this.items[m])) m = left;
        if (right < this.items.length && this.comparator(this.items[right], this.items[m])) m = right;
        if (m === n) return;
        const swap = this.items[n];
        this.items[n] = this.items[m];
        this.items[m] = swap;
        this.heapify(m);
    }
}

class PerlinPawn {
    setup() {
        console.log("PerlinPawn");
        this.listen("updatePerlin", "updatePerlin");
        this.listen("showMe", "showMe");
        this.listen("hilite", "hilite");
        this.isConstructed = false;

        this.addEventListener("pointerDown", "onPointerDown");
        this.addEventListener("pointerUp", "onPointerUp");
        this.addEventListener("pointerEnter", "onPointerEnter");
        this.addEventListener("pointerLeave", "onPointerLeave");
        this.addEventListener("pointerTap", "click");
        this.addEventListener("pointerMove", "nop");

        this.maxHeight = 8;
        this.barScale = 0.25;

        if (this.perlinGroup) {
            this.shape.remove(this.perlinGroup);
            this.perlinGroup = null;
        }

        if (this.perlinGroup) {
            this.shape.remove(this.perlinGroup);
            this.perlinGroup = null;
        }

        if (this.buttonSphere) {
            this.shape.remove(this.buttonSphere);
            this.buttonSphere = null;
        }

        this.constructPerlin();
    }

    onPointerDown(p3d) {
        this.say("hiliteRequest", p3d);
    }
    onPointerUp(p3d) {
        this.say("unhiliterequest", p3d);
    }
    onPointerEnter(p3d) {
        this.say("enterHiliteRequest", p3d);
    }
    onPointerLeave(p3d) {
        this.say("leaveHiliteRequest", p3d);
    }

    click(_p3d) {
        this.say("showHideRequest");
    }

    updatePerlin(row) {
        const r = this.actor.rows;
        const s = this.barScale;

        let rg = this.rowGeometry.shift();
        this.rowGeometry.push(rg);
        for(let i = 0; i < rg.children.length; i++) {
            this.setBar(rg.children[i], row[i], r, i);
        }
        for(let i = 0; i < r; i++) {
            this.rowGeometry[i].position.set(0, s / 4, (i - r / 2) * s);
        }
    }

    constructPerlin() {
        const data = this.actor.data;
        const r = this.actor.rows;
        const c = this.actor.columns;
        const s = this.barScale;

        this.perlinGroup = new Worldcore.THREE.Group();
        this.buttonSphere = new Worldcore.THREE.Mesh(
            new Worldcore.THREE.SphereGeometry(0.5,32,16),
            new Worldcore.THREE.MeshStandardMaterial());
        this.buttonSphere.name = "buttonSphere";
        this.buttonSphere.position.y = 3;
        this.shape.add(this.buttonSphere);

        this.color = new Worldcore.THREE.Color();
        this.base = new Worldcore.THREE.Mesh(
            new Worldcore.THREE.BoxGeometry((r + 2) * s, s / 2, (c + 2) * s, 2, 10, 2),
            new Worldcore.THREE.MeshStandardMaterial({color: this.color.getHex()}));
        this.base.position.set(-s / 2, 0, -s / 2);
        this.bar = new Worldcore.THREE.Mesh(
            new Worldcore.THREE.BoxGeometry(s, s, s, 1, 10, 1 ),
            new Worldcore.THREE.MeshStandardMaterial({color: this.color.getHex()}));
        this.base.layers.enable(1); // use this for raycasting
        this.base.castShadow = true;
        this.base.receiveShadow = true;
        this.perlinGroup.add(this.base);

        this.rowGeometry = [];
        for(let i = 0; i < r; i++) {
            let rGroup = new Worldcore.THREE.Group();
            rGroup.position.set(0, s / 4, (i - r / 2) * s);
            for ( let j = 0; j < c; j++) {
                let bar = this.bar.clone();
                bar.material = bar.material.clone();
                let d = data[i][j];
                this.setBar(bar, d, r, j);
                rGroup.add(bar);
            }
            this.rowGeometry.push(rGroup);
            this.perlinGroup.add(rGroup);
        }
        this.showMe(this.actor.visible);
        this.shape.name = "perlin";
        this.isConstructed = true;
    }

    setBar(bar, d, rlength, j) {
        const s = this.barScale;
        //bar.material.color.setRGB((1-d)/2, 1-d*d, (1+d)/2);
        let b = Math.cos((1 - d) * Math.PI);
        b = Math.min(1, (b + 1) / 1.25);
        let g = Math.sin(d * Math.PI);
        g = (g + 1) / 2.2;
        let r = Math.cos(d * Math.PI);
        r = Math.min(1, (r + 1) / 1.25);

        bar.material.color.setRGB(r, g, b);
        d = d * this.maxHeight;
        bar.position.set((j - rlength / 2) * s, s * d / 2, 0);
        bar.scale.set(1, d, 1);
    }

    hilite(color) {
        this.buttonSphere.material.emissive = new Worldcore.THREE.Color(color);
    }

    showMe(visible) {
        if (visible) {
            this.shape.add(this.perlinGroup);
        } else {
            this.shape.remove(this.perlinGroup);
        }
    }
}

export default {
    modules: [
        {
            name: "Drive",
            actorBehaviors: [DriveActor]
        },
        {
            name: "Circle",
            actorBehaviors: [CircleActor],
        },
        {
            name: "Perlin",
            actorBehaviors: [PerlinActor, PerlinNoise],
            pawnBehaviors: [PerlinPawn]
        }
    ]
}

/* globals Worldcore */
