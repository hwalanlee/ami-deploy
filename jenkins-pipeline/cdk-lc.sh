#!/bin/bash
echo "from cdk-lc.sh 1"
cd cdk-lc
npm install
cdk bootstrap --require-approval never
cdk deploy --require-approval never
echo "from cdk-lc.sh 2 "
