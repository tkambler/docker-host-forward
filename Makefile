.PHONY: build push

build:
	docker build -t tkambler/docker-host-forward .

push:
	docker push tkambler/docker-host-forward
