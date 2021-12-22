# Setup a Consortium/Private network with PoA
# Clique documentation
# Part of the course on Ethereum
http://www.acloudfan.com
http://www.bcmentors.com

https://github.com/ethereum/EIPs/issues/225


1. Create directories node1   node2
    * Chaindata will go under the subdirectory 'data'
2. Create accounts:
    * geth --datadir ./node1/data  account new
    0x4F55ab1C724F2738D7Bd074934b7f32A1c797af7
    password: 123

    * geth --datadir ./node2/data  account new
    0x8ff8CBBA305631CAb929BF9648E3C3d0Cc0ecb21
    password: 123

3. Run the puppeth tool to generate the genesis.json file
   puppeth
   - name: testpoaa (!!!!)
   -  2. Configure new genesis
   - 1. Create new genesis from scratch
   - 2. Clique - proof-of-authority
   - 1sec
   - sealer: 0x4F55ab1C724F2738D7Bd074934b7f32A1c797af7
   - hich accounts should be pre-funded? (advisable at least one): BOTH
   - prefund: yes
   - networkID: 1015
   - 2. Manage existing genesis
   - 2. Export genesis configurations



4. Initialize node1 & node2

   cd node1
   geth --datadir ./data init ../testpoaa.json

   cd node2
   geth --datadir ./data init ../testpoaa.json

5. Setup bootnode 
   * we will use the bootnode setup under ../privnw_one/bnode
   * Launch Bootnode
   * Get <<enode>> information for the bootnode

6. Set up the launch script for ./node1 and ./node2 with <<enode>> of bootnode
   * Hint use the script .../privnw_one/node1/launch.boot.sh

7. Launch commands for Starting the node1, node2

* Node 1 Launch command - Mining is ON
======================================
partially working: i have to unlock manually inside the console (i could use a file, as i am doing to mine).
regarding the web app, it s not working with author webapp but it s working with mine :)

KO OK NOW
geth --networkid 1015 --datadir "./data" --bootnodes "enode://e221f6c754092ed40d1cc0b155733a1c0c8335642e45026dfb05896c8eb92d071d0d6b43e9c3c4c45a43ab0980668db1c599fec100c6ee241a8afdb2b6c81366@127.0.0.1:0?discport=30310"  --port  30303 --ipcdisable --syncmode full --rpc --rpccorsdomain "*" --rpcport 8545 © --unlock 0x4F55ab1C724F2738D7Bd074934b7f32A1c797af7 --password password.txt --mine console



geth --networkid 1015 --http --http.port "8545" --http.corsdomain "*" --datadir "./data/" --port "30303" --nodiscover --http.api "eth,net,web3,personal,miner,admin" --nat "any" --allow-insecure-unlock --unlock 0x4F55ab1C724F2738D7Bd074934b7f32A1c797af7  --password password.txt --ipcdisable --syncmode full --mine console

personal.unlockAccount(eth.accounts[0])


this try
geth --networkid 1015 --datadir "./data" --bootnodes "enode://e221f6c754092ed40d1cc0b155733a1c0c8335642e45026dfb05896c8eb92d071d0d6b43e9c3c4c45a43ab0980668db1c599fec100c6ee241a8afdb2b6c81366@127.0.0.1:0?discport=30310"  --port  30303 --ipcdisable --syncmode full --rpc --rpccorsdomain "*" --rpcport 8545 --allow-insecure-unlock --unlock 0x4F55ab1C724F2738D7Bd074934b7f32A1c797af7  --password password.txt --mine console

KO
geth --networkid 1015 --datadir "./data" --bootnodes "enode://e221f6c754092ed40d1cc0b155733a1c0c8335642e45026dfb05896c8eb92d071d0d6b43e9c3c4c45a43ab0980668db1c599fec100c6ee241a8afdb2b6c81366@127.0.0.1:0?discport=30310"  --port  30303 --ipcdisable --syncmode full --rpc --rpccorsdomain "*" --rpcport 8545 --unlock 4F55ab1C724F2738D7Bd074934b7f32A1c797af7 --password 123 --mine console


