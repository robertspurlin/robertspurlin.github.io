---
title: "Installing Soketi on an EKS Cluster with AWS Load Balancer Controller"
thumbnail_path: /images/blog/soketi.png
---

Soketi is an open-source WebSockets server that served as a best-alternative compared to Pusher's paid plans for my team's needs at the time of implementing. We needed to handle about 200-300 active connections to the server, which pushed us out of the Sandbox tier that Pusher offers. With the added benefit of using the Pusher Protocol, we could easily integrate Soketi with the application in the same exact way. 

Fortunately, there is a Helm chart that does quite a bit of heavy lifting for you (https://github.com/soketi/charts) - however, we were not able to find any examples of implementing said Helm chart using AWS Load Balancer Controller as a reverse-proxy of sorts. 

The flow of traffic that my team was after looked a little bit like this:

- User logs into the application/uses the application/whatever,
- The application would reach out to a custom domain over SSL (and the certificate would be renewed automatically by the issuer),
- The Soketi server would upgrade the connection as appropriate and messages would flow between the application and the server in real time. 

The documentation of Soketi mentions the use of a web server to use a custom domain (https://docs.soketi.app/getting-started/backend-configuration/nginx-configuration) but we did not want to manage the certificate or install Nginx on the cluster if it wasn't necessary. What we have on the cluster (and use often), however, is AWS Load Balancer Controller. Using AWS Load Balancer Controller meets the requirement of non-management of the certificate since the Load Balancer handles SSL. 

The Helm chart mentioned above encourages changes as necessary to fit your use case, and that's exactly what we did. We enabled the HPA, Ingress, and Network Watcher in the values.yaml file to appropriately handle overloaded pods without dropping channel connections. 

However, small modifications were needed to the Ingress to make everything work. Below is how the Ingress looks when you download the chart - 

```
ingress:
  enabled: false
  # class: "nginx"
  annotations: {}
    # kubernetes.io/ingress.class: nginx
    # kubernetes.io/tls-acme: "true"
  hosts:
    - host: soketi-example.local
      paths: []

    # - host: soketi.test
    #   paths:
    #     - /
  tls: []
  #  - secretName: soketi-example-tls
  #    hosts:
  #      - soketi-example.local
```

It's apparant that in testing of this chart, the Nginx Ingress Controller was used - we will modify the `class` to use `"alb"` and add our specific annotations as appropriate via the values.yaml file.

```
ingress:
  enabled: true
  class: "alb"
  annotations:
    alb.ingress.kubernetes.io/backend-protocol: HTTP
    alb.ingress.kubernetes.io/load-balancer-name: # the name of the LB that is going to be created
    alb.ingress.kubernetes.io/certificate-arn: # your certificate ARN here
    alb.ingress.kubernetes.io/inbound-cidrs: # your inbound CIDRs here
    alb.ingress.kubernetes.io/ssl-policy: # your SSL policy name here
    alb.ingress.kubernetes.io/scheme: internet-facing
    alb.ingress.kubernetes.io/subnets: # your subnets here
    alb.ingress.kubernetes.io/target-type: ip
    alb.ingress.kubernetes.io/listen-ports: '[{"HTTP": 80}, {"HTTPS":443}, {"HTTP": 6001}, {"HTTPS": 6002}]'
    alb.ingress.kubernetes.io/ssl-redirect: '443' 

    # Health checks
    alb.ingress.kubernetes.io/healthcheck-port: '6001'
    alb.ingress.kubernetes.io/healthcheck-path: /accept-traffic # Already used as a readinessProbe
    alb.ingress.kubernetes.io/success-codes: '200'
```

Another modification to the Ingress is to add the hosts and paths as appropriate (confirm that the templates will read the values appropriately). Note that only one path - `/app/app-key` - is defined. The Soketi server will upgrade the connection on successful authenication. 

```
  hosts:
  - host: # your host name here
    paths:
      - /app/app-key
```

One final modification that we made to the Helm chart is the addition of an ExternalSecret to pass the `SOKETI_DEFAULT_APP_ID`, `SOKETI_DEFAULT_APP_KEY`, and `SOKETI_DEFAULT_APP_SECRET` to the pod - the Soketi server already listens for said env variables to configure on run. 

