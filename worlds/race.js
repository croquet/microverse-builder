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
        "car.js", "lights.js", "controller.js", "teleporter.js", "cascade.js"
    ];

    Constants.UseRapier = true;

    Constants.DefaultCards = [

        // Spawn Point

        {
            card: {
                name: "entrance",
                translation: [-48, 0, 8],
                rotation: [0, Math.PI, 0],
                spawn: "default"
            }
        },

        // World Model (Track)

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
                placeholderOffset: [0, 0, 0]
            }
        },

        // Light

        {
            card: {
                name: "light",
                layers: ["light"],
                type: "lighting",
                behaviorModules: ["Light"],
                dataLocation: "./assets/sky/shanghai_riverside_2k.jpg",
                dataType: "jpg"
            }
        },

        // Cars

        {
            card: {
                name:"racecarone",
                dataRotation: [0, -Math.PI / 2, 0],
                translation: [-58.5, -1.672, 14],
                startPoint: [-58.5, -1.672, 14],
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
                translation: [-55.5, -1.672, 20],
                startPoint: [-55.5, -1.672, 20],
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
                translation: [-58.5, -1.672, 26],
                startPoint: [-58.5, -1.672, 26],
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
                translation: [-55.5, -1.672, 32],
                startPoint: [-55.5, -1.672, 32],
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
                translation: [-48, -0.4, 14],
                teleportLocationC: [70, 100, -4], // teleportLocationC: [70, 100, -12],
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
                translation: [-48, -0.4, 20],
                teleportLocationC: [70, 100, 4], // teleportLocationC: [70, 100, -4],
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
                translation: [-48, -0.4, 26],
                teleportLocationC: [70, 100, 12], // teleportLocationC: [70, 100, 4],
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
                translation: [-48, -0.4, 32],
                teleportLocationC: [70, 100, 20], // teleportLocationC: [70, 100, 12],
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
 
        // Text and Timers

        {
            card: {
                name:"welcome",
                className: "TextFieldActor",
                translation: [-63.5, 3, 40],
                rotation: [0, Math.PI / 2, 0],
                depth: 0.10,
                type: "text",
                runs: [{text: "Welcome To Turbo Track!\nClick Teleporter To Start Timer, Complete Three Laps To Show Final Time. GLHF!"}],
                margins: {left: 30, top: 30, right: 30, bottom: 30},
                backgroundColor: 0xffffff,
                color: 0xffffff,
                frameColor: 0xffffff,
                width: 9,
                height: 2,
                textScale: 0.010,
                shadow: true
            }
        },
        {
            card: {
                name:"timerA",
                className: "TextFieldActor",
                translation: [-63.5, 3, 14],
                rotation: [0, Math.PI / 2, 0],
                depth: 0.10,
                type: "text",
                runs: [{text: "0:00"}],
                margins: {left: 30, top: 30, right: 30, bottom: 30},
                backgroundColor: 0x1341a4,
                color: 0xffffff,
                frameColor: 0xffffff,
                width: 5,
                height: 2,
                textScale: 0.020,
                shadow: true,
                myScope: "A"
            }
        },
        {
            card: {
                name:"timerB",
                className: "TextFieldActor",
                translation: [-63.5, 3, 20],
                rotation: [0, Math.PI / 2, 0],
                depth: 0.10,
                type: "text",
                runs: [{text: "0:00"}],
                margins: {left: 30, top: 30, right: 30, bottom: 30},
                backgroundColor: 0x76100d,
                color: 0xffffff,
                frameColor: 0xffffff,
                width: 5,
                height: 2,
                textScale: 0.020,
                shadow: true,
                myScope: "B",
            }
        },
        {
            card: {
                name:"timerC",
                className: "TextFieldActor",
                translation: [-63.5, 3, 26],
                rotation: [0, Math.PI / 2, 0],
                depth: 0.10,
                type: "text",
                runs: [{text: "0:00"}],
                margins: {left: 30, top: 30, right: 30, bottom: 30},
                backgroundColor: 0x90610e,
                color: 0xffffff,
                frameColor: 0xffffff,
                width: 5,
                height: 2,
                textScale: 0.020,
                shadow: true,
                myScope: "C",
            }
        },
        {
            card: {
                name:"timerD",
                className: "TextFieldActor",
                translation: [-63.5, 3, 32],
                rotation: [0, Math.PI / 2, 0],
                depth: 0.10,
                type: "text",
                runs: [{text: "0:00"}],
                margins: {left: 30, top: 30, right: 30, bottom: 30},
                backgroundColor: 0x287419,
                color: 0xffffff,
                frameColor: 0xffffff,
                width: 5,
                height: 2,
                textScale: 0.020,
                shadow: true,
                myScope: "D",
            }
        }
    ];
}
