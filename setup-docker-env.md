How to Setup a Docker Development Environment on Virtualbox running Ubuntu LTS
========================================================================================

- Download Virtualbox: https://www.virtualbox.org/wiki/Downloads
- Download the latest LTS version of Ubuntu: https://ubuntu.com/download/desktop
- Install Virtualbox then launch
- Create a new virtual machine with Ubuntu
- Finish installing Ubuntu on the virtual machine
- Launch terminal
- Run `sudo apt upgrade` to upgrade packages
- Run `sudo apt update` to install upgraded packages
- Run `sudo apt install docker.io` to install docker
- Run `sudo docker run -it ubuntu /bin/bash` to launch an Ubuntu docker container and run bash

Need to double check how to keep the container running and then reattach to it later
