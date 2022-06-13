#!/bin/sh

DIST=${1}

if [ -z ${DIST} ]
then
    echo "specify the destination dir"
    exit 1;
fi

rsync -r lib index.html assets $DIST
rsync -r behaviors/race behaviors/croquet ${DIST}/behaviors

mkdir -p ${DIST}/worlds
cp worlds/race.js ${DIST}/worlds/default.js

echo don\'t forget to copy apiKey.js

