import React, { useState, useEffect } from "react";
import "./SearchBabysitter.scss";
import Stack from "@mui/material/Stack";
import axios from "axios";
import formatDate from "../helpers/formatter";
import ChooseDate from "../searchbabysitter/ChooseDate";
import ChooseStartTime from "../searchbabysitter/ChooseStartTime";
import ChooseEndTime from "../searchbabysitter/ChooseEndTime";
import ChooseLanguage from "../searchbabysitter/ChooseLanguage";
import ChooseAge from "../searchbabysitter/ChooseAge";
import CardItem from "../searchbabysitter/CardItem";
import Grid from "@mui/material/Grid";
import Navbar from "../Navbar";

export default function SearchBabysitter(props) {
  const [startTime, setStartTime] = useState("");
  const [endTime, setEndTime] = useState("");
  const [date, setDate] = useState(null);
  const [age, setAge] = useState("");
  const [language, setLanguage] = useState("");
  const [filteredSitters, setFilteredSitters] = useState([]);
  const [allSitters, setAllSitters] = useState([]);

  useEffect(() => {
    return axios.get("/searchBabysitters").then((res) => {
      setFilteredSitters(res.data);
      setAllSitters(res.data);
    });
  }, []);
 

  const handleStartTimeChange = (startTime) => {
    setStartTime(startTime);
  };
  const handleDateChange = (date) => {
    setDate(date);
  };
  const handleEndTimeChange = (endTime) => {
    setEndTime(endTime);
  };
  const handleAgeChange = (age) => {
    setAge(age);
  };
  const handleLanguageChange = (language) => {
    setLanguage(language);
  };
  
  useEffect(() => {//for dynamic filters
    let filterResult = allSitters;

    if (date) {
      const finalDate = formatDate(date);
      filterResult = filterResult.filter((sitter) => {
        for (const avail of sitter.availability) {
          let time = avail.start_time.slice(11, 19);
          if (avail.date === finalDate && time !== "07:00:00")
            return avail.date === finalDate;
        }
      });
    }
    if (startTime) {
      filterResult = filterResult.filter((sitter) => {
        for (const avail of sitter.availability) {
          let adjDay = avail.start_time;
          let adjStart = new Date(adjDay).toLocaleTimeString("ca-Ca", {
            hourCycle: "h24",
          });
          if (adjStart.length < 8) {
            adjStart = 0 + adjStart;
          }
          if (
            adjStart === startTime &&
            avail.date.slice(0, 10) === formatDate(date)
          )
            return adjStart === startTime;
        }
      });
    }

    if (endTime) {
      filterResult = filterResult.filter((sitter) => {
        for (const avail of sitter.availability) {
          let adjDay2 = avail.end_time;
          let adjEnd = new Date(adjDay2).toLocaleTimeString("ca-Ca", {
            hourCycle: "h24",
          });
          if (adjEnd.length < 8) {
            adjEnd = 0 + adjEnd;
          }
          if (
            adjEnd === endTime &&
            avail.date.slice(0, 10) === formatDate(date)
          )
            return adjEnd === endTime;
        }
      });
    }
    if (language) {
      filterResult = filterResult.filter((sitter) => {
        if (sitter.language.includes(language)) return sitter;
      });
    }

    if (age) {
      filterResult = filterResult.filter((sitter) => {
        for (const age_g of sitter.age_group) {
          if (age_g === age) return age_g === age;
        }
      });
    }
    localStorage.setItem("date", date);
    localStorage.setItem("startTime", startTime);
    localStorage.setItem("endTime", endTime);
    localStorage.setItem("language", language);
    localStorage.setItem("age", age);
    setFilteredSitters(filterResult);
  }, [startTime, date, endTime, age, language]);

  const babysittersList = filteredSitters.map((sitter) => {
    let sumHours = 0;
    let parentBack = {};
    let arr = [...sitter.orders];
    arr.forEach((elem) => {//calculate how many parents came back
      parentBack[elem.parent_id] = (parentBack[elem.parent_id] || 0) + 1;
    });
    sitter.orders.map((order) => {//calculate how many hours spent with kids on the platform
      sumHours += order.hours;
    });
    return (
      <Grid item xs={12} sm={6} md={4} lg={3}>
        <CardItem
          key={sitter.id}
          image={sitter.photo}
          name={sitter.first_name}
          orders={sitter.orders.length}
          hours={sumHours}
          parentsBack={Object.keys(parentBack).length}
          id={sitter.id}
        />
      </Grid>
    );
  });

  return (
    <div>
      <Navbar />

      <div className="searchPage">
        <div className="search">
          <Stack direction="column">
            <h2> Choose Date</h2>
            <ChooseDate value={date} changeDate={handleDateChange} />
            <h2> What time do you prefer?</h2>
            <div className="time">
              <Stack spacing={4} direction="row">
                <ChooseStartTime changeStartTime={handleStartTimeChange} />
                <ChooseEndTime changeEndTime={handleEndTimeChange} />
              </Stack>
            </div>
            {/* <h2> Your City?</h2>
        <ChooseCity changeCity={handleCityCange} /> */}
            <h2> Choose Childs Age</h2>
            <ChooseAge changeAge={handleAgeChange} />
            <h2> Prefered Language</h2>
            <ChooseLanguage changeLanguage={handleLanguageChange} />
            {/* <h2> What are we doing today?</h2>
        <ChooseActivity /> */}
          </Stack>
        </div>

        <div className="babysitterList">
          <Grid container direction="row">
            {babysittersList}
          </Grid>
        </div>
      </div>
    </div>
  );
}



