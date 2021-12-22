# Run this command to generate the key file
# Script generate.sh
   bootnode -genkey boot.key

# Run this command to launch
# Script launch.sh
   bootnode -nodekey "./boot.key" -addr "127.0.0.1:33333"  -verbosity 9


   enode://63cb50f30e5c30a335902d2b7fd712356943fbdcc489e520fe5912765906fbe37403664afcd0b812b5bb27290bbb618535878a8279fd3db4809597e5934d5deb@127.0.0.1:0?discport=30310