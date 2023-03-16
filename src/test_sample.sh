#!/usr/bin/env bash

echo "Something to stdout"
echo "Something to stderr" >&2
echo "Another thing to stdout"

if [ "$1" == "exitWithCode27" ]; then
  exit 27
fi
