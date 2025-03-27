# Next-Gen Connect 

Samuel Chiemerie Onyema

<a href="">sconyema@uclan.ac.uk</a>

<!-- TABLE OF CONTENTS -->
<details>
  <summary><h2>Table of Contents</h2></summary>
  <ol>
    <li>
      <a href="#about-the-project">About The Project</a>
      <ul>
        <li><a href="#tools">Development tools</a></li>
      </ul>
    </li>
    <li>
      <a href="#getting-started">Getting Started</a>
      <ul>
        <li><a href="#prerequisites">Prerequisites</a></li>
        <li><a href="#installation">Installation</a></li>
      </ul>
    </li>
    <li><a href="#usage">Usage</a></li>
    <li><a href="#contact">Contact</a></li>
    <li><a href="#acknowledgments">Acknowledgments</a></li>
  </ol>
</details>



<!-- ABOUT THE PROJECT -->
## About The Project

This project is a web applicaion solely developed and designed to support computing students in engaging and discovery employability events oppoturnities such as internships,mentorships , workshops and competition programs. The aim is to provide a centralized platform where students personalized events that help support thier academic journey and career path ways.

This platform allows users (students, organizers) to register and host events, Both students and organizer van sign up for an account on specific user role based. Students can browse through events and also filter events by category, register for events and manage registered events, while Organizers can create events by submitting neccessary information and also manage thier events and registered attendees.

The project is built using React and TailwindCSS for a responsive and user-friendly frontend. On the backend, it uses Firebase for authentication, user role management, and real time storage. The application comes with different features like event search filters by categories, reponsive calendar page that shows students all availble events and shows organizers their own created events. Users can change their passwords on login in and the sign up system has a email autheticator system.


<p align="right">(<a href="#readme-top">back to top</a>)</p>

### Development tools

* React.JS
* TailwindCSS
* Vite Bundle
* Swiper.js
* React Big Calendar (momemt)
* React Icons
* Firebase (Firestore)


<p align="right">(<a href="#readme-top">back to top</a>)</p>

<!-- GETTING STARTED -->
## Getting Started

To get the project running, you must have the latest Node.js and npm installed in your computer and follow this simple steps 


### Prerequisites

This is an example of how to list things you need to use the software and how to install them.

* Node.js installed
* npm (comes with Node.js)
  ```sh
  npm install npm@latest -g
  ```
* IDE like Webstorm or VS Code 
* npm install (this installs all the packages and dependecies in the project)

### Installation

_Below is an example of how you can instruct your audience on installing and setting up your app. This template doesn't rely on any external dependencies or services._


1. Clone the repo
   ```sh
   git clone https://github.com/SCOnyema/NextGen-Connect02
   ```
2. Install NPM packages
   ```sh
   npm install
   ```
3. Enter your API in `firebaseConfig.jsx`
   ```js
   const API_KEY = 'ENTER YOUR API';
   ```
4. Change git remote url to avoid accidental pushes to base project
   ```sh
   git remote set-url origin github.com/SCOnyema/NextGen-Connect02
   git remote -v # confirm the changes
   ```
5. Run the developement sever
   ```sh
   npm run dev
   ```


<p align="right">(<a href="#readme-top">back to top</a>)</p>


<!-- USAGE EXAMPLES -->
## Usage

Once the app is running locally, users (student, organizer) can sign up and login

Students can:
Broswer through events on the front pages and dashboard
In dashboard student can filter events by categories 
Register and manage events 

Organizers can:
Login to thier account 
Create and host events
Manage events
Manage attendee list


Student Dashboard 

![Screenshot 2025-03-27 234319](https://github.com/user-attachments/assets/2398b38d-4fed-4d69-8601-54722d03debb)


Organizer Dashboard 

![image](https://github.com/user-attachments/assets/f954bb68-e88d-41a7-b27c-cadcaf8c4fd1)



<p align="right">(<a href="#readme-top">back to top</a>)</p>


<!-- CONTACT -->
## Contact

Samuel Chiemerie - sconyema@uclan.ac.uk - [GitHub Account](https://github.com/SCOnyema)

Project Link: [https://github.com/SCOnyema/NextGen-Connect02](https://github.com/SCOnyema/NextGen-Connect02)

<p align="right">(<a href="#readme-top">back to top</a>)</p>



<!-- ACKNOWLEDGMENTS -->
## Acknowledgments

I would like to express my gratitude to my project supervisor for his consistent feedback, gudiance, and support through out the development phase of this project. His insights played a key role in helping me refine my approach and ideas.

Additional thanks to:

* Firebase Documentation [Firebase](https://firebase.google.com/docs) for the backend integration and setup help 
* TailwindCSS Documentation [TailwindCSS](https://tailwindcss.com/docs/installation/using-vite) for making styling fast and flexible for me
* Helpful Dashboard structure reference (https://www.youtube.com/watch?v=n_fUlVNAyrE) for inspiring my dashboard structure
* Helpful React references I came across include multiple Stack Overflow websites 


<p align="right">(<a href="#readme-top">back to top</a>)</p>
