// npm install
// npm install -g json-server
// json-server --watch papers.json --cors

async function getInstitutions(dropdownId) {
  const response = await fetch("institutions.json");
  const data = await response.json();
  const dropdown = document.getElementById(dropdownId);

  for (const institution of data.institutions) {
    const option = document.createElement("option");
    option.value = institution.name;
    option.text = institution.name;
    dropdown.appendChild(option);
  }
}

function getAuthorId() {
  return (Math.random() * 1000).toFixed(0);
}

getInstitutions("presenter-affiliation");
getInstitutions("author-affiliation");

let authors = [];

function removeAuthor(authorId) {
  const authorList = document.querySelector(".author-list");
  const authorItem = document.getElementById(authorId);
  authorList.removeChild(authorItem);
  authors.splice(1, authorId);
}

const addAuthorBtn = document.getElementsByClassName("add-author")[0]; //because it returns an array of elements

addAuthorBtn.addEventListener("click", () => {
  const firstName = document.querySelector("#author-firstName").value;
  const lastName = document.querySelector("#author-lastName").value;
  const email = document.querySelector("#author-email").value;
  const affiliation = document.querySelector("#author-affiliation").value;

  const authorId = getAuthorId();

  const newAuthor = {
    id: authorId,
    firstName,
    lastName,
    fullName: firstName + " " + lastName,
    email,
    affiliation,
  };
  authors.push(newAuthor);

  const authorList = document.querySelector(".author-list");

  // Create a new list item element
  const newListItem = document.createElement("li");
  newListItem.id = authorId;
  //   newListItem.innerHTML = `
  //   <h3>${firstName + " " + lastName}</h3>
  //   <p>${email}</p>
  //   <p>${affiliation}</p>
  //   <button onclick="removeAuthor(${authorId})">Remove</button>
  // `;
  newListItem.innerHTML = `
  <div class="author ">

    <p>Name: ${firstName + " " + lastName}</p>
    <p>Email: ${email}</p>
    <p>Affiliation: ${affiliation}</p>
    <button class="r-btn" onclick="removeAuthor(${authorId})">Remove</button>
  </div>
`;
  // Clear the input fields
  document.querySelector("#author-firstName").value = "";
  document.querySelector("#author-lastName").value = "";
  document.querySelector("#author-email").value = "";
  // document.querySelector("#author-affiliation").value = "";

  // Append the new list item to the author-list element
  authorList.appendChild(newListItem);
});

async function getRandomReviewers() {
  const response = await fetch("users.json");
  const data = await response.json();

  //  getting 2 random reviewers
  const reviewers = data.filter((user) => user.role === "reviewer");
  const randomReviewers = [];
  // while (randomReviewers.length < 2) {
  //   const randomIndex = Math.floor(Math.random() * reviewers.length);
  //   const randomReviewer = reviewers[randomIndex];
  //   randomReviewers.push(randomReviewer);
  // }
  const firstRandomIndex = Math.floor(Math.random() * reviewers.length);
  const randomReviewer = reviewers[firstRandomIndex];
  randomReviewers.push(randomReviewer);
  while (true) {
    const randomIndex = Math.floor(Math.random() * reviewers.length);
    if (firstRandomIndex == randomIndex) {
      continue;
    } else {
      const randomReviewer = reviewers[randomIndex];
      randomReviewers.push(randomReviewer);
      break;
    }
  }
  return randomReviewers;
}

const form = document.querySelector(".form");
form.addEventListener("submit", async (e) => {
  e.preventDefault();

  // get random reviewers
  const reviewers = await getRandomReviewers();

  // reading the data from the from
  const paperTitle = e.target[0].value;
  const abstract = e.target[1].value;
  const presenterFirstName = e.target[2].value;
  const presenterLastName = e.target[3].value;
  const presenterEmail = e.target[4].value;
  const presenterAffiliation = e.target[5].value;
  let file = document.getElementById("pdf");

  const presenter = {
    firstName: presenterFirstName,
    lastName: presenterLastName,
    fullName: presenterFirstName + " " + presenterLastName,
    email: presenterEmail,
    affiliation: presenterAffiliation,
    presenter: true,
  };
  for (let i = 0; i < authors.length; i++) {
    authors[i].presenter = false;
  }
  authors.push(presenter);

  // paper object
  const newPaper = {
    id: getAuthorId(),
    paperTitle,
    abstract,
    // presenter: {
    //   firstName: presenterFirstName,
    //   lastName: presenterLastName,
    //   email: presenterEmail,
    //   affiliation: presenterAffiliation,
    // },
    authors,
    reviewers,
    file: file.value,
    reviews: [],
  };

  const jsonData = JSON.stringify(newPaper);

  // Write the data  to papers.json
  //http://localhost:3000/papers
  // await fetch("http://localhost:3000/papers", {
  //   method: "POST",
  //   body: jsonData,
  //   headers: {
  //     "Content-Type": "application/json",
  //   },
  // });
  if (JSON.parse(localStorage.getItem("papers")) === null) {
    const papers = await fetch("../papers.json");
    const papersJson = await papers.json();
    localStorage.setItem("papers", JSON.stringify(papersJson));
  }
  const papersJson = JSON.parse(localStorage.getItem("papers"));
  papersJson.push(newPaper);
  localStorage.setItem("papers", JSON.stringify(papersJson));
  e.target[0].value = "";
  e.target[1].value = "";
  e.target[2].value = "";
  e.target[3].value = "";
  e.target[4].value = "";

  file.value = "";
  // nav to the desired page
  // location.href = "index.html";
});
