import React from "react";
import axios from "axios";
export default class Productlist extends React.Component {

    state = {
      resources: [],
      type: 'All',
    }

    //UseState is a react hook that lets you set some state to react component.

    componentDidMount() {
        axios.get('/Resources') 
        .then(res => {
            console.log(res);
            this.setState({resources: res.data});
        });
    }

    myFilter (type: string) {
      return () => {
          this.setState({type})
      }
  }
    
    render() {
        
        return (
          <>
          <div className="button-container">
            <button className="btn" onClick={this.myFilter("Affordable Housing")}>Affordable Housing</button>
            <button className="btn" onClick={this.myFilter("Financial Education")}>Financial Education</button>
            <button className="btn" onClick={this.myFilter("Job Training")}>Job Training</button>
          </div>
          <div className="bg-white">
            <div className="mx-auto max-w-2xl py-16 px-4 sm:py-24 sm:px-6 lg:max-w-7xl lg:px-8">
              <h2 className="sr-only">resources</h2>
      
              <div className="grid grid-cols-1 gap-y-10 gap-x-6 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 xl:gap-x-8">
             {this.state.resources
             .filter((props: any) => {
              if (this.state.type === "All"){
                  return true 
              } else {
                  return this.state.type === props.Category
              }
            })

              .map((props: any) => (
              <a key={props.id} href={props.href} className="group">
                <div className="forumInformation">
                    <div className="title and content">
                        <h3>{props.posttitle}</h3>
                        <br>{props.content}</br>
                    </div>
                    <div className="username and dateposted">
                        <a>{props.username}</a> 
                        <br>on <small>{props.date}</small></br>
                    </div>
                </div>
               </a>
                ))}
              </div>
            </div>
          </div>
      
          </>
        )
    }
  }
  