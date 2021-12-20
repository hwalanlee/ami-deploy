#!/bin/bash
echo "from packer.sh 1"
# packer build /var/lib/jenkins/workspace/ami-deploy/packer-systemctl/example.json
sudo packer build packer-systemctl/example.json
echo "from packer.sh 2"