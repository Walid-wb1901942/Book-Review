

async function loadSchedule3() {

  const scheduleLocal = await fetch('/api/schedule')
  const schedules = await scheduleLocal.json().then(data => {
     return data;
   });
   
    const inject = document.querySelector('#Schedule_Container')
    console.log("PRINTING",schedules[0])

    const filterDate = document.querySelector('#filter-date');
   
    const selectedDate = filterDate.value  

    const dates = await fetch(`/api/conference_dates`);

    const datesJson = await dates.json();

   console.log(datesJson)
   
    const allDates = datesJson.map(d => d.date)
    allDates.push('All')
    console.log(allDates)
    filterDate.innerHTML = allDates.map(d => injectDatesHtml(d)).join('')


    
    if(selectedDate == "All"){
          await clearDisplay()
          schedules[0].sessions.map(async (s) => {
            const papers = await fetch(`/api/schedule/${s.presentations[0].paperId}`);
            const papersJson = await papers.json();
            const presenter = await fetch(`/api/presenter/${s.presentations[0].paperId}`);
            const presenterJson = await presenter.json();
          inject.innerHTML += display(s, papersJson,presenterJson);
          })
        }
        else{
            // const schedule = JSON.parse(localStorage.getItem('schedule'))
            // const filtered = schedule.filter(s => s.date == selectedDate)
    
            // const inject = document.querySelector('#Schedule_Container')
            // await clearDisplay()
            // inject.innerHTML  = filtered.map(s => display(s))
        
     
       schedules[0].sessions.map(async (s) => {
         if (s.presentations[0].paperId !== null || typeof(s.presentations[0].paperId) != undefined) {
           
         console.log(s.presentations[0].paperId)
         const papers = await fetch(`/api/schedule/${s.presentations[0].paperId}`);
         const papersJson = await papers.json();
         const presenter = await fetch(`/api/presenter/${s.presentations[0].paperId}`);
         const presenterJson = await presenter.json();

         inject.innerHTML += display(s, papersJson,presenterJson);
        
          // filterDate.innerHTML = datesJson.map(d => injectDatesHtml(d)).join('')
         }
        })
      }
 }
 function injectDatesHtml(date){
  console.log(date)
  if(date == 'All'){
      return `
      <option value="All">All</option>`
  }
  return `
  <option value="${date}">${date}</option>`
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

  
  // function injectDatesHtml(date){
  //   if(date == 'All'){
  //       return `
  //       <option value="All">All</option>`
  //   }
  //   return `
  //   <option value="${date}">${date}</option>`

  // }

  
// function display(schedule) {

//     return ` <div id="Schedules">
//           <table>
//               <tr>
             
//                 <td>Session Title : ${schedule.sessionTitle} </td>
//                 <td>Paper Title: ${schedule.paperTitle} </td>
                
//               </tr>
//               <tr>
//                 <td>Meeting Location: ${schedule.location} <br>
//                 Session Date: ${schedule.date}<br>
//                 Timing: ${schedule.from_time} - ${schedule.to_time}
//                 </td>
//                 <td>
//                 Presenter's Name: ${schedule.authors.find(a => a.presenter == true).fullName}
//                 <br>
//                 Author's Name: ${schedule.authors.map(a => a.fullName)}
//                 </td>
//               </tr>
//             </table>
//        </div>
//           `
//     }

  
    async function clearDisplay(){
        const inject = document.querySelector('#Schedule_Container')
        inject.innerHTML = ''
    }