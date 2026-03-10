#!/bin/sh

# build folder
if [ ! -d "build" ]; then
    rm -rf build/
fi

# dist folder
if [ ! -d "dist" ]; then
    rm -r dist/
fi
rsync -a src/ dist/

# clone/sync repos and install/update deps
if [ ! -d "permafrost" ]; then
    git clone https://github.com/n3rdium/permafrost.git
else
    cd permafrost || exit 1
    git pull
    cd ..
fi

python -m pip install -U -r permafrost/requirements.txt

if [ ! -d "doorknob" ]; then
    git clone https://github.com/n3rdium/doorknob.git
else
    cd doorknob || exit 1
    git pull
    cd ..
fi

python -m pip install -U -r doorknob/requirements.txt

# run
python -m permafrost.main
python -m doorknob.main

# check
ls -Ra
