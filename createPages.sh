#!/bin/bash
for filename in pages/*.md; do
    modifiedPath=${filename/pages/public}
    finalFile=${modifiedPath/md/html}

    showdown makehtml -i $filename -o $finalFile

    node convert.js $finalFile
done
