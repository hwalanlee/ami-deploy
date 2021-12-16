#!/bin/bash
echo "from cdk-infra.sh 1"
cd /var/lib/jenkins/workspace/pipeline-test/cdk-infra && sudo npm install && cdk deploy
echo "from cdk-infra.sh 2 "
