#!/usr/bin/env bash
set -o nounset; set -o errexit; set -o pipefail;

# set color
RED=`tput setaf 1`
GREEN=`tput setaf 2`
YELLOW=`tput setaf 3`
RESET=`tput sgr0`

NGROK_PID=
function cleanup {
  echo "Killing ngrok"
  kill ${NGROK_PID}
}

trap cleanup EXIT
sleep 2

if [[ $(node --version) != $(<.nvmrc) ]]; then
  echo "##################################################################"
  echo "#                                                                #"
  echo "#     PLEASE INSTALL NODE $(<.nvmrc) AND RUN 'npm run dev-init'     #"
  echo "#                                                                #"
  echo "##################################################################"
  exit 1
fi
PROJECT_NAME="$(jq -r '.name' < package.json)"

which jq > /dev/null || (echo "need jq"; exit 1)
[[ -f $HOME/.ngrok2/ngrok.yml ]] || (echo "please add your account's authtoken from this page 'https://dashboard.ngrok.com/get-started'"; exit 1)
which ngrok > /dev/null || (echo "need ngrok, run 'brew cask install ngrok' to install ngrok'"; exit 1)

# create the forwarding config file
SCRIPT_DIR=$(pwd)

# start ngrok
echo "starting ${YELLOW}ngrok${RESET} connection"
ngrok start -none > /dev/null &
sleep 3
NGROK_PID=$!

source "${HOME}/.glg/tc_tools/development.env"
NGROK_PID=$(ps -A | grep -m1 ngrok | awk '{print $1}')
echo "${YELLOW}ngrok${RESET} has been started on PID ${NGROK_PID}"
sleep 2
curl -H "Content-Type: application/json" -d "{ \"addr\": \"$PORT\",\"proto\": \"http\",\"name\": \"${PROJECT_NAME}\"}" -XPOST -i "http://localhost:4040/api/tunnels"
echo "Please wait for 3 seconds until ${YELLOW}ngrok${RESET} forwarding created."
sleep 3 
NGROK_URI="$(curl http://localhost:4040/api/tunnels/${PROJECT_NAME} | jq -r '.public_url')"
echo "Forwarding has been started on ${YELLOW}${NGROK_URI}${RESET}"
wait
