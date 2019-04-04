import React, { Component } from 'react';

import './App.css';
import Navbar from  './components/layout/Navbar';
import Buttons from './components/buttons/Button'
import Signin from './components/signin/Signin'

class App extends Component {

constructor(props){
  super(props);
  this.state={
    test:[],
    lawyers:
    [
    {
      lawyerId:"5ca651d277a5e6239428b626"
    }
  ],
companys:
[
  {
    companyId:"5ca6558c77a5e6239428b62d"
  }
],
isLoaded:false

  }

}


componentDidMount(){
  fetch('https://jsonplaceholder.typicode.com/users')
  .then(res => res.json())
  .then(json =>{
    this.setState({
      isLoaded:true,
      test:json
    })
  })
}






  render() {

   var {isLoaded,test}=this.state

   if(!isLoaded){
     return <div>Loading...</div>;
   }
else{
    return (
      <div>
        <Navbar/>,
    <Signin/>,
    <Buttons lawyers={this.state.lawyers}></Buttons>
   <ul>

     {test.map(hi=>(
<li key={hi.id}>
{
 hi.name 
}
</li>
     ))};
     </ul>
      </div>
    
     
    );
  }
}
}

export default App;
