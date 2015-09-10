#!/bin/bash

chmod a+x utils/pre-commit
ln -f utils/pre-commit .git/hooks/pre-commit

chmod a+x utils/pre-push
ln -f utils/pre-push .git/hooks/pre-push

chmod a+x utils/post-rebase
ln -f utils/post-rebase .git/hooks/post-rebase
