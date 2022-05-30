// tutorial1.js
// Copyright 2022 by Croquet Corporation, Inc. All Rights Reserved.
// https://croquet.io
// info@croquet.io

export function init(Constants) {
    Constants.AvatarNames = [
        "newwhite", "madhatter", "marchhare", "queenofhearts", "cheshirecat", "alice"
    ];

    Constants.SystemBehaviorDirectory = "behaviors/croquet";
    Constants.SystemBehaviorModules = [
        "menu.js", "elected.js", "propertySheet.js", "stickyNote.js", "avatar.js"
    ];

    Constants.UserBehaviorDirectory = "behaviors";
    Constants.UserBehaviorModules = [
        "default/lights.js", "tutorial/gridFloor.js", "tutorial/joeTheBox.js", "default/bitcoinTracker.js",
    ];

    const frameColor = 0x888888;

    Constants.DefaultCards = [
        {
            card: {
                name:"world model",
                type: "3d",
                dataLocation: "./assets/3D/artgallery_042122.glb.zip",
                dataScale:[1,1,1],
                singleSided: true,
                shadow: true,
                layers: ["walk"],
                translation:[0, -1.7, 0],
                shadow: true,

                placeholder: true,
                placeholderSize: [100, 0.01, 100],
                placeholderColor: 0xcccccc,
                placeholderOffset: [0, -1.7, 0],
            }
        },
        {
            card: {
                name: "light",
                layers: ["light"],
                type: "lighting",
                behaviorModules: ["Light"],
                clearColor: 0xaabbff,
            }
        },
        {
            card: {
                name: "image card",
                translation: [0, 2.05, -10],
                //rotation: [0, Math.PI / 2, 0],
                scale: [4, 4, 4],
                type: "2d",
                textureType: "image",
                textureLocation: "./assets/images/CroquetLogo_RGB.jpg",
                fullBright: true,
                frameColor: 0xcccccc,
                color: 0xffffff,
                cornerRadius: 0.05,
                depth: 0.05,
                shadow: true,
            }
        },
        {
            card: {
                name: "generator card",
                //translation: [10, -1.47, 0],
                translation: [0, -1.47, -10],
                rotation: [0, Math.PI ,0],
                //rotation: [0,0.7,0,0.7],
                type: "3d",
                dataLocation: "./assets/3D/PowerGen.glb",
                modelType: "glb",
                layers:["pointer"],
            }
        }, 
        {
            card: {
                name: "bitcointracker",
                //translation: [9.175, -0.145, 1.075],
                translation: [1.0825, -0.140, -9.175],
                rotation: [0, 0, 0],
                scale: [0.75, 0.75, 0.75],
                type: "2d",
                textureType: "canvas",
                textureWidth: 1024,
                textureHeight: 768,
                width: 1,
                height: 0.75,
                frameColor: frameColor,
                // color: 0xffffff,
                depth: 0.05,
                cornerRadius: 0.1,
                behaviorModules: ["Elected", "BitcoinTracker"],
            },
            id: "main",
        },
        {
            card: {
                name:"kva logo",
                translation: [-0.35, 0.30, 0.1],
                scale: [0.25, 0.25, 0.25],
                parent: "main",
                type: "2d",
                dataLocation: "./assets/SVG/kva-solid.svg",
                depth: 0.05,
                color: 0xffffff,
                frameColor: frameColor,
                behaviorModules: ["BitLogo"]
            }
        },
        {
            card: {
                name:"bar graph",
                translation:[0, -0.3, 0.1],
                color: 0xEEEEEE,
                frameColor: frameColor,
                type: "object",
                height: 0.4,
                parent: "main",
                behaviorModules: ["BarGraph"],
            }
        },
        {
            card: {
                name: "portal",
                className: "PortalActor",
                //translation: [-10, 0, 0],
                translation: [-12.25, -0.40, -10.2],
                rotation: [0, Math.PI/2, 0],
                type: "2d",
                layers: ["pointer", "portal"],
                //behaviorModules: ["Spin"],
                color: 0xFF66CC,
                frameColor: frameColor,
                width: 1.8,
                height: 2.4,
                depth: 0.05,
                cornerRadius: 0.05,
                multiuser: true,
                portalURL: "?world=generator-demo",
            }
        },
        
        
    ];
}
