target: server client

build_client:
	cd client && source .env && npm install && npm run build

client: build_client
	cd client && serve -s build

build_server:
	cd server && source .env && go build -o server

server: build_server 
	cd server && ./server
	
test: test_server test_client

test_server:
	cd server && source .env && go run main.go

test_client:
	cd client && source .env && npm run start