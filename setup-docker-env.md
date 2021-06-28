How to Setup a Docker Development Environment on Virtualbox Running Ubuntu LTS
==============================================================================

- Download [Virtualbox](https://www.virtualbox.org/wiki/Downloads)
- Download the latest LTS version of [Ubuntu](https://ubuntu.com/download/desktop)
- Install Virtualbox then launch
- Create a new virtual machine with Ubuntu
- Finish installing Ubuntu on the virtual machine
- Launch terminal
- Run `sudo apt update` to install upgraded packages
- Run `sudo apt upgrade` to upgrade packages
- Run `sudo apt install gcc make perl` to install packages needed by VirtualBox Guest Additions
- Install guest additions by going to Devices->Insert Guest Additions CD Image...
- Restart the VM to be able to resize your screen and use the clipboard
- Modify clipboard and file sharing settings by going to the Devices menu on top toolbar
- Run `sudo apt install docker.io` to install docker
- Run `sudo docker run -it -p 3000:3000 ubuntu /bin/bash` to launch an Ubuntu docker container and run bash
- Run `CTRL-p CTRL-q` from inside the container to detach from the container
- Run `sudo docker container ls` to see what containers are running
- Run `sudo docker attach <container_name>` to attach to a running container
- You can use this container how ever you want, probably to install gigabytes of npm packages

Don't know exactly how you can view the finished webpage locally from inside docker, will require some extra research for that.
Very likely you'll need to do some extra work to setup the ports to properly run a webserver inside docker and access the page from the host.
Can write about that here next time.


How to Setup Environment Inside Docker Container
================================================

- Run `apt update` to install upgraded packages
- Run `apt upgrade` to upgrade packages
- Run `apt install git` to install git
- Clone this project and optionally push a ssh key
- Run `apt install vim` to install some utility packages
- Run `apt install nodejs npm` to install nodejs related packages
- Run `apt install sudo wget gnupg` to install mongodb related packages
- Follow [this guide](https://docs.mongodb.com/manual/tutorial/install-mongodb-on-ubuntu/) to install MongoDB up until the section where it asks you to start the server with service or systemctl
- Follow [this thread](https://github.com/microsoft/WSL/issues/1822) to figure out a way to start mongo (I recommend fork for something easy during development, i.e. `mongod --fork --config /etc/mongod.conf`)
- Follow the top-level README to start the service locally
