#!/bin/bash
# sleep 20
sudo forever start /home/ec2-user/simple-nodejs/index.js > reboot.log
sudo bash -c 'echo -e "2" >> /home/ec2-user/bash.log'