target: server client

build_client:
	source .env && cd client && npm install && npm run build

client: build_client
	cd client && serve -s build

build_server:
	source .env && cd server && go build -o server

server: build_server 
	cd server && ./server