Welcome to myForum!

This is a simple front-end project using ReactJS.

The backend repository will be found here: https://github.com/fusion407/chat-app-backend

The backend is hosted by Onrender: https://chat-app-data.onrender.com/

The front end is hosted by Netlify: https://fusion407-chat-app.netlify.app/

In order to fulfill this projects requirements I must:

1) Create a single page application, meaning only 1 index.html file
2) At least 5 React components must be used
3) At least 3 client-side routes using React Router
4) Use json-server to create a RESTful API
5) Add some styling

In total I have 8 React components; Home, Chat, Message, MessageList, NavBar, User, Users, Login.

There are 4 different client-side routes: 

/chat  -  chatroom  
/users  -  all users  
/login  -  login page  
/  -  Home page

Json-server is being used to make POST, GET, PATCH, and DELETE requests; all data is being fetched in the top level (App.js) and rendered in my lower level components.

Styling was done mostly done by vanilla CSS, but bootstrap was also used to create an Item Group in my Message component.

Blog: https://dev.to/fusion407/creating-a-responsive-chatroom-application-using-reactjs-and-json-server-2bgm

Video: https://www.youtube.com/watch?v=mn5qa6W-ioY&ab_channel=Brady