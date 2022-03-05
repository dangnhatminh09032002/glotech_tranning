# Thông Tin
- Nguồn học: https://www.youtube.com/watch?v=r6JiWwh-08c&list=PLwJr0JSP7i8At14UIC-JR4r73G4hQ1CXO

## D01 Giới thiệu và cài đặt
- Docker hub

## D02 Docker image, run container
```
docker images
// List ra danh sách các image có trong local
```

```
docker search [keywork-image]
// Tìm kiếm image
```

```
docker pull image:tag
// Pull image về local (tag là phiên bản).
```

```
docker image rm [IMGAE]
// Xóa một image.
```

```
docker run [OPTIONS] IMAGE [COMMAND] [ARG...]
// Khởi chạy iamge thành container
// Có thể có [COMMAND] [ARG...] hoặc không

// Ví dụ
docker run -it ubuntu bash
// Option "-it" tương đương vs "-i -t" nó dùng để tự động vào cmd khi khởi tạo image thành container.
// Dùng lệnh exit đê thoát đồng thời nó cũng sẽ stop container.
```

```
docker ps
// dùng để list các container dg chạy.

docker ps -a
// list tất cả các container.
```

```
docker start [CONTAINER]
docker stop [CONTAINER]
// Dùng để chạy hoặc dùng contianer
```

```
docker attach [CONTAINER]

Ctrl + P + Q
```

```
docker run -it --name [my-name_container] -h [my-host_name_container] [IMAGE]
```

```
docker rm -f
```