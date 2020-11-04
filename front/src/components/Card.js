import React from "react";
import { Card,Button,Container } from "react-bootstrap";

function CardView(props){

   return (
      <div className="card text-center col-md-3 m-4  ">
        <div className="overflow">
          <img
            src="https://p.rdcpix.com/v01/l0511a742-m1xd-w640_h480_q80.jpg"
            alt="img1"
            className="card-img-top embed-responsive-item"
          />
        </div>
        <div className="card-body text-dark">
          <h4 className="card-title">{`Fee: ${props.parkingFee}`}</h4>
          <p className="card-text text-secondary">{props.street}</p>
          <Button className="btn btn-primary" name={props.name} onClick={props.function}>
            Schedule Parking
          </Button>
        </div>
      </div>
    );
}

export default CardView;