WORKING
geth --networkid 1015 --datadir "./data" --bootnodes "enode://e221f6c754092ed40d1cc0b155733a1c0c8335642e45026dfb05896c8eb92d071d0d6b43e9c3c4c45a43ab0980668db1c599fec100c6ee241a8afdb2b6c81366@127.0.0.1:0?discport=30310"  --port  30303 --ipcdisable --syncmode full --rpc --rpccorsdomain "*" --rpcport 8545 --allow-insecure-unlock --mine console

geth --networkid 1015 --datadir "./data" --bootnodes "enode://e221f6c754092ed40d1cc0b155733a1c0c8335642e45026dfb05896c8eb92d071d0d6b43e9c3c4c45a43ab0980668db1c599fec100c6ee241a8afdb2b6c81366@127.0.0.1:0?discport=30310"  --port  30303 --ipcdisable --syncmode full --http --http.corsdomain "*" --http.port 8545 --allow-insecure-unlock --mine console

* Node 2 Launch command
=======================
geth --networkid 1015 --datadir "./data" --bootnodes "enode://e221f6c754092ed40d1cc0b155733a1c0c8335642e45026dfb05896c8eb92d071d0d6b43e9c3c4c45a43ab0980668db1c599fec100c6ee241a8afdb2b6c81366@127.0.0.1:0?discport=30310"  --port  30304 --ipcdisable --syncmode full --http --http.corsdomain "*" --http.port 8546 --allow-insecure-unlock --unlock 0x8ff8CBBA305631CAb929BF9648E3C3d0Cc0ecb21 --password password.txt --mine console


geth --networkid 1015 --datadir "./data" --bootnodes "enode://e221f6c754092ed40d1cc0b155733a1c0c8335642e45026dfb05896c8eb92d071d0d6b43e9c3c4c45a43ab0980668db1c599fec100c6ee241a8afdb2b6c81366@127.0.0.1:0?discport=30310"  --port  30304 --ipcdisable --syncmode full --rpc --rpccorsdomain "*" --rpcport 8546 --allow-insecure-unlock --mine console



geth --networkid 1015 --datadir "./data" --bootnodes "enode://e221f6c754092ed40d1cc0b155733a1c0c8335642e45026dfb05896c8eb92d071d0d6b43e9c3c4c45a43ab0980668db1c599fec100c6ee241a8afdb2b6c81366@127.0.0.1:0?discport=30310"  --port  30304 --ipcdisable --syncmode full --rpc --rpccorsdomain "*" --rpcport 8546 © --unlock 0x8ff8CBBA305631CAb929BF9648E3C3d0Cc0ecb21 --password password.txt --mine console


KO
geth --networkid 1015 --datadir "./data" --bootnodes 'enode://83cab5439021f0dcad5a12faa2c628c212bc072d78d2ebf5dd80c3cdd0d625f262bbac924492f5e0c0ce1140fdbfc569dfa5893615e386395bca2f61f551b722@127.0.0.1:30310'  --port  30304 --ipcdisable --syncmode full --rpc --rpccorsdomain "*" --rpcport 8546 --allow-insecure-unlock --unlock 5813e7391b56a2e08ce5f6ac069d9eeb45ff84d8 --password password.txt   console





    * Node1 - Replace <<enode>>
    geth --networkid 1015 --datadir "./data" --bootnodes '<<enode>>'  --port  30303 --ipcdisable --syncmode full --rpc --rpccorsdomain "*" --rpcport 8545 --unlock --password password.txt console 

    * Node2 - Replace <<enode>>
    geth --networkid 1015 --datadir "./data" --bootnodes '<<enode>>'  --port  30304 --ipcdisable --syncmode full --rpc --rpccorsdomain "*" --rpcport 8546 --unlock --password "password.txt" console 

8. Deploy a contract on node1 and execute the contract on node2
   * Use any tool for execution
   * How about enabling RPC on both node1/node2 and using Remix 
     RPC ports need to be different for nod1 & node2
   