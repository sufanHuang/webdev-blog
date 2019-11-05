#### My First Encounter with Docker and Kitematic

Docker container has been quite a buzz word around. I didn't feel the need of using it untill I decided that I am tired
of installing all the different versions and GUI of database. I wanted to compared how different database handle data
flow different, so I created a real need to get to know Docker.

I would say that it is like a friend that you wish you know earlier, who would have saved so much of your pain!

Okay, what is docker? It is an isolated container where all the software you need, including libraries, system tools, 
code, and runtime for your development are bundled together. I tried to understand it as a small house with all the utilities
a person need to survive without going out to search for fulfilment. 

There are two ways to interact with Docker, through docker cli and kitematic. I tried Kitematic first until it ran into 
some problems.

My goal is to use three kinds of database: SQL(postgres), noSQL(mongoDB) and elasticsearch to interact with a same back-end
blog app. Here are the steps I took:

* Download Docker from [Docker Hub](https://hub.docker.com/?overlay=onboarding). The download wizard is quite straight forward,
one interesting point is that after installed successfully, the Docker icon(whale carrying boxes) is hidden in the Notifications area!

* Create an Docker ID on [hub.docker.com](https://hub.docker.com/). Now I feel like I have extended my power of having some virtual 
boxes ready and it is time to ask the whale to carry in the database images I need.

* Download [Kitematic](https://kitematic.com/), then LOG IN with Docker ID and user name created in previous step. After this,
you will see all these colorful images floating on kitematic that you can put into your container!

As I am writing this article, I am surprised that there are only three steps to get started. I've spent almost a whole day to read
through the documentation and played with several images to get used to both Docker Cli and Kitematic. Here are the documentations
I've read through:

* [Get started with Docker for Windows](https://docs.docker.com/docker-for-windows/)
* [Install Docker Desktop on Windows](https://docs.docker.com/docker-for-windows/install/)
* [Docker for Beginners](https://docker-curriculum.com/)
* [Kitematic User Guide](https://docs.docker.com/kitematic/userguide/#overview)

Okay, this is enough for this article. I need to have a up of coffee and continue my journey with these three database images
in the following articles. Stay tuned!


