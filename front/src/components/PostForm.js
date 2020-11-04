import React, { Component } from "react";


class PostForm extends Component {
  constructor(props) {
    super(props);
    this.state = {
      useId: "",
      address: "",
      parkingFee: "",
    };
  }

  changeHandler = (event) => {
    this.setState({ [event.target.name]: event.target.value });
  };

  submitHandler = (event) => {
    event.preventDefault();
    console.log(this.state)

     this.sentHttpRequest("post","http://localhost:3001/user_posts/insert_data", this.state)


    // axios.post("http://localhost:3001/user_posts/insert_data", this.state)
    // .then(response=>{
    //   console.log(response)
    // }).catch(error=>{
    //   console.log(error)
    // })
  };

   sentHttpRequest = (method, url, data) => {
        return fetch(url, {
            method: method,
            body: JSON.stringify(data),
        }).then(response => {
            return response.json();
        });
    };


    
  render() {
    const { useId, address, parkingFee } = this.state;
    return (
      <div>
        <form onSubmit={this.submitHandler}>
          <div>
            <input
              type="text"
              name="useId"
              value={useId}
              onChange={this.changeHandler}
            />
          </div>
          <div>
            <input
              type="text"
              name="address"
              value={address}
              onChange={this.changeHandler}
            />
          </div>
          <div>
            <input
              type="text"
              name="parkingFee"
              value={parkingFee}
              onChange={this.changeHandler}
            />
          </div>
          <button>Submit</button>
        </form>
      </div>
    );
  }
}

export default PostForm;
