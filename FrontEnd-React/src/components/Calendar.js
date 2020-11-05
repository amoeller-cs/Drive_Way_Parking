import { Card, Button, Container } from "react-bootstrap";
import React, { useState, useEffect } from "react";
import FullCalendar from "@fullcalendar/react";
import dayGridPlugin from "@fullcalendar/daygrid";
import timeGridPlugin from "@fullcalendar/timegrid";
import moment from "moment";
import TimePicker from "react-bootstrap-time-picker";
import DayPicker from "react-day-picker";
import "react-day-picker/lib/style.css";
import swal from "sweetalert";

// it may be better to create an array or database of the days (Monday, Tuesday, etc...) and then consolidate the temp with map() 
// so that you don't have to format it for every day
// Otherwise, the calendar looks really good and I think you did a great job of formatting the times for each day
function Calendar() {
  const checkBusinessHr = (driveWayPost) => {
    const temp = [];
    for (let [key, value] of Object.entries(driveWayPost)) {
      if (key === "Monday" && value === true) {
        temp.push({
          daysOfWeek: [1],
          startTime: moment()
            .startOf("day")
            .seconds(driveWayPost.MondayStartTime)
            .format("H:mm"),
          endTime: moment()
            .startOf("day")
            .seconds(driveWayPost.MondayEndTime)
            .format("H:mm"),
        });
      } else if (key === "Tuesday" && value === true) {
        temp.push({
          daysOfWeek: [2],
          startTime: moment()
            .startOf("day")
            .seconds(driveWayPost.TuesdayStartTime)
            .format("H:mm"),
          endTime: moment()
            .startOf("day")
            .seconds(driveWayPost.TuesdayEndTime)
            .format("H:mm"),
        });
      } else if (key === "Wednesday" && value === true) {
        temp.push({
          daysOfWeek: [3],
          startTime: moment()
            .startOf("day")
            .seconds(driveWayPost.WednesdayStartTime)
            .format("H:mm"),
          endTime: moment()
            .startOf("day")
            .seconds(driveWayPost.WednesdayEndTime)
            .format("H:mm"),
        });
      } else if (key === "Thursday" && value === true) {
        temp.push({
          daysOfWeek: [4],
          startTime: moment()
            .startOf("day")
            .seconds(driveWayPost.ThursdayStartTime)
            .format("H:mm"),
          endTime: moment()
            .startOf("day")
            .seconds(driveWayPost.ThursdayEndTime)
            .format("H:mm"),
        });
      } else if (key === "Friday" && value === true) {
        temp.push({
          daysOfWeek: [5],
          startTime: moment()
            .startOf("day")
            .seconds(driveWayPost.FridayStartTime)
            .format("H:mm"),
          endTime: moment()
            .startOf("day")
            .seconds(driveWayPost.FridayEndTime)
            .format("H:mm"),
        });
      } else if (key === "Saturday" && value === true) {
        temp.push({
          daysOfWeek: [6],
          startTime: moment()
            .startOf("day")
            .seconds(driveWayPost.SaturdayStartTime)
            .format("H:mm"),
          endTime: moment()
            .startOf("day")
            .seconds(driveWayPost.SaturdayEndTime)
            .format("H:mm"),
        });
      } else if (key === "Sunday" && value === true) {
        temp.push({
          daysOfWeek: [7],
          startTime: moment()
            .startOf("day")
            .seconds(driveWayPost.SundayStartTime)
            .format("H:mm"),
          endTime: moment()
            .startOf("day")
            .seconds(driveWayPost.SundayEndTime)
            .format("H:mm"),
        });
      }
    }
    console.log(temp);

    return temp;
  };

  const [userInfo, setUserInfo] = useState({
    email: "",
    password: "",
    name: "",
  });

  useEffect(() => {
    const data = localStorage.getItem("current-user");
    console.log(data);
    if (data) {
      setUserInfo(JSON.parse(data));
    }
  }, []);

  useEffect(() => {
    const postRent = localStorage.getItem("post-picked");
    console.log(postRent);

    if (postRent) {
      setDrivewayPost(JSON.parse(postRent));
    }
  }, []);

  const test = () => {
    console.log(startTime / 3600);
  };

  const [driveWayPost, setDrivewayPost] = useState({});
  const [startTime, setStartTime] = useState("");
  const [endTime, setEndTime] = useState("");
  const [datePicked, setDatePicked] = useState("");
  const [calendarEvent, SetCalendarEvent] = useState([]);

  const [apointment, setAppointment] = useState({
    owner: "",
    post: "",
    renter: "",
    start: "",
    end: "",
  });

  const handleSchduleBtn = async () => {
    const schedule = [
      {
        title: userInfo.email,
        start: new Date(
          moment(datePicked, "YYYY/MM/DD").year(),
          moment(datePicked, "YYYY/MM/DD").month(),
          moment(datePicked, "YYYY/MM/DD").date(),
          Math.floor(startTime / 3600),
          Math.floor((startTime % 3600) / 60),
          0
        ),
        end: new Date(
          moment(datePicked, "YYYY/MM/DD").year(),
          moment(datePicked, "YYYY/MM/DD").month(),
          moment(datePicked, "YYYY/MM/DD").date(),
          Math.floor(endTime / 3600),
          Math.floor((endTime % 3600) / 60),
          0
        ),
      },
    ];

    SetCalendarEvent(schedule);

    await setAppointment({
      owner: driveWayPost.email,
      post: driveWayPost._id,
      renter: userInfo.email,
      start: schedule[0].start,
      end: schedule[0].end,
    });

    const requestOptions = {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(apointment),
    };

    await fetch("/insert_appointment", requestOptions)
      .then(async (response) => {
        swal("SUCCESS", "Your appoint is scheduled", "success");
        const data = await response.json();
      })
      .catch((error) => {
        console.log(error);
      });

    console.log(calendarEvent);

    return schedule;
  };
// Great use of container, but be sure to organize rows and columns correctly;
// Make sure it is clear which column or row an element is in, some of your components are in a row
// inside a column that is already inside another row; not sure if you meant to do that but it can become 
// hard to organizze.
  return (
    <>
      <br />
      <br />
      <div className="container   ">
        <div className="row">
          <div className="col-4   ">
            <DayPicker
              className="justify-content-end"
              selectedDays={datePicked}
              onDayClick={(e) => {
                setDatePicked(e);
              }}
            />
            ;<h5>Start Time </h5>
            <TimePicker
              className="col col-lg-5"
              start="0"
              end="24"
              name="StartTime"
              step={30}
              value={startTime}
              onChange={(e) => {
                setStartTime(e);
              }}
            />
            <h5 className="mt-3">End Time </h5>
            <TimePicker
              className="col col-lg-5"
              start="0"
              end="24"
              name="StartTime"
              step={30}
              value={endTime}
              onChange={(e) => {
                setEndTime(e);
              }}
            />
            <div className="row">
              <div className="col justify-content-center">
                <Button className="m-3" onClick={handleSchduleBtn}>
                  Schedule
                </Button>
               
              </div>
            </div>
          </div>

          <div className="col-8 ">
            <FullCalendar
              className="col-7"
              plugins={[dayGridPlugin, timeGridPlugin]}
              initialView="timeGridWeek"
              selectable={true}
              displayEventTime={true}
              events={calendarEvent}
              eventTimeFormat={{
                hour: "2-digit",
                minute: "2-digit",
                second: "2-digit",
                meridiem: false,
              }}
              businessHours={checkBusinessHr(driveWayPost)}
            />
          </div>
        </div>
      </div>
    
    </>
  );
}

export default Calendar;
