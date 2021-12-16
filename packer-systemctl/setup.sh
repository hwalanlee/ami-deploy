#!/bin/bash
sleep 20
sudo yum update -y     # os update
sudo amazon-linux-extras install epel -y    # install nodejs
sudo yum-config-manager --enable epel
sudo yum -y install nodejs
sudo yum -y install git         # install git
sudo npm install forever -g     # install forever
git clone https://github.com/hwalanlee/simple-nodejs.git    # clone repo
cd /home/ec2-user/simple-nodejs
npm install
sleep 20
sudo bash -c 'echo -e "\nsh /home/ec2-user/atbooting.sh" >> /etc/rc.local'  # register launch programeee
sudo chmod +x /etc/rc.local
sudo chmod +x /home/ec2-user/atbooting.sh
sudo chmod +x /home/ec2-user/simple-nodejs/index.js
sudo bash -c 'echo -e "\n[Install]\nWantedBy=multi-user.target" >> /lib/systemd/system/rc-local.service'
# sudo bash -c 'echo -e "User=ec2-user\n\n[Install]\nWantedBy=multi-user.target" >> /lib/systemd/system/rc-local.service'
sudo systemctl enable rc-local.service
sudo systemctl start rc-local.service
# sudo systemctl status rc-local.service
sudo bash -c 'echo -e "1" >> /home/ec2-user/bash.log'