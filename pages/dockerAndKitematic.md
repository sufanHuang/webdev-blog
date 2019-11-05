#### My First Encounter with Docker and Kitematic

Docker container has been quite a buzz word around. I didn't feel the need of using it untill I decided that I am tired
of installing all the different versions of databases and their respective GUIs on my Window computer. I wanted to compared
how different databases handle data flow different, so I forced myself to learn more about what Docker is and how to use it.

Once I learned about it, I would say that it is like a friend that you wish you would know earlier, who would have saved you a 
a lot of time and effort.

Okay, what is docker? It is an isolated container where all the software you need, including libraries, system tools, 
code, and runtime for your development are bundled together. I tried to understand it as a small house with all the utilities
a person need to survive without going out to seek outside help. 

There are two common ways to interact with Docker on Windows: through docker cli and kitematic. I tried Kitematic first 
until it ran into some problems. Docker CLI was actually easier to understand  compared different tabs and dialogs in Kitematic.

My goal is to use three kinds of databases: PostgreSQL, MongoDB and Elasticsearch, to interact with a same back-end
blog app. These are steps I took:

* Download Docker from [Docker Hub](https://hub.docker.com/?overlay=onboarding). The download wizard is quite straight forward.
One interesting point is that after installed successfully, the Docker icon(whale carrying boxes) is hidden in the Notifications area!

* Create a Docker ID on [hub.docker.com](https://hub.docker.com/). Now I feel like I have gain a power of having some virtual 
boxes ready and it is time to ask the whale to carry in the database images I need.

* Download [Kitematic](https://kitematic.com/), then LOG IN with Docker ID and user name created in previous step. After this,
you will see all these colorful images of available images on Kitematic UI that you can use right away.

As I am writing this article, I am surprised that there are only three steps to get started. I've spent almost a whole day to read
through documentation and played with several images to get used to both Docker Cli and Kitematic. Here are links I've read through:

* [Get started with Docker for Windows](https://docs.docker.com/docker-for-windows/)
* [Install Docker Desktop on Windows](https://docs.docker.com/docker-for-windows/install/)
* [Docker for Beginners](https://docker-curriculum.com/)
* [Kitematic User Guide](https://docs.docker.com/kitematic/userguide/#overview)

Okay, this is enough for this article. I need to have a up of coffee and continue my journey with these three database images
in the following articles. Stay tuned!


