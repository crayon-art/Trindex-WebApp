//add event listener to inject code on page load
window.addEventListener("DOMContentLoaded", async()=>{
    try{
//variables
        //set variable to regulate voting
        let vote = false;

        //set page name for the selected entry
        const name = (document.getElementById("name")).innerText;

// Fetch item data from the server
         const popResponse = await fetch(`/popularity/${name}`);
         let popScore = await popResponse.json();

        const commentResponse = await fetch(`/comments/${name}`);
        let comments = await commentResponse.json();
        let commentsArr = comments[0];
        let date = comments[1];

        const visit = document.getElementById("visitSite");

//add an event listener for when the visit button is clicked
//querry server for url
        visit.addEventListener("click", async ()=>{
                const response = await fetch(`/name_url/${name}`);
                const url = await response.text();
            const confirmation = confirm ("You are leaving this site. OK?");

            if(confirmation){
                window.location.href = url;
            }
        });

//function to update popularity score
         const updateScore = (popScore)=>{
             const temp = document.getElementById("popularity");
             temp.innerText = `Popularity Score: ${popScore}`;
         };
         updateScore(popScore);

//add listener event for clicking thumbs up and thumbs down
         const thumbsUpButton = document.getElementById("thumbsup");
         thumbsUpButton.addEventListener("click", async() => {
            if (!vote){
                popScore +=1;
                updateScore(popScore);
                // Update popularity score on the server
                await fetch("/update-popularity", {
                    method: "POST",
                    headers: {
                    "Content-Type": "application/json"
                    },
                    body: JSON.stringify({
                        name:`${name}`,
                        increment:true
                    })
                });
              vote = true;
            }
         });

         const thumbsDownButton = document.getElementById("thumbsdown");
        thumbsDownButton.addEventListener("click", async() => {

                if (!vote){
                    if(popScore>0){
                        popScore-=1;
                    }
                    updateScore(popScore);
                    // Update popularity score on the server
                    await fetch("/update-popularity", {
                        method: "POST",
                        headers: {
                        "Content-Type": "application/json"
                        },
                        body: JSON.stringify({
                            name:`${name}`,
                            increment:false
                        })
                    });
                    vote = true;
                }
        });

        //function to format date
        let formatDate = (date) => {

                const options = {
                    year: 'numeric',
                    month: 'short',
                    day: 'numeric',
                    hour: 'numeric',
                    minute: 'numeric',
                    hour12: true,
                };

                return new Intl.DateTimeFormat('en-US', options).format(date);
            }

// // add event listener for when a new comment is submitted
        const submitBtn = document.getElementById("addCommentBtn");
        submitBtn.addEventListener("click", async()=>{
        const commentBox = document.getElementById("commentBox");

            if (commentBox.value!==""){
                    commentsArr.push(commentBox.value);

                // Get the current date and time
                const now = new Date();

                // Format the date
                const formattedDate = formatDate(now);

                date.push(formattedDate);

                // Store comments on the server
                await fetch("/add-comment", {
                        method: "POST",
                        headers: {
                        "Content-Type": "application/json"
                        },
                        body: JSON.stringify({
                            name:`${name}`,
                            comment: commentBox.value,
                            created_at: formattedDate
                        })
                });

                    commentsCounterUpdate();
                    if(commentsArr.length>1&&document.getElementById("listOfComments")){
                            const temp4 = document.getElementById("listOfComments");
                            const addComments = document.getElementById("container");
                            addComments.removeChild(temp4);
                    }
                    populateComments();
                    commentBox.value = "";
            }
        });

// // update comments counter
        const commentsCounterUpdate = ()=>{
            const commentsTitle = document.getElementById("commentsTitle");
            commentsTitle.innerText = `Comments (${commentsArr.length})`;
        }
        commentsCounterUpdate();

// //function to populate comments
        const populateComments = () =>{
            const newdiv6 = document.createElement("div");
            const addComments = document.getElementById("container");
            newdiv6.id = "listOfComments";
            addComments.appendChild(newdiv6);

        const footNote = document.getElementById("footer");
        document.body.removeChild(footNote);

            for (let i=0; i<commentsArr.length; i++){
                    const temp3 = document.createElement("div");

                    if(i===1||i%2!==0){
                            temp3.id="lightbackground";
                    }
                    else temp3.id = "darkbackground";

                    temp3.className = `comment comment${i+1}`;

                    temp3.innerHTML = `<div id="comments">
                                            <p id = "date">${date[i]}</p>
                                            <p id = "commentInfo">${commentsArr[i]}</p>
                                        </div>`;
                    const delElem = document.getElementById("listOfComments");
                    delElem.appendChild(temp3);

        // //add delete button to delete comment
        //<button class="delComment" id=delComment${i+1}>❌</button>`;
        //             const delComment = document.getElementById(`delComment${i+1}`);
        //             delComment.addEventListener("click", async()=>{
        //                 commentsArr.splice(i, 1);
        //                 const temp = document.getElementsByClassName(`comment${i+1}`)[0];
        //                 const parent = document.getElementById("listOfComments");
        //                 parent.removeChild(temp);
        //                 commentsCounterUpdate();

        // // Re-populate comments to fix IDs and classes
        //                 const temp2 = document.getElementById("listOfComments");
        //                 document.body.removeChild(temp2);
        //                 if(commentsArr.length>0){
        //                         populateComments();
        //                 }
        //         });
            }
            document.body.appendChild(footNote);
        }

// //add event listener for when the comments button is clicked
        const allComments = document.getElementById("commentsTitle");
        allComments.addEventListener("click", async()=>{
                if(!document.getElementById("listOfComments")){
                        populateComments();
                        commentsCounterUpdate();
                }
                else {
                        delElem = document.getElementById("listOfComments");
                        const addComments = document.getElementById("container");
                        addComments.removeChild(delElem);
                        commentsCounterUpdate();
                }
        });





    }catch (e) {
        console.log("Wayyz it look like something went wrong...");
    }
});
