---
layout: post
title: "High Availability WordPress Websites Within AWS"
thumbnail_path: blog/wordpress.png
---

The best way to learn something deeply is to try to teach it. So, here is my attempt to provide a crude guideline on how to set up a high-availibility WordPress site. This post assumes -

1. That you have an active Amazon Web Services account,
2. that you are familiar with how to use the Amazon Web Services dashboard,
3. that you are vaguely familiar with how to create an EC2 and RDS instance of your choice,
4. that you understand the basic concepts on how a WordPress site works and how to host one, 
5. and that you will research deeper a concept or technology that you don't understand before you implement it.

**DISCLAIMER**

I am not responsible for any damages and or charges incurred. This setup may and will most likely be expensive, and can inflate your AWS bill. This advice is brought to you as-is without any guarantee. Do not do **anything** in AWS without understanding the costs and or ramifications of what you are about to do. Use at your own risk!

Also, these opinions included in this article are none other than my own. Again, *please* use this article at your own risk - I am not responsible for any damages or costs incurred. 

---

About the concept of 'high availability' WordPress sites - for the purposes of this post, 'high availability' means a website that can handle hundreds of thousands of requests at any given time without any downtime or hiccups, and that the website will adjust it's resources available to ensure uptime. 

To understand the concept, let's consider a situation where one website is being served by one server. No matter how large the server is and how many resources it has, the number of resources that the server will always be fixed (exceptions being if you upgrade the server). Theoretically, the server will only be able to serve a certain amount of requests at any given time before there are no more resources to allocate and the website 'crashes'. If there was a way to adjust the amount of resources a server has based on some metric, i.e. average CPU usage and/or incoming traffic, then we can ensure 100% uptime no matter the amount of requests coming in. 

Fortunately, AWS makes this possible by using Auto Scaling groups. An Auto Scaling group usually has instructions to spin up (scale up) and/or terminate (scale down) EC2 instances based on some metric. It is also more cost effective to use Auto Scaling groups, compared to have x amount of servers running at all times regardless of traffic. 

Specifically, here is what will need to be set up for a WordPress instance to have as high availibility as possible - 

1. An EC2 instance set up to serve a WordPress site (size is up to you - it is only needed to create an AMI image),
2. An Auto Scaling group and Launch Configuration, 
3. An RDS instance to serve the WordPress database (MySQL is needed for WordPress),
4. An EFS system so the EC2 instances can share the wp-uploads directory (S3 can be used here too, but I prefer EFS because it is NFS friendly), 
5. An Elastic Load Balancer (I recommend the Network type),
6. A distribution in CloudFront for CDN/cache purposes. 

Here is my experience with setting up a system like this - 

Set up the EC2 and RDS instance first, and install the WordPress site where WordPress is pointing at the RDS instance. If you are using a SSL certificate (and I recommend that you should), make sure the server is ready and capable to serve insecure (port 80) and secure (port 443) requests. 

Then, create an EFS instance and make sure that the EC2 instance can communicate with the EFS instance (see recommended Security Groups for communication between EC2 and EFS in AWS docs). Once everything is installed, mount the EFS instance where the wp-uploads directory would be and make sure that the EFS instance mounts every time the EC2 instance boots. 

Here, I also installed a script that checks the repository of the WordPress site and pulls down if there is something new that runs every minute. This way, the EC2 instances will stay up to date and in sync with each other. 

When everything is set up accordingly with the WordPress site, create an AMI Image of the EC2 instance. The Launch Configuration will use this image. 

Then, create the Elastic Load Balancer. If you want to see it work, attach the EC2 instance to the Load Balancer and try to make a request to it. I would take your SSL certificate for the website and have the Load Balancer serve it, to solve some SSL headaches that might happen. 

Next, create the Launch Configuration. The Launch Configuration is what the Auto Scaling group will use to spin up new EC2 instances. Set up the Launch Configuration to use the EC2 image you created, in whatever size EC2 instances you choose.

Then, create the Auto Scaling group, and set it up to use the Launch Configuration you just created. Decide the minimum (1 at the least), the maximum, and the preferred amount of instances it should have, and what metric it should use to create and or terminate instances (I used average CPU, but you can also use the amount of traffic coming in to the load balancer). Make sure that it is set up to create the EC2 instance within the Load Balancer. 

As soon as the Auto Scaling group is created, it will create a new EC2 instance based on the instructions within the Launch Configuration. It will also create (at least) two new alarms within CloudWatch - do not delete or edit them, as it is how the Auto Scaling group decides what to do. 

If everything is set up correctly, the new EC2 instance will be a perfect clone of the one you set up earlier and will already be in the Load Balancer (or will be in the process of being checked by the Load Balancer). 

Lastly, we need to configure the CDN. Set up a new distribution, use your settings and behaviors of choice, and have the origin be the Load Balancer. Configure the domain to point to the CDN. 

My suggestion would be to have everything under the wp-admin/ and the wp-includes/ directory uncached, and to have everything else cached for a minimum of an hour. 

(If you don't use any domain provider yet and/or haven't bought the domain yet, I recommend AWS's Route 53 for attachments to load balancers and or CDN's. It has an A record ALIAS feature that solves the issue of the CDN cycling through different IP addresses. If you don't have Route 53, that's okay - just point the www. CNAME to the CDN, and have the A @ record point somewhere that can redirect to the www. One way is to set up one of the EC2 instances within the Auto Scaling group to be protected from scaling in, allocate an elastic IP to the EC2 instance, and point the A record there. This setup may put extra stress on that server in peak traffic, FYI...)

Done! You now have a lean, mean, WordPress machine that can handle a good amount of requests without breaking a sweat. You can now suspend or terminate the EC2 instance you created in the beginning (to create the image).

A couple of notes here - 

I set up the WordPress URL with the https://, so that if WordPress recieves an insecure request, it will try to redirect. My suggestion would be to redirect all insecure requests via the CDN so it doesn't redirect to iself as well.

You can set up alarms that will alert you when the Auto Scaling group scales in, out, or has an error. I suggest you do so. 

Again, I am not responsible for any damages and or charges incurred. This advice is brought to you as-is without any guarantee. Use at your own risk!

In closing, AWS makes it pretty simple to have a high-availibility WordPress site that can handle an ubsurd amount of requests. I hope that this gives some guidance to people trying to find long-term WordPress infrastructure solutions.
