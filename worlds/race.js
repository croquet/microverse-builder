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
        "car.js", "lights.js", "controller.js", "teleporter.js", "grass.js", "cascade.js"
    ];

    Constants.UseRapier = true;

    Constants.DefaultCards = [
        {
            card: {
                name: "track model",
                dataScale: [18, 18, 18],
                translation: [1.6, -3.95, 8.6], // translation: [-12.2, -22.8, -14.2] (X = -10.6, Z = -5.6)
                layers: ["walk"],
                type: "3d",
                dataLocation: "./assets/3D/tsukuba2racetrack.glb.zip",
                singleSided: true,
                shadow: true,
                fullBright: true,
                placeholder: true,
                placeholderSize: [100, 0.01, 100],
                placeholderColor: 0xcccccc,
                placeholderOffset: [0, 0, 0],

            }
        },
        // {
        //     card: {
        //         name:"floor model",
        //         translation:[0, -1.8, 0],
        //         layers: ["walk"],
        //         type: "object",
        //         behaviorModules: ["GridFloor"],
        //         shadow: true,
        //         fullBright: true
        //     }
        // },

        // Light

        {
            card: {
                name: "light",
                layers: ["light"],
                type: "lighting",
                behaviorModules: ["Light"],
                dataLocation: "./assets/sky/shanghai_riverside_2k.jpg",
                dataType: "jpg",
            }
        },

        // Cars

        {
            card: {
                name:"racecarone",
                dataRotation: [0, -Math.PI / 2, 0],
                translation: [-58.5, -1.672, 24],
                startPoint: [-58.5, -1.672, 24],
                layers: ["pointer"],
                type: "3d",
                multiuser: false,
                dataLocation: "./assets/3D/porscheBlue.glb.zip",
                behaviorModules: ["Rapier", "Drive"], 
                myScope: "A",
                color: 0x1341a4
            }
        },
        {
            card: {
                name:"racecartwo",
                dataRotation: [0, -Math.PI / 2, 0],
                translation: [-55, -1.672, 30],
                startPoint: [-55, -1.672, 30],
                layers: ["pointer"],
                type: "3d",
                multiuser: false,
                dataLocation: "./assets/3D/porscheRed.glb.zip",
                behaviorModules: ["Rapier", "Drive"],
                myScope: "B",
                color: 0x76100d
            }
        },
        {
            card: {
                name:"racecarthree",
                dataRotation: [0, -Math.PI / 2, 0],
                translation: [-58.5, -1.672, 36],
                startPoint: [-58.5, -1.672, 36],
                layers: ["pointer"],
                type: "3d",
                multiuser: false,
                dataLocation: "./assets/3D/porscheYellow.glb.zip",
                behaviorModules: ["Rapier", "Drive"],
                myScope: "C",
                color: 0x90610e
            }
        },
        {
            card: {
                name:"racecarfour",
                dataRotation: [0, -Math.PI / 2, 0],
                translation: [-55, -1.672, 42],
                startPoint: [-55, -1.672, 42],
                layers: ["pointer"],
                type: "3d",
                multiuser: false,
                dataLocation: "./assets/3D/porscheGreen.glb.zip",
                behaviorModules: ["Rapier", "Drive"],
                myScope: "D",
                color: 0x287419
            }
        },

        // Controllers

        {
            card: {
                name:"controllerone",
                type: "3d",
                translation: [0, -5, 0], // Default Pos
                behaviorModules: ["Controller"],
                layers: ["pointer"],
                shadow: true,
                myScope: "A",
                multiuser: false,
                color: 0x1341a4
            }
        },
        {
            card: {
                name:"controllertwo",
                type: "3d",
                translation: [0, -5, 0], // Default Pos
                behaviorModules: ["Controller"],
                layers: ["pointer"],
                shadow: true,
                myScope: "B",
                multiuser: false,
                color: 0x76100d
            }
        },
        {
            card: {
                name:"controllerthree",
                type: "3d",
                translation: [0, -5, 0], // Default Pos
                behaviorModules: ["Controller"],
                layers: ["pointer"],
                shadow: true,
                myScope: "C",
                multiuser: false,
                color: 0x90610e
            }
        },
        {
            card: {
                name:"controllerfour",
                type: "3d",
                translation: [0, -5, 0], // Default Pos
                behaviorModules: ["Controller"],
                layers: ["pointer"],
                shadow: true,
                myScope: "D",
                multiuser: false,
                color: 0x287419
            }
        },

        // Teleporters

        {
            card: {
                name:"teleporterone",
                type: "3d",
                translation: [-48, -0.4, 24],
                teleportLocationC: [70, 100, 0], // teleportLocationC: [70, 100, -12],
                teleportPitchC: -(0.36 * Math.PI),
                teleportYawC: (Math.PI / 2),
                teleportLocationP: [0, 200, 4], // teleportLocationP: [0, 160, -8],
                teleportPitchP: -(Math.PI / 2),
                teleportYawP: (Math.PI),
                behaviorModules: ["Teleporter"],
                layers: ["pointer"],
                shadow: true,
                myScope: "A",
                multiuser: false,
                color: 0x1341a4
            }
        },
        {
            card: {
                name:"teleportertwo",
                type: "3d",
                translation: [-48, -0.4, 30],
                teleportLocationC: [70, 100, 8], // teleportLocationC: [70, 100, -4],
                teleportPitchC: -(0.36 * Math.PI),
                teleportYawC: (Math.PI / 2),
                teleportLocationP: [0, 200, 9], // teleportLocationP: [0, 160, -3],
                teleportPitchP: -(Math.PI / 2),
                teleportYawP: (Math.PI),
                behaviorModules: ["Teleporter"],
                layers: ["pointer"],
                shadow: true,
                myScope: "B",
                multiuser: false,
                color: 0x76100d
            }
        },
        {
            card: {
                name:"teleporterthree",
                type: "3d",
                translation: [-48, -0.4, 36],
                teleportLocationC: [70, 100, 16], // teleportLocationC: [70, 100, 4],
                teleportPitchC: -(0.36 * Math.PI),
                teleportYawC: (Math.PI / 2),
                teleportLocationP: [0, 200, 15], // teleportLocationP: [0, 160, 3],
                teleportPitchP: -(Math.PI / 2),
                teleportYawP: (Math.PI),
                behaviorModules: ["Teleporter"],
                layers: ["pointer"],
                shadow: true,
                myScope: "C",
                multiuser: false,
                color: 0x90610e
            }
        },
        {
            card: {
                name:"teleporterfour",
                type: "3d",
                translation: [-48, -0.4, 42],
                teleportLocationC: [70, 100, 24], // teleportLocationC: [70, 100, 12],
                teleportPitchC: -(0.36 * Math.PI),
                teleportYawC: (Math.PI / 2),
                teleportLocationP: [0, 200, 20], // teleportLocationP: [0, 160, 8],
                teleportPitchP: -(Math.PI / 2),
                teleportYawP: (Math.PI),
                behaviorModules: ["Teleporter"],
                layers: ["pointer"],
                shadow: true,
                myScope: "D",
                multiuser: false,
                color: 0x287419
            }
        },

        // Note: Since a returner completes the same task 
        // as the home button, it is obsoleted.
 
    ];
}
