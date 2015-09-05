#!/bin/bash

chmod a+x utils/pre-commit
chmod a+x utils/pre-push

ln utils/pre-commit .git/hooks/pre-commit
ln utils/pre-push .git/hooks/pre-push
