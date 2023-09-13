    async function secondLoad(sTitle, pTitle){
        console.log(sTitle,pTitle)
    
        const session = await fetch(`/api/session/${sTitle}`)
        const sessionJson = await session.json()

        const papers = await fetch(`/api/papers/${pTitle}`)
        const papersJson = await papers.json()

        console.log(sessionJson,papersJson)

        const presenters = await fetch(`/api/presenter/${papersJson[0].id}`) 
        const presentersJson = await presenters.json()
        console.log(presentersJson.authors)
        
        // schedules[0].sessions.map(async (s) => {
        //   console.log(s.presentations[0].paperId)
        //   const papers = await fetch(`/api/schedule/${s.presentations[0].paperId}`);
        //   const papersJson = await papers.json();
        //   const presenter = await fetch(`/api/presenter/${s.presentations[0].paperId}`);
        //   const presenterJson = await presenter.json();
        const inject =  document.querySelector('#Schedule_Container1')
          inject.innerHTML = display123(sessionJson, papersJson,presentersJson);
          console.log(inject.innerHTML)
    //  inject.innerHTML = display(scheduleLocal)
     

    }
  function display123(sessions,papers,preseneters) {
    console.log(papers,sessions,preseneters)
    console.log(sessions[0].presentations[0])
    // console.log(preseneters['authors'][0].user);
    return ` <div id="Schedules">
          <table>
              <tr>
             
                <td>Session Title : ${sessions[0].title} </td>
                <td>Paper Title: ${papers[0].title} </td>
                
              </tr>
              <tr>
              <td>Meeting Location: ${sessions[0].title} <br>
              Session Date: ${sessions[0].confDate}<br>
              Timing: ${sessions[0].presentations[0].fromTime} - ${sessions[0].presentations[0].toTime}
              </td>
              <td>
               Presenter's Name:${preseneters.authors.map(a =>a.user.firstName+' '+a.user.lastName)}
                <br>
                Author's Name: ${papers[0].authors.map(a => a.user.firstName+ " " + a.user.lastName)}
                </td>
              </tr>
            </table>
       </div>
          `
    }

const user = JSON.parse
(localStorage.getItem('loggedIn'))
console.log(user)


const scheduleForm = document.querySelector('#scheduleForm')
scheduleForm.addEventListener('submit', addSchedule)

async function initial2() {
    console.log("WE ARE IN INITIAL");
    await fetch('organizer.html')
    const papersSelect = document.getElementById('papersAll')
    const sessionSelect = document.getElementById('sessionsAll')


    const sessions = await fetch('/api/sessions')
    const sessionsJson = await sessions.json()
    const sessionsTitles = sessionsJson.map(s => s.title)
    console.log(sessionsTitles)
    const papers = await fetch('/api/papers')
    const papersJson = await papers.json()
    const paperTitles = papersJson.map(p => p.title)


    const option = document.createElement('option')
    option.text = "Please select a session"
    option.selected = true
    option.disabled = true

    sessionSelect.appendChild(option)

    for (let index = 0; index < sessionsTitles.length; index++) {
        const option = document.createElement('option')
        option.text = sessionsTitles[index]
        sessionSelect.appendChild(option)
    }
    for (let index = 0; index < paperTitles.length; index++) {
            const option = document.createElement('option')
            option.text = paperTitles[index]
            papersSelect.appendChild(option)
    }
}
 async function addSchedule(e) {
    console.log("IN ADD")
    e.preventDefault();
    const newSchedule = formToObject(e.target)
    console.log(newSchedule)
    await secondLoad(newSchedule.session,newSchedule.paper)


    // console.log(newSchedule)
    //  secondLoad(newSchedule.session,newSchedule.paper)

  
}


