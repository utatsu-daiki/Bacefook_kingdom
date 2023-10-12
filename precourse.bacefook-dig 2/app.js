

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
  const username = document.querySelector(".username");
  username.style.paddingTop = "275px";
  postForm.classList.remove("hide");
}

function addPost(){
  const inputData = document.getElementsByTagName("input");
  const postText = document.getElementsByTagName("textarea"); 
  const postForm = document.querySelector(".form");
  const username = document.querySelector(".username");
  
  let user = localStorage.getItem("username");
  const result = {};
  
  result.friend = user;
  result.text = postText[0].value;
  result.feeling = inputData[0].value;
  result.timestamp = new Date();
  
  bacefook.newsfeed.push(result);
  console.log(bacefook.newsfeed);
  
  postForm.classList.add("hide");
  username.style.paddingTop = "100px";
  displayPost();

}

window.addEventListener("load", () => {
  const containerEl = document.querySelector("#newsfeed");
  const h1 = document.querySelector("h1");

  const divRefreshButton = document.createElement("div");
  const refreshButton = document.createElement('button');
  refreshButton.textContent = 'Refresh!';
  divRefreshButton.className = "button";
  divRefreshButton.append(refreshButton);
  h1.after(divRefreshButton);
  refreshButton.addEventListener('click', displayPost);
  
  const showDivPostButton = document.createElement("div");
  const showPostButton = document.createElement('button');
  showPostButton.textContent = 'Show Post!';
  showDivPostButton.className = "button";
  showDivPostButton.append(showPostButton);
  h1.after(showDivPostButton);
  showPostButton.addEventListener('click', showAddPost);
 
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





