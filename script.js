const n = 20;

//fetching API
const getRandomeUser = async () => {
  const response = await fetch(`https://randomuser.me/api/?results=${n}`);
  return response.json();
}

// Loading data to webpage
const loadRandomeUser = (randomeUser) => {
  const data = randomeUser.results;
  console.log(data);
  let users = "";
  let chatUser = "";
  let chatUserDp;

  for(let {name:{first,last},login:{username},picture:{thumbnail: dp},registered:{date}} of data){
    // console.log(`${first} ${last}`);
    const time = date.split("T")[1].split(".")[0].substring(0,5);
    // console.log(time);
    if(chatUser == ""){
      chatUser = `
            <h1 class="right-name">${first} ${last}</h1>
            <p class="online-status">online</p>`;
            chatUserDp = `${dp}`;
    }
    users += `
         <tr class="contact">
            <td class="dp-col"><img class="dp" src="${dp}"></td>
            <td class="contact-name">
              <p id="bp1">${first} ${last}</p>
              <p><small><small>@${username}</small></small></p>
            </td>
            <td class="time"><small>${time}</small></td>
          </tr>`;
  }
  document.querySelector(".contact-table").innerHTML = users;
  document.querySelector(".chat-head .chat-name").innerHTML = chatUser;
  document.querySelector(".chat-head .dp").src = chatUserDp;
}


//loading content to site
document.addEventListener("DOMContentLoaded", async () => {
  const randomeUser = await getRandomeUser();
  console.log("ok");
  console.log(randomeUser);
  loadRandomeUser(randomeUser)
})