async function deleteSessionHandler(){
    console.log("in delete session")
    const selectedTitle = document.querySelector('#sessionsAll')
    console.log(selectedTitle.value);
    // const sessions = JSON.parse(localStorage.getItem('sessions'))
    // const matchedSessionIndex = sessions.findIndex(s => s.sessionTitle == selectedTitle.value)
    const sessions = await fetch('/api/sessions');
    const sessionsJson = await sessions.json()
    const matchedSessionIndex = sessionsJson.findIndex(s => s.title == selectedTitle.value)
    console.log(matchedSessionIndex);

    // const schedule = JSON.parse(localStorage.getItem('schedule'))
    // const schedule = await fetch('/api/schedule');

    // const keep = schedule.filter(s => s.sessionTitle != sessions[matchedSessionIndex].sessionTitle)
    // console.log("KEEP : " + JSON.stringify(keep));
    // localStorage.setItem('schedule',JSON.stringify(keep))
    // sessions.splice(matchedSessionIndex,1)
    // localStorage.setItem('sessions',JSON.stringify(sessions))
    await fetch('/api/sessions/' + sessionsJson[matchedSessionIndex].id, {
        method: 'DELETE'
        })
    location.reload()

}


const updateBtn = document.querySelector('#updateBtn');
updateBtn.addEventListener('click',preUpdateSession)

const addBtn = document.querySelector('#addSessionBtn')
addBtn.addEventListener('click',preAddSession)

function display(mystring){
    return `
    <body id = "bodyForm">
    <h1>Conference Schedule Form</h1>
	<form id="form">
		<fieldset>
            <legend id="legend">${mystring} Session</legend>
            <label for="name">Title</label>
            <input type="text" id="title" name="title"
             placeholder="Enter title..." required>
             <br>
             <label for="location">Location:</label>
             <select id="location" name="location" required></select><br>
          
             <label for="date">Date:</label>
             <select id="date"name="confDate" required></select><br>

             <label for="from_time">From Time:</label>
             <input type="time" id="from_time" name="from_time" required><br>

       
             <label for="to_time">To Time:</label>
             <input type="time" id="to_time" name="to_time" required><br>
             
            <input type="submit" id="submit-form-btn" value ="${mystring}">
          </fieldset>
	</form>
    <script src="js/createSchedule.js"></script>
</body>

              `
 }
async function preUpdateSession() {

    const sessionSelector = document.querySelectorAll('#sessionsAll')
    sessionSelector[0].value
    if(sessionSelector[0].value == "Please select a session"){
        alert("Please Select A Valid Session")
    }
    else{
        const formInject =  document.querySelector('#formInject')
        formInject.innerHTML = display("Update")
        await loadPage()
        console.log("In Update")
        const submitUpdateBtn = document.querySelector('#form')
        submitUpdateBtn.addEventListener('submit',updateSession)
        // const sessions  = JSON.parse(localStorage.getItem('sessions'))
        const sessions = await fetch('/api/sessions');
        const sessionsJson = await sessions.json()
        
        const sessionTitle = document.querySelector('#title')
        const location = document.querySelector('#location')
        const date = document.querySelector('#date')
        const from_time = document.querySelector('#from_time')
        const to_time = document.querySelector('#to_time')

        sessionTitle.disabled = true;
        const selectedSession = sessionsJson.find(s => s.title == sessionSelector[0].value)

        console.log(selectedSession)
        const presentations = await fetch(`/api/presentation/${selectedSession.id}`);
        const presentationsJson = await presentations.json()
        console.log(presentationsJson)

        

        sessionTitle.value = selectedSession.title
        location.value = selectedSession.location
        date.value = selectedSession.confDate
        from_time.value = presentationsJson.fromTime
        to_time.value = presentationsJson.toTime
     
    
        // sessions.find(s => s.sessionTitle = selectedTitle)
        // sessionTitle.value = ""
    }

 }
 async function updateSession(e) {

    // const updateSession = Object.assign(sessions[sessionsIndex],updatedSession)
    // sessions[sessionsIndex] = updateSession

    e.preventDefault();


    const selectedTitle = document.querySelector('#sessionsAll')
    console.log(selectedTitle.value);
    // const sessions = JSON.parse(localStorage.getItem('sessions'))
    // const matchedSessionIndex = sessions.findIndex(s => s.sessionTitle == selectedTitle.value)
    const sessions = await fetch('/api/sessions');
    const sessionsJson = await sessions.json()
    const matchedSessionIndex = sessionsJson.findIndex(s => s.title == selectedTitle.value)


    const newSession = formToObject(e.target);
    const title = document.querySelector('#title');
    newSession.title = title.value
    newSession.scheduleId = 1;
    const {from_time, to_time} = newSession;

    const presentation = { fromTime : from_time, toTime:  to_time, title : newSession.title, sessionId : sessionsJson[matchedSessionIndex].id}
    console.log(presentation)
await fetch(`/api/presentation/${sessionsJson[matchedSessionIndex].id}`, {
    method: 'PUT',
    headers: {
        'Content-Type': 'application/json'
        },
        body: JSON.stringify(presentation)
    })

    delete newSession.from_time
    delete newSession.to_time
    
    console.log(newSession)
    await fetch('/api/sessions/' + sessionsJson[matchedSessionIndex].id, {
        method: 'PUT',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify(newSession),
        })

    location.reload(true);
 }
