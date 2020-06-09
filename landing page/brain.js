// create clock 

let clock = $(".clock");

function getTime() {

    let date = new Date();
    // console.log(date);
    let Hours = date.getHours();
    let Minutes = date.getMinutes();
    let Seconds = date.getSeconds();

    const ampm = Hours >= 12 ? "PM" : "AM";
    $("#am-pm").html(ampm)


    Hours = Hours%12 || 12;

    $(".all-data").css({
        "background": `linear-gradient(rgb(255, 255, 255,0.2),rgb(0, 0, 0,0.6)),url(images/pic${Hours}.jpg)`,
        "background-repeat": "no-repeat",
        "background-size": "cover"
    });

    $("#hour").html(Hours);
    if (Minutes >= 10) {
        $("#minutes").html(Minutes)
    }
    else {
        $("#minutes").html("0" + Minutes)
    }
    if (Seconds >= 10) {
        $("#seconds").html(Seconds)
    }
    else {
        $("#seconds").html("0" + Seconds)
    }
    // This is correct way to active our clock
    setTimeout(() => {
        getTime();
    }, 1000);
}

// And this is also good
// setInterval(() => {
// }, 1000);



function ChangeBGandGreeting() {
    let hour_now = new Date().getHours();
    // console.log(hour_now)
    if(hour_now < 12) {
        //morning
        $("#greeting").html("Good Morning");
    }
    else if(hour_now < 18) {
        // afternoon
        $("#greeting").html("Good Afternoon");
    }
    else {
        // evening
        $("#greeting").html("Good Evening");
    }

    setTimeout(() => {
        ChangeBGandGreeting();
    }, 1000);
}




function getName(){
    if(localStorage.getItem("name") === null) {
        $("#name").html("[name]");
    }
    else {
        $("#name").html(localStorage.getItem("name"));
    }
}

getName();

function updateName(e) {
    if(e.type === 'keypress') {
        // do this
        if(e.keyCode === 13) {
            localStorage.setItem('name',e.target.innerText);
            $("#name").blur();
        }
    }
    else {
        // do that
         localStorage.setItem('name',e.target.innerText);
    }
}


$("#name").on('keypress',updateName);
$("#name").on('blur',updateName);



function edit_taskBox() {

    localStorage.setItem("task",$("#task-box").val());
    $(".day-task").append(`<span style="font-size: 1.6rem;" id="entered_task"><i style="opacity: 0.5; font-size: 1.2rem; cursor: pointer; margin-right: 20px;" class="fas fa-check complete-task"></i>  ${$("#task-box").val()}<i style="opacity: 0.5; font-size: 1.2rem; cursor: pointer; margin-left: 20px;"  class="fas fa-times end-task"></i></span>`);
    $("#task-box").remove();
}


$(".day-task").on("keypress",function(e) {

    if(e.target.id === "task-box" && e.keyCode === 13) {
        $("#task-heading").html("TODAY");
        localStorage.setItem("time","TODAY");
       edit_taskBox();
    }
    
})


function getTask() {
    if(localStorage.getItem("task") === null || localStorage.getItem("time") === null) {
        return;
    }
    else {
        $("#task-box").remove();
        $(".day-task").append(`<span style="font-size: 1.6rem;" id="entered_task"><i style="opacity: 0.5; font-size: 1.2rem; cursor: pointer; margin-right: 20px;" class="fas fa-check complete-task"></i>${localStorage.getItem("task")}<i style="opacity: 0.5; font-size: 1.2rem; cursor: pointer; margin-left: 20px;"  class="fas fa-times end-task"></i></span>`);
        $("#task-heading").html(localStorage.getItem("time"));
    }
}


$(".day-task").on('click',function(e) {
    
    if(e.target.classList.contains("complete-task")) {
        $("#entered_task").css({"text-decoration":"line-through","text-decoration-color": "#00ff00"});
        localStorage.removeItem("task");
        setTimeout(() => {
            $("#entered_task").replaceWith(`<input type="text" id="task-box">`);
            $("#task-heading").html("What is your main focus today?");
        }, 2000);
        
        localStorage.removeItem('time');
        
        
    }
    else if(e.target.classList.contains("end-task")){

        $("#entered_task").css({"text-decoration":"line-through","text-decoration-color": "#ff0000"});
        localStorage.removeItem("task");
        setTimeout(() => {
            $("#entered_task").replaceWith(`<input type="text" id="task-box">`);
            $("#task-heading").html("What is your main focus today?");
        }, 2000);
        localStorage.removeItem('time');
        
    }
})



getTask();
getTime();
ChangeBGandGreeting();


