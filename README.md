# SejutaCita Assignment

This the project required by SejutaCita to fullfield the nodejs backend engineer recruitment

## Stack
* Expressjs
* MongoDB

## Docs
Documentation of the API itself could be found [here](https://documenter.getpostman.com/view/11571298/TzseKmVG)

## Admin credentials
> username: admin <br>
> pasword: admin

## API Flow
![SejutaCita](https://user-images.githubusercontent.com/43875921/127756412-4b5b5d80-6264-4cfc-a138-5c8db3363e8d.jpeg)

## Docker
This project uses the latest Node.JS Alpine Images. The image registry is hosted on docker hub and can be found [here](https://hub.docker.com/r/reynadi17/sejutacita)

## Kubernetes
This project currently uses Amazon Web Services Elastic Compute 2 `t2.2xlarge` as a master and `t2.medium` as a node. The following are the Kubernetes Configuration File contained in the `kube` directory included with the load balancer services
![image](https://user-images.githubusercontent.com/43875921/127748396-e76a6daf-7b09-4ed4-b264-9f25e43143c0.png)
