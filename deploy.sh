#!/bin/bash
set -e

SERVER="console.spec.whatwg.org"
WEB_ROOT="console.spec.whatwg.org"

BRANCH="`git rev-parse --abbrev-ref HEAD`"
if [ "$BRANCH" == "HEAD" ]; then # Travis does this for some reason
    BRANCH=$TRAVIS_BRANCH
fi

rm -rf $WEB_ROOT || exit 0
make api

echo "Living standard output to $WEB_ROOT"
echo ""
find $WEB_ROOT -print
echo ""

if [ $BRANCH != "master" ] ; then
    echo "Not on master branch; skipping deploy"
    exit 0
fi

if [ "${TRAVIS_PULL_REQUEST}" != "false" ]; then
    echo "Building a pull request; skipping deploy"
    exit 0
fi

openssl aes-256-cbc -K $encrypted_b9b018a1d67d_key -iv $encrypted_b9b018a1d67d_iv -in console_spec_id_rsa.enc -out console_spec_id_rsa -d
scp -r -i console_spec_id_rsa $WEB_ROOT $DEPLOY_USER@$SERVER:
