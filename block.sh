#!/bin/bash
mkdir app/blocks/$1
touch app/blocks/$1/$1.styl
touch app/blocks/$1/$1.jade

echo -e "@import '../blocks/$1/*'" >> app/styles/main.styl
echo -e "mixin $1()\n\t+b.$1&attributes(attributes)" >> app/blocks/$1/$1.jade
echo -e ".$1" >> app/blocks/$1/$1.styl

echo "Блок $1 создан"
