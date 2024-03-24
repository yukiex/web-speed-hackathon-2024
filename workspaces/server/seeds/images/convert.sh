#!/bin/bash
#
# (C) yukiex Corporation
#

for file in ./*.jxl; do
    magick "$file" "${file%.jxl}.webp"
done

# END
