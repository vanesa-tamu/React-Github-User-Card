import React from 'react';
import axios from 'axios'
import './App.css';

class App extends React.Component{
  constructor(){
    super();
    this.state = {
      githubUser: {},
      followers: []
    }
  }

  componentDidMount(){
    axios.get(`https://api.github.com/users/vanesa-tamu`)
      .then((res) => {
        console.log('vanesa', res.data)
        this.setState({githubUser: res.data})
      })
      .catch(error => console.error('error in GET user', error));
    
      axios.get(`https://api.github.com/users/vanesa-tamu/followers`)
        .then(f => {
          console.log('followers', f.data)
          this.setState({followers: f.data})
        })
        .catch(error => console.error('error in GET followers', error));
  }

  render(){
    return(
      <div className='App'>
        <h1>GitHub Information</h1>
        <div>
            <img src={this.state.githubUser.avatar_url} alt='vanesa'/>
            <div className='userInfo'>
              <h4>Name: {this.state.githubUser.login}</h4>
              <p>Bio: {this.state.githubUser.bio}</p>
              <p>Followers: {this.state.githubUser.followers}</p>
            </div>
        </div>

        <h1>Followers</h1>
        <div className='followers'>
          {this.state.followers.map(follower => (
            <a href={follower.html_url}  key={follower.id}>
            <div className='follower'>
              <img 
                className="follower-img"
                alt={follower.login}
                src={follower.avatar_url}
              />
              <h4>{follower.login}</h4>
            </div>
          </a>
          ))}
        </div>
      </div>
    )
  }
}

export default App;
