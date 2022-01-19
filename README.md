# tkambler/docker-host-forward

A container that exposes host ports.

```
# On Linux
docker run --rm -e HOST_PORTS=8080,80801 -e HOST_PLATFORM=linux tkambler/docker-host-forward

# On MacOS
docker run --rm -e HOST_PORTS=8080,80801 -e HOST_PLATFORM=darwin tkambler/docker-host-forward

# Containers can now reach ports 8080 and 8081 on the host via ports 8080 and 8081 on the container.
```
