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
- Run `sudo apt install gcc make perl` to install packages needed by VirtualBox Guest Additions
- Install guest additions by going to Devices->Insert Guest Additions CD Image...
- Now you can resize your screen to going to View->Seamless Mode
- Run `sudo apt install docker.io` to install docker
- Run `sudo docker run -it ubuntu /bin/bash` to launch an Ubuntu docker container and run bash
- You can use this container how ever you want, probably to install gigabytes of npm packages

Need to double check how to keep the container running and then reattach to it later
