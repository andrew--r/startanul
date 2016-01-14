#!/bin/bash
mkdir src/blocks/$1
touch src/blocks/$1/$1.styl
touch src/blocks/$1/$1.jade

echo -e "@import \"../blocks/$1/*\"" >> src/styles/main.styl
echo -e "mixin $1()\n\t.$1&attributes(attributes)" >> src/blocks/$1/$1.jade

echo "Блок $1 создан"