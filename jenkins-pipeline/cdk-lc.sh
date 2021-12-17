#!/bin/bash
echo "from cdk-lc.sh 1"
cd /var/lib/jenkins/workspace/pipeline-test/cdk-lc
npm install
sudo /home/ec2-user/.nvm/versions/node/v17.2.0/bin/cdk bootstrap
sudo /home/ec2-user/.nvm/versions/node/v17.2.0/bin/cdk deploy
echo "from cdk-lc.sh 2 "
