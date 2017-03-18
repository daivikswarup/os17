# os17

## Requirements ##
### Meteor ###
    $curl https://install.meteor.com/ | sh
    
    
## Testing with a private network ## 

### Start listening IPFS localhost ####
    $ipfs config --json API.HTTPHeaders.Access-Control-Allow-Origin '["http://localhost:3000", "http://localhost:5001"]'
    $ipfs config --json API.HTTPHeaders.Access-Control-Allow-Methods '["PUT", "GET", "POST"]'
    $ipfs config --json API.HTTPHeaders.Access-Control-Allow-Credentials '["true"]'
    $ipfs daemon
### Start Listening Ethererum node ###  
    $geth --datadir path/to/dataDir init path/to/genesis.json
    $geth --identity "nodeB" --rpc --rpcport "8000" --rpccorsdomain "*" --datadir "./d1" --port "PORT" --ipcapi "admin,db,eth,debug,miner,net,shh,txpool,personal,web3" --rpcapi "db,eth,net,web3" --autodag --networkid 1900 --nat "any" console
    # Each node should have different PORT 
### Launch Meteor ###  
    $cd path/to/scratch/
    $meteor
    
