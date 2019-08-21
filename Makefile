all: build

build-js:
	npm install
	npm run build

docker:
	docker build -t magviz .

build: build-js docker

run: docker
	docker rm -f magviz || true
	docker run -d --name magviz -p 8080:80 magviz
	@echo Access visualization on http://localhost:8080

build-run: build run

docker-distrib: build-js
	docker build --build-arg JS_BUNDLE=bundle.min.js -t magviz .

deploy: build-js
	gcloud config set project magnetic-particle-vis
	gcloud app deploy --quiet app.yaml
