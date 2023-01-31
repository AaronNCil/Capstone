import React from "react";
import axios from 'axios';


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
                    <div className="aspect-w-1 aspect-h-1 w-full overflow-hidden rounded-lg bg-gray-200 xl:aspect-w-7 xl:aspect-h-8">
                      <img
                        src={"images/logo.png"}
                        alt={""}
                        className="h-full w-full object-cover object-center group-hover:opacity-75"
                      />
                    </div>
                    <h3 className="mt-4 text-sm text-gray-700">{props.Title}</h3>
                    <p className="mt-1 text-lg font-medium text-gray-900">{props.Address}</p>
               </a>
                ))}
              </div>
            </div>
          </div>
      
          </>
        )
    }
  }