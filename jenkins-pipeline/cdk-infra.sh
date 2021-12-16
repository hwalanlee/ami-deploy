#!/bin/bash
echo "from cdk-infra.sh 1"
cd /var/lib/jenkins/workspace/pipeline-test/cdk-infra && /home/ec2-user/.nvm/versions/node/v17.2.0/bin/npm install && cdk deploy
echo "from cdk-infra.sh 2 "
