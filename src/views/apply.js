import React, { useState, useEffect } from 'react';

// Imported React Components
import Question, { Label } from '../components/question.js'

// Global variables
const months = [
  "January",  "February", "March",
  "April",    "May",      "June",
  "July",     "August",   "September",
  "October",  "November", "December"
];

const regions = [
  {
    label: "North America",
    value: "us"
  },
  {
    label: "Europe",
    value: "eu"
  },
  {
    label: "Korea",
    value: "kr"
  },
  {
    label: "Taiwan",
    value: "tw"
  }
];

// Local React components
function Submit () {
  return(
    <button class="btn btn-primary" id="submitButton">
      Submit
    </button>
  );
}

function SpecInput(props) {
  const [specInfo, updateSpecInfo] = useState([]);
  const [selectedSpec, updateSelectedSpec] = useState("Select Specialization");
  const [specMedia, updateSpecMedia] = useState("");

  useEffect(() => {
    fetch('/api/get-spec-info')
      .then(response => response.json())
      .then(data => updateSpecInfo(data.map(entry => ({spec: entry.spec+' '+entry.class, media: entry.media}))))
  }, []);
  
  return(
    <div class={`form-group ${props.position}`}>
      <Label data={props.prompt} id={props.id}/>
      <div class="dropdown">
        <button 
          class="btn btn-primary dropdown-toggle"
          type="button"
          id={props.id}
          data-bs-toggle="dropdown"
          aria-expanded="false"
          value={selectedSpec}
          style={{display:"flex"}}
        >
          {(selectedSpec === "Select Specialization") ? selectedSpec : <div><img src={specMedia} alt={`${selectedSpec} icon`} style={{height:"25px"}}/>{" "}{selectedSpec}</div>}
        </button>
        <ul class="dropdown-menu" aria-labelledby={props.id}>
            {specInfo.map(entry => <li key={entry.spec}>
              <a 
                class="dropdown-item"
                onClick={() => {
                  updateSelectedSpec(entry.spec);
                  updateSpecMedia(entry.media)}
                }
              >
                <img src={entry.media} style={{height:"25px"}}/>{" "}{entry.spec}
              </a>
            </li>
            )}
        </ul>
      </div>
    </div>
  );
}

// Helper functions
function getTime() {
  const d = new Date()
  const year = d.getFullYear();
  const month = months[d.getMonth()];
  const date = d.getDate();
  const hour_24hr = d.getHours();
  const minute = d.getMinutes();

  var hour;
  var period;

  // Converts 24 hour time to 12 hour time
  if (hour_24hr === 0) {
    hour = 12;
    period = 'AM';
  } else if (hour_24hr === 12) {
    hour = 12;
    period = 'PM';
  } else if (hour_24hr > 12) {
    hour = hour_24hr - 12;
    period = 'PM';
  }

  return `${month} ${date}, ${year} ${hour}:${minute} ${period}`;
}

function buildDropdownOptions(specInfo, updateSelectedSpec, updateSpecMedia) {
  // Each element of specInfo must have the format:
  //  {
  //    spec: Arcane,    
  //    class: Mage,
  //    media: linkToSpecImage.jpg
  //  }
  return(specInfo.map(entry => 
    <li key={entry.spec}>
      <a 
        class="dropdown-item"
        onClick={() => {
          updateSelectedSpec(entry.spec);
          updateSpecMedia(entry.media)}
        }
      >
        <img src={entry.media} style={{height:"25px"}}/>{" "}{entry.spec}
      </a>
    </li>
  ));
}

function CharacterInput() {
  const [currentRegion, updateRegion] = useState("us");
  const [currentServers, updateServerRegion] = useState([]);
  const [serversIndex, updateServersIndex] = useState(null);

  function handleRegionChange(e) {
    const region = e.target.value;
    updateRegion(region);
    updateServerRegion(serversIndex[region]);
  }

  useEffect(() => {
    fetch('/api/get-servers')
      .then(response => response.json())
      .then(data => {
        // No need to update currentRegion as it starts as "us"
        updateServersIndex(data);
        updateServerRegion(data[currentRegion].servers);
      })
      .catch(err => console.log("Error fetching servers - ", err));
  }, []);

  return(
    <div class="form-group">
      <Label for="characterInput" data="Character"/>
      <div class="input-group">
        <span class="input-group-text">Name:</span>
        <input type="text" class="form-control"/>
          <span class="input-group-text ">Region:</span>
          <select
            type="text"
            class="form-control"
            onChange={handleRegionChange}>
            {regions.map((option) => <option value={option.value}>{option.label}</option>)}
          </select>
        <span class="input-group-text">Server:</span>
        <select type="text" class="form-control">
            {(currentServers) ? currentServers.map((x,y) => <option key={y}>{x}</option>) : <option>Loading...</option>}
        </select>
      </div>
    </div>
  );
}

function Apply () {
  const [questions, setQuestions] = useState([]);

  // TODO: Have some sort of prompt for submit, clear the input after submitting, and don't 
  // permit new submits. (Only allow submits if all fields are filled?)
  const handleSubmit = async (event) => {
    event.preventDefault();

    var answers = [];

    for(var i = 0; i < questions.length; i++) {
      answers.push(event.target[5+i].value);
    }

    const application = {
      name: event.target[0].value,
      region: event.target[1].value.toUpperCase(),
      server: event.target[2].value,
      main_spec: event.target[3].value,
      off_spec: event.target[4].value,
      app_date: getTime(),
      answers: answers
    };

    console.log(application);

    const response = await fetch('/api/submit', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ post: application }),
      });
      
    const body = await response.text();
        
    //this.setState({ responseToPost: body });
    
    console.log(body);
  }

  // TODO: Possibly load this on the site load instead of on the Apply page load. Set it in the global state?
  useEffect(() => {
    fetch('/api/get-questions')
      .then(response => response.json())
      .then(questions => {
        setQuestions( questions.map( x => ({text: x.text, size: x.size })) );
      })
      .catch(err => console.log("Error fetching questions - ", err));
  }, []);

  return(
    <div class="container">
      <form onSubmit={handleSubmit}>
        <CharacterInput />
        <div id="specInput">
          <SpecInput id="mainSpecDropdown" prompt="What is your main spec?" position="col-4"/>
          <SpecInput id="offSpecDropdown" prompt="What is your off spec?"/>
        </div>
        {questions.map((question,index) => <Question id={"questionInput"+index} data={question.text} rows={question.size}/>)}
        <Submit />
      </form>
    </div>
  );
}

export default Apply;