const emotion = {
  "happy":"😄",
  "smug":"😎",
  "lovestruck":"😭",
  "gross":"🤮",
  "scared":"😱",
  "tired":"🥱",
  "angry":"😤",
  "frustrated":"😩",
  "excited":"🤩",
}

function postView(containerEl){
  for (let index = bacefook.newsfeed.length - 1; index >= 0; index--) {
    const post = bacefook.newsfeed[index];
    const newsfeed = document.createElement("div");
    newsfeed.className = "feed";
    for (const key in post){
      if (key == "image"){
        const imgEl = document.createElement("img");
        imgEl.src = post.image["src"];
        imgEl.alt = post.image["alt"];
        newsfeed.append(imgEl);
      } else if(key == "timestamp"){
        const ele = document.createElement("div");
        ele.className = key;
        ele.innerText = moment(post[key]).calendar();
        newsfeed.append(ele);
      } else if(key == "feeling"){
        const ele = document.createElement("div");
        ele.className = key;
        ele.innerText = emotion[post[key]];
        newsfeed.append(ele);
      }  else {
        const ele = document.createElement("div");
        ele.className = key;
        ele.innerText = post[key];
        newsfeed.append(ele);
      }
    }
    containerEl.append(newsfeed);
  }
}

function displayPost(){
  const containerEl = document.querySelector("#newsfeed");
  containerEl.innerHTML="";
  postView(containerEl);
}

function showAddPost(){
  const postForm = document.querySelector(".form");
  const newsfeed = document.querySelector("#newsfeed");
  newsfeed.style.marginTop = "375px";
  postForm.classList.remove("hide");
}

function addPost(){
  const inputData = document.getElementsByTagName("input");
  const postText = document.getElementsByTagName("textarea"); 
  const postForm = document.querySelector(".form");
  const newsfeed = document.querySelector("#newsfeed");
  
  let user = localStorage.getItem("username");
  const result = {};
  
  result.friend = user;
  result.text = postText[0].value;
  result.feeling = inputData[0].value;
  result.timestamp = new Date();
  
  bacefook.newsfeed.push(result);
  console.log(bacefook.newsfeed);
  
  postForm.classList.add("hide");
  newsfeed.style.marginTop = "200px";
  displayPost();

}

window.addEventListener("load", () => {
  const containerEl = document.querySelector("#newsfeed");
  const h1 = document.querySelector("h1");
  const buttons = document.createElement("div");
  buttons.className = "buttonContainer";


  const divRefreshButton = document.createElement("div");
  divRefreshButton.innerText = 'Refresh';
  divRefreshButton.className = "button";
  buttons.append(divRefreshButton);
  divRefreshButton.addEventListener('click', displayPost);
  
  const showDivPostButton = document.createElement("div");
  showDivPostButton.innerText = 'Add Post';
  showDivPostButton.className = "button";
  buttons.append(showDivPostButton);
  showDivPostButton.addEventListener('click', showAddPost);

  h1.after(buttons);
 
  const postButton = document.querySelector("#submit");
  postButton.addEventListener("click",addPost);


  // This is a check to see if there's a username stored
  let username = localStorage.getItem("username");
  if (!username) {
    // Prompt for one if a username isn't found
    username = window.prompt("What is your name?");
    localStorage.setItem("username", username);
  }
  const namePlate = document.createElement("div");
  namePlate.className = "username";
  namePlate.innerText = username;
  h1.after(namePlate);

  postView(containerEl);

 
});





