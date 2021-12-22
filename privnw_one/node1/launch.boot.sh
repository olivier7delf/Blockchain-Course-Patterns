# REPLACE THE <<enode>> information from the enode from bootnode process
# Copy this command to integrated terminal to launch node 1
# Node 1

geth --networkid 1015 --datadir "./data" --bootnodes 'enode://63cb50f30e5c30a335902d2b7fd712356943fbdcc489e520fe5912765906fbe37403664afcd0b812b5bb27290bbb618535878a8279fd3db4809597e5934d5deb@127.0.0.1:0?discport=30310' --port  30303 --ipcdisable --syncmode full console

# 2 bootnodes:
geth --networkid 1015 --datadir "./data" --bootnodes 'enode://63cb50f30e5c30a335902d2b7fd712356943fbdcc489e520fe5912765906fbe37403664afcd0b812b5bb27290bbb618535878a8279fd3db4809597e5934d5deb@127.0.0.1:0?discport=30310,enode://8410d56df1acde3f8dbfee02b60860fa3af821764299543e5eb80fb872dfceb8fe3312d5ae6b2ca82d60b6955754af210dcd812ce6fce698da5672571f6bf785@127.0.0.1:0?discport=30311' --port  30303 --ipcdisable --syncmode full console

