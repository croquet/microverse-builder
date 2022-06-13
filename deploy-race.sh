#!/bin/sh

DIST=${1}

if [ -z ${DIST} ]
then
    echo "specify the destination dir"
    exit 1;
fi

rsync -r lib index.html $DIST
rsync -r behaviors/race behaviors/croquet ${DIST}/behaviors

mkdir -p ${DIST}/assets/3D

rsync -r assets/3D/{porscheBlue.glb.zip,porscheGreen.glb.zip,porscheRed.glb.zip,porscheYellow.glb.zip,tsukuba2racetrack.glb.zip,tsukuba2racetrackbase.glb.zip} ${DIST}/assets/3D/
rsync -r assets/{avatars,css,fonts} ${DIST}/assets/
rsync -r assets/sky/shanghai_riverside_2k.jpg ${DIST}/assets/sky/
rsync -r assets/images/grid.png ${DIST}/assets/images/

mkdir -p ${DIST}/meta
cp meta/version.txt ${DIST}/meta

mkdir -p ${DIST}/worlds
cp worlds/race.js ${DIST}/worlds/default.js

echo don\'t forget to copy apiKey.js