async function loadPage() {
// const mainContent = document.getElementById('main-content');
// const page = await fetch(pageUrl)
// const pageHTMLContent = await page.text()
// mainContent.innerHTML = pageHTMLContent;
// console.log("LOAD PAGE", val)
const locationSelect = document.getElementById('location');
const dateSelect = document.getElementById('date');
const locationJson = await fetch('/api/locations')
const locations = await locationJson.json()
console.log(locations)
const datesJson = await fetch('/api/conference_dates')
const dates = await datesJson.json()




for (let index = 0; index < dates.length; index++) {
    const option = document.createElement('option')
    // option.value = dates[index].date
    option.text = dates[index].date
    dateSelect.appendChild(option)
}

for (let index = 0; index < locations.length; index++) {
    const option = document.createElement('option')
    option.text = locations[index].title
    locationSelect.appendChild(option)
}
}

function preAddSession(){
    const formInject =  document.querySelector('#formInject')
    formInject.innerHTML = display("Add")
    loadPage()
    console.log("In Add")
    const submitAddBtn = document.querySelector('#form')
    submitAddBtn.addEventListener('submit',addSession)
}
async function addSession(e) {
e.preventDefault();
// const sessionLocal = JSON.parse(localStorage.getItem("sessions"))
const session = await fetch('/api/sessions')
const nSession = formToObject(e.target)

nSession.scheduleId = 1;
const {from_time, to_time} = nSession;

const presentation = { fromTime : from_time, toTime:  to_time, title : nSession.title, sessionId : nSession.id}

await fetch('/api/presentation', {
    method: 'POST',
    headers: {
        'Content-Type': 'application/json'
        },
        body: JSON.stringify(presentation)
    })


delete nSession.from_time;
delete nSession.to_time;
await fetch('/api/sessions', {
    method: 'POST',
    headers: {
        'Content-Type': 'application/json'
        },
        body: JSON.stringify(nSession)
    })


// nSession.id = (+sessionLocal.slice(-1)[0].id + 1).toString();

// console.log(typeof(newRecipe))
// console.log(typeof(recipesLocal))

// sessionLocal.push(nSession)

// localStorage.setItem("sessions", JSON.stringify(sessionLocal))
console.log("SUBMITTED ADD SESSION")
// console.log("UPDATED STORAGE", sessionLocal)
location.reload(true);
}

function formToObject(form) {
const formData = new FormData(form)
// console.log("Form data: ",formData)
const data = {}

for (const [key, value] of formData) {
   data[key] = value;
}
// console.log("data:", data)
return data
}


