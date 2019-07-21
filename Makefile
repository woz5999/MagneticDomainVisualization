all: build

build-js:
	npm install
	npm run build

build: build-js docker

docker:
	docker build -t magviz .

run:
	docker rm -f magviz || true
	docker run -d --name magviz -p 8080:80 magviz
	@echo Access visualization on http://localhost:8080

make build-run: build run

build-distrib: build-js
	docker build --build-arg JS_BUNDLE=bundle.min.js -t magviz .