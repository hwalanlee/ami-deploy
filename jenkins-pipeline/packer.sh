#!/bin/bash
echo "from packer.sh 1"
packer build /var/lib/jenkins/workspace/pipeline-test/packer-systemctl/example.json
echo "from packer.sh 2"