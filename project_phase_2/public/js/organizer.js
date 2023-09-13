async function loadSchedule2() {

  // else {
   const scheduleLocal = await fetch('/api/schedule')
   const schedules = await scheduleLocal.json().then(data => {
      return data;
    });

    // const paperId = schedules[0].sessions.map(s => (s.presentations.map(p => p.paperId)))
    
    // const papers = await fetch(`/api/schedule/${paperId.map(e =>{})}`)
    // const papersMatches = await papers.json().then(data =>
    //  {
    //   return data
    //  } )
    
     const inject = document.querySelector('#Schedule_Container')
     console.log("PRINTING",schedules[0])

     try {
      
        schedules[0].sessions.map(async (s) => {
          if (s.presentations[0].paperId !== null || typeof(s.presentations[0].paperId) != undefined) {
            
          console.log(s.presentations[0].paperId)
          const papers = await fetch(`/api/schedule/${s.presentations[0].paperId}`);
          const papersJson = await papers.json();
          const presenter = await fetch(`/api/presenter/${s.presentations[0].paperId}`);
          const presenterJson = await presenter.json();

          console.log(papersJson)
          console.log();
          inject.innerHTML += display(s, papersJson,presenterJson);
          }
        })
      ;
    } catch (error) {
      console.log('An error occurred:', error);
    }
   
    //  inject.innerHTML = display(scheduleLocal)
     
  }

  function display(schedule,papers,preseneters) {
    console.log("PAPERS",papers)
    console.log("SCHEDULE",schedule)
    console.log("PRESENTERS",preseneters)
    return ` <div id="Schedules">
          <table>
              <tr>
             
                <td>Session Title : ${schedule.title} </td>
                <td>Paper Title: ${papers[0].title} </td>
                
              </tr>
              <tr>
              <td>Meeting Location: ${schedule.location} <br>
              Session Date: ${schedule.confDate}<br>
              Timing: ${schedule.presentations[0].fromTime} - ${schedule.presentations[0].toTime}
              </td>
              <td>
               Presenter's Name:${preseneters.authors.map(p=>p.user.firstName+" "+p.user.lastName)}
                <br>
                Author's Name: ${papers[0].authors.map(a => a.user.firstName+ " " + a.user.lastName)}
                </td>
              </tr>
            </table>
       </div>
          `
    }

function loadScheduleEditor() {
    window.location.href = "../createSchedule.html";
}

async function loadAdd() {
   window.location.href = "../createSession.html"
 }

 function updateSchedule(){
  window.location.href="updateSchedule.html"

 }
 async function loadUpdateForm(){
  const sessions = await fetch("/api/sessions")
  const sessionsJson = await sessions.json()
  console.log(sessionsJson.length)
  const sessionSelect = document.querySelector('#sessionSelect')
  // const sessionTitle = document.querySelector('#sessionTitle')
  // const paperTitle = document.querySelector('#paperTitle')
  const location = document.querySelector('#location')
  const date = document.querySelector('#date')
  const timing = document.querySelector('#timing')
  const presenter = document.querySelector('#presenter')
  const authors = document.querySelector('#author')

  const locations = await fetch('/api/locations')
  const locationsJson = await locations.json()
  const dates = await fetch("/api/conference_dates")
  const datesJson = await dates.json()
  

  console.log(locationsJson)
//for the sessions
  for (let index = 0; index <   sessionsJson.length; index++) {
      const option = document.createElement('option')
      option.text = sessionsJson[index].title
      sessionSelect.appendChild(option)
  }
//for the dates
  for (let index = 0; index < datesJson.length; index++) {
    const option = document.createElement('option')
    // option.value = dates[index].date
    option.text = datesJson[index].date
    date.appendChild(option)
}
//for the meeting locations
for (let index = 0; index < locationsJson.length; index++) {
    const option = document.createElement('option')
    option.text = locationsJson[index].title
    location.appendChild(option)
}



 }

 async function loadForm(){

  const sessionSelect = document.querySelector('#sessionSelect')
  const sessionTitle = document.querySelector('#sessionTitle')
  const paperTitle = document.querySelector('#paperTitle')
  const location = document.querySelector('#location')
  const date = document.querySelector('#date')
  const from_time = document.querySelector('#from_time')
  const to_time = document.querySelector('#to_time')
  const presenter = document.querySelector('#presenter')
  const authors = document.querySelector('#author')



  const selectedTitle = sessionSelect.value;
  console.log("SELECTED TITLKE",selectedTitle);
  const sessionSelected = await fetch(`/api/session/${selectedTitle}`)

  // const selectedSession = schedule.find(s => s.sessionTitle == selectedTitle)
  const selectedSession = await sessionSelected.json()
  console.log(selectedSession);
  const presentation = await fetch(`/api/presentation/${selectedSession[0].id}/${selectedSession[0].presentations[0].paperId}`)
  const presentationJson = await presentation.json()
  console.log(presentationJson);


  presenter.innerHTML = ""

  for(let i = 0; i< presentationJson[0].paper.authors.length; i++){
    const option = document.createElement('option')
    const fullName = presentationJson[0].paper.authors[i].user.firstName + " " + presentationJson[0].paper.authors[i].user.lastName
    console.log(fullName);
    option.text = fullName
    presenter.appendChild(option)
  }
  

  sessionTitle.value = selectedSession[0].title
  paperTitle.value = presentationJson[0].paper.title
  location.value = selectedSession[0].location
  date.value = selectedSession[0].confDate
  from_time.value = presentationJson[0].fromTime
  to_time.value = presentationJson[0].toTime

  const selectedPresenter = presentationJson[0].paper.authors.find(a => a.presenter == true)
  const selectedPresenterName = selectedPresenter.user.firstName + " " + selectedPresenter.user.lastName
  presenter.value = selectedPresenterName
  // console.log(selectedSession.authors.find(a => a.presenter == true));

  authors.value = ""
  for (let index = 0; index < presentationJson[0].paper.authors.length; index++) {
    // const option = document.createElement('option')
    const authorName = presentationJson[0].paper.authors[index].user.firstName + " " + presentationJson[0].paper.authors[index].user.lastName
    // option.text = authorName
    // authors.appendChild(option)
    if(index != 0){
      authors.value += ", "  + authorName
    }
    else{
      authors.value +=  authorName
    }
    
  }
  const updateForm = document.querySelector('#updateForm')
  updateForm.addEventListener('submit',submitChanges)

}


function formToObject(form){
  const formData = new FormData(form)
  const data = {}
  for(const [key,value] of formData){
      data[key] = value
  }
  return data
}

async function submitChanges(e){
  e.preventDefault();
  const updatedSession = formToObject(e.target)
  // const schedule = JSON.parse(localStorage.getItem('schedule'))
  // const sessions = JSON.parse(localStorage.getItem('sessions'))

  console.log(updatedSession);
  const sessions = await fetch("/api/sessions")
  const sessionasJson = await sessions.json()
  const selectedSession = sessionasJson.find(s => s.title == e.target.sessionTitle.value)
  console.log(sessionasJson);



  await fetch(`/api/sessions/${selectedSession.id}`,{
    method: 'PUT',
    headers: {
      'Content-Type': 'application/json'
    },
    body: JSON.stringify({
      location: updatedSession.location,
      confDate: updatedSession.date,
      scheduleId: 1
    })
  })
  console.log(selectedSession.id);
  await fetch(`/api/presentation/${selectedSession.id}`,{
    method: 'PUT',
    headers: {
      'Content-Type': 'application/json'
    },
    body: JSON.stringify({
      fromTime: updatedSession.from_time,
      toTime: updatedSession.to_time,
    }) 
  })


  // const sessionsIndex = sessions.findIndex(s => s.sessionTitle == e.target[1].value)
  // console.log("SESSION FOUND: ",sessions[sessionsIndex])

  // const papers = JSON.parse(localStorage.getItem('papers'))
  // const papersIndex = papers.findIndex(p => p.paperTitle == e.target[2].value)
  // papers[papersIndex].authors.find(a => a.presenter == true).presenter = false
  // papers[papersIndex].authors.find(a => a.fullName == updatedSession.presenter).presenter = true
  // localStorage.setItem('papers',JSON.stringify(papers))



  // const index = schedule.findIndex(s => s.sessionTitle == e.target[1].value)
  // console.log(schedule[index]);
  // schedule[index].authors.find(a => a.presenter == true).presenter = false
  // const author = schedule.find(s => s.authors.find(a => updatedSession.presenter == a.fullName))
  // schedule[index].authors.find(a => a.fullName == updatedSession.presenter).presenter = true

  // const updateSession = Object.assign(sessions[sessionsIndex],updatedSession)
  // sessions[sessionsIndex] = updateSession
  // delete updatedSession.presenter
  // localStorage.setItem('sessions',JSON.stringify(sessions))

  // console.log("Author: ",schedule[index].authors.find(a => a.fullName == updatedSession.presenter));
  // console.log(updatedSession);
  // const updated = Object.assign(schedule[index],updatedSession)
  // schedule[index] = updated
  // localStorage.setItem('schedule',JSON.stringify(schedule))


  window.location.href = "../organizer.html"
  // Object.assign(updatedSession,schedule[index])
  


}
