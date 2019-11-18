#### What Is My Thinking Process When Create a React App

I have created a lot of vocabulary and mini books learning materials as a teacher. As my son is getting more and
more interested in printed words, I decided to take them out to see if he wants to use them.

He was thrilled to see his own pictures in one of the mini books. He decided to continue to read five of them, finished 
by making one of his own book(with my help)! I decided to make a website to display those works of mine.

I have made dozens of apps using create-react-app, but I realized that I haven't written any articles about it. So I like to
lay out my thinking process while creating this personal project, which is similar for my other react app.

##### Creating Routes

This is going to be a static website, so my first thoughts are how many pages do I need, and what is the functionality of
each page. React is a components-based framework, so each functionality is like a piece of lego in my head. 

With that in mind, I started the project by creating routes in `app.js`. It looks like this:
````javascript
import React from 'react';
import { BrowserRouter, Route, Switch } from 'react-router-dom';
import './App.css';

import BaseLayout from './components/BaseLayout'
import Home from './components/Home'
import Vocabulary from './components/Vocabulary'
import Books from './components/Books'
import About from './components/About'

function App() {
  return (
    <div className="App">
      <BrowserRouter>
        <BaseLayout>
          <Switch>
            <Route exact path='/' component ={Home}/>
            <Route path='/vocabulary' component ={Vocabulary}/>
            <Route path='/books' component ={Books}/>
            <Route path='/about' component ={About}/>
          </Switch>
        </BaseLayout>
      </BrowserRouter>
    </div>
  );
}

export default App;
````

##### Common Components for All Pages
`BaseLayout` contains navbar and footer, which is the common components that are shared by all pages. In `BaseLayout`,
all the other components are treated like children:
````javascript
export default class BaseLayout extends Component {
    render(){
        return(
            <div>
                <div className='navbar'>
                    <div className='nav-links'>
                        <ul>
                            <li><NavLink activeClassName='selected' className='nav-link' exact to ='/'>Home</NavLink></li>
                            <li><NavLink activeClassName='selected' className='nav-link' exact to ='/about'>About</NavLink></li>
                            <li><NavLink activeClassName='selected' className='nav-link' exact to ='/vocabulary'>Vocabulary</NavLink></li>
                            <li><NavLink activeClassName='selected' className='nav-link' exact to ='/books'>Books</NavLink></li>
                        </ul>
                    </div>
                </div>
                <div>
                    {this.props.children}
                </div>
                <div className='footer'>
                    <p> @ 2019 Copyright Sufan Huang</p>
                </div>
            </div>
        )
    }
}
````

##### Creating Home Pages
This is the landing page for the website. I wanted it to be as concise as possible. So there are three major `div`s in this 
component: a `jumbotron`, a `flex-container` for vocabulary silde-images and a `flex-container` for books slide-image. Each of 
the container has `Link` element to the vocabulary list page and the book list page.

##### Creating Children Pages
`Data` in this website are served inside the app, without using any backend. The images of this website are stored in [imgbb](https://imgbb.com/)
, so the Data component only needs to store the `imgUrl`. The vocabulary and book pages are very similar, rendering
their respective data using `map` function.

##### Styling 
Each component has their own `index.css`. Although several components share similar styling, I prefer to keep them seperated. 

##### Links
You can see the finished website [learn-chinese](https://learn-chinese.netlify.com/).
Source code are in [GitHub](https://github.com/sufanHuang/learn-chinese)


