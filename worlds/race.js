// Copyright 2022 by Croquet Corporation, Inc. All Rights Reserved.
// https://croquet.io
// info@croquet.io

export function init(Constants) {
    Constants.AvatarNames = [
        "newwhite", "madhatter", "marchhare", "queenofhearts", "cheshirecat", "alice"
    ];

    Constants.SystemBehaviorDirectory = "behaviors/croquet";
    Constants.SystemBehaviorModules = [
        "menu.js", "elected.js", "propertySheet.js", "stickyNote.js", "rapier.js", "avatarEvents.js"
    ];

    Constants.UserBehaviorDirectory = "behaviors/race";
    Constants.UserBehaviorModules = [
        "car.js", "lights.js", "controller.js", "cascade.js", "teleporter.js"
    ];

    Constants.UseRapier = true;

    Constants.DefaultCards = [
        {
            card: {
                name:"world model",
                dataScale:[1, 1, 1],
                translation:[0, -1.8, 0],
                layers: ["walk"],
                type: "3d",
                dataLocation: "./assets/3D/tsukuba2racetrack.glb.zip",
                singleSided: true,
                shadow: true,
                placeholder: true,
                placeholderSize: [100, 0.01, 100],
                placeholderColor: 0xcccccc,
                placeholderOffset: [0, 0, 0],

            }
        },
        {
            card: {
                name: "light",
                layers: ["light"],
                type: "lighting",
                behaviorModules: ["Light"],
                dataLocation: "./assets/sky/abandoned_parking_4k.jpg",
                dataType: "jpg",
            }
        },
        {
            card: {
                name:"racecarone",
                dataRotation: [0, -Math.PI / 2, 0],
                translation: [0, -1.672, -10],
                startPoint: [0, -1.672, -10],
                layers: ["pointer"],
                type: "3d",
                multiuser: true,
                dataLocation: "./assets/3D/porscheBlue.glb.zip",
                behaviorModules: ["Rapier", "Drive"], 
                myScope: "A",
                color: 0x0000ff
            }
        },
        {
            card: {
                name:"racecartwo",
                dataRotation: [0, -Math.PI / 2, 0],
                translation: [5, -1.672, -10],
                startPoint: [5, -1.672, -10],
                layers: ["pointer"],
                type: "3d",
                multiuser: true,
                dataLocation: "./assets/3D/porscheRed.glb.zip",
                behaviorModules: ["Rapier", "Drive"],
                myScope: "B",
                color: 0xff0000
            }
        },
        {
            card: {
                name:"controllerone",
                type: "3d",
                translation: [10.2, 375, -12],
                behaviorModules: ["Controller"],
                layers: ["pointer"],
                shadow: true,
                myScope: "A",
                multiuser: false,
                color: 0x0000ff
            }
        },
        {
            card: {
                name:"controllertwo",
                type: "3d",
                translation: [10.2, 375, 7.9],
                behaviorModules: ["Controller"],
                layers: ["pointer"],
                shadow: true,
                myScope: "B",
                multiuser: false,
                color: 0xff0000
            }
        },
        {
            card: {
                name:"teleporterone",
                type: "3d",
                translation: [-5, 0.4, -10],
                teleportLocation: [10, 380, -10],
                teleportPitch: -(Math.PI / 2),
                behaviorModules: ["Teleporter"],
                layers: ["pointer"],
                shadow: true,
                myScope: "A",
                multiuser: false,
                color: 0x0000ff
            }
        },
        {
            card: {
                name:"teleportertwo",
                type: "3d",
                translation: [10, 0.4, -10],
                teleportLocation: [10, 380, 10],
                teleportPitch: -(Math.PI / 2),
                behaviorModules: ["Teleporter"],
                layers: ["pointer"],
                shadow: true,
                myScope: "B",
                multiuser: false,
                color: 0xff0000
            }
        },
        {
            card: {
                name:"teleporteroneback",
                type: "3d",
                translation: [11.8, 375, -7.2],
                teleportLocation: [0, 0, 0],
                teleportPitch: 0,
                behaviorModules: ["Teleporter"],
                layers: ["pointer"],
                shadow: true,
                myScope: "A",
                multiuser: false,
                color: 0x0000ff
            }
        },
        {
            card: {
                name:"teleportertwoback",
                type: "3d",
                translation: [11.8, 375, 12.6],
                teleportLocation: [0, 0, 0],
                teleportPitch: 0,
                behaviorModules: ["Teleporter"],
                layers: ["pointer"],
                shadow: true,
                myScope: "B",
                multiuser: false,
                color: 0xff0000
            }
        },
    ];
}
