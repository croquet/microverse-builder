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
        "car.js", "lights.js", "controller.js", "cascade.js"
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
                dataLocation: "./assets/sky/night_sky_16k.jpg",
                dataType: "jpg",
            }
        },
        {
            card: {
                name:"racecarone",
                dataRotation: [0, -Math.PI / 2, 0],
                translation: [0, -1.672, -10],
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
                translation: [-5, 0.4, -10],
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
                translation: [10, 0.4, -10],
                behaviorModules: ["Controller"],
                layers: ["pointer"],
                shadow: true,
                myScope: "B",
                multiuser: false,
                color: 0xff0000
            }
        },
        // {
        //     card: {
        //         name:"block1",
        //         type: "3d",
        //         translation: [10, 10, -15],
        //         behaviorModules: ["Rapier", "Cascade"],
        //         layers: ["walk"],
        //         rapierSize: [2, 2, 2],
        //         rapierShape: "cuboid",
        //         rapierType: "dynamic",
        //         color: 0x000077,
        //     }
        // },
        // {
        //     card: {
        //         name:"block2",
        //         type: "3d",
        //         translation: [10, -0.7, -15],
        //         behaviorModules: ["Rapier", "Cascade"],
        //         layers: ["walk"],
        //         rapierSize: [2, 2, 2],
        //         rapierShape: "cuboid",
        //         rapierType: "static",
        //         color: 0x007700,
        //     }
        // },
        // {
        //     card: {
        //         name:"block3",
        //         type: "3d",
        //         translation: [5, 0, -15],
        //         behaviorModules: ["Rapier", "Cascade", "Drive"],
        //         layers: ["walk", "pointer"],
        //         rapierSize: [2, 1, 2],
        //         rapierShape: "cuboid",
        //         rapierType: "dynamic",
        //         color: 0x770000,
        //     }
        // },
        // {
        //     card: {
        //         name:"block4",
        //         type: "3d",
        //         translation: [5, 2, -20],
        //         behaviorModules: ["Rapier", "Cascade"],
        //         layers: ["walk"],
        //         rapierSize: [2, 2, 2],
        //         rapierShape: "cuboid",
        //         rapierType: "dynamic",
        //         color: 0x000077,
        //     }
        // },
    ];
}
