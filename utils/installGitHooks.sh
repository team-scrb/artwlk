#!/bin/bash

chmod a+x utils/pre-commit
chmod a+x utils/pre-push

ln -f utils/pre-commit .git/hooks/pre-commit
ln -f utils/pre-push .git/hooks/pre-push
