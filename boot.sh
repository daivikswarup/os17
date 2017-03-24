#!/bin/bash
# Running ethereum node and ipfs node 
# Bootstrapping the App

data=d
genesis=genesis.json
port=30304
rpc=8000
path="$( cd "$( dirname "${BASH_SOURCE[0]}" )" && pwd )"
appname=ethPhoto
build=path=/home/aman/workspace/opensoft17/os17/build/
ipfs config --json API.HTTPHeaders.Access-Control-Allow-Origin '["http://localhost:3000", "http://localhost:5001"]'
ipfs config --json API.HTTPHeaders.Access-Control-Allow-Methods '["PUT", "GET", "POST"]'
ipfs config --json API.HTTPHeaders.Access-Control-Allow-Credentials '["true"]'
xterm -e ipfs daemon &
geth --datadir "$data" init "$genesis"
xterm -e geth --identity "nodeB" --rpc --rpcport "8000" --rpccorsdomain "*" --datadir "$data" --port "$port" --ipcapi "admin,db,eth,debug,miner,net,shh,txpool,personal,web3" --rpcapi "db,eth,net,web3,personal" --autodag --networkid 1900 --nat "any" console &
#cd "$build"
#python -m SimpleHTTPServer 3000 &
#x-www-browser http://localhost:3000
cd "$path"/scratch
meteor

