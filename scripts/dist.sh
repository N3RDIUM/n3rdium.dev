#!/bin/sh

if [ ! -d "dist" ]; then
    rm -r dist/
fi
cp -r ./src ./newsrc
mv newsrc dist

python -m pip install -U -r requirements.txt

if [ ! -d "permafrost" ]; then
    git clone https://github.com/n3rdium/permafrost.git
else
    cd permafrost || exit 1
    git pull
    cd ..
fi

python -m pip install -U -r permafrost/requirements.txt
python -m permafrost.main
python -m scripts.dist
