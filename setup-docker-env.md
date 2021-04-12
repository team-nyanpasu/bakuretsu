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
- Restart the VM to be able to resize your screen by going to View->Seamless Mode
- Run `sudo apt install docker.io` to install docker
- Run `sudo docker run -it ubuntu /bin/bash` to launch an Ubuntu docker container and run bash
- Run `CTRL-p CTRL-q` from inside the container to detach from the container
- Run `sudo docker container ls` to see what containers are running
- Run `sudo docker attach <container_name>` to attach to a running container
- You can use this container how ever you want, probably to install gigabytes of npm packages

Don't know exactly how you can view the finished webpage locally from inside docker, will require some extra research for that.
Very likely you'll need to do some extra work to setup the ports to properly run a webserver inside docker and access the page from the host.
Can write about that here next time.
