//selecting all required elements
const info_box = document.querySelector(".info_box");
const exit_btn = info_box.querySelector(".buttons .quit");
const continue_btn = info_box.querySelector(".buttons .restart");
const start_btn = info_box.querySelector(".buttons .start");
const quiz_box = document.querySelector(".quiz_box");
const result_box = document.querySelector(".result_box");
const score_box = document.querySelector(".score_box"); 
const reset_box = document.querySelector(".reset_box");
const submit_btn = info_box.querySelector(".buttons .submit");
const reset_btn = info_box.querySelector(".buttons .reset");
const initialsEl = document.getElementById('initials');
const highScoresListEl = document.getElementById('highscores-list');
const option_list = document.querySelector(".option_list");
const time_line = document.querySelector("header .time_line");
const timeText = document.querySelector(".timer .time_left_txt");
const timeCount = document.querySelector(".timer .timer_sec");
const restart_quiz = result_box.querySelector(".buttons .restart");
const quit_quiz = result_box.querySelector(".buttons .quit");
const viewscores_btn = info_box.querySelector(".buttons .info-title");





// if startQuiz button clicked

    info_box.classList.add("activeInfo"); //show info box




// if continueQuiz button clicked
start_btn.onclick = ()=>{
    info_box.classList.remove("activeInfo"); //hide info box
    quiz_box.classList.add("activeQuiz"); //show quiz box
    showQuestions(0); //calling showQestions function
    queCounter(1); //passing 1 parameter to queCounter
    startTimer(75); //calling startTimer function
    startTimerLine(0); //calling startTimerLine function
}



let timeValue=74;
timeLinevalue= 0;
let que_count = 0;
let que_numb = 1;
let userScore = 0;
let counter;
let counterLine;
let widthValue = 0;




const next_btn = document.querySelector("footer .next_btn");
const bottom_ques_counter = document.querySelector("footer .total_que");


// getting questions and options from array

function showQuestions(index){
    const que_text = document.querySelector(".que_text");

    //creating the sentence - linking the question number and the question text from the file question.js
    let que_tag = questions[index].numb + ". " + questions[index].question; 
    //creating a variable which brings the option from each sentence from the question.js file
    let option_tag = 
    '<div class="option">'+ questions[index].options[0] +'</div>'
    + '<div class="option">'+ questions[index].options[1] +'</div>'
    + '<div class="option">'+ questions[index].options[2] +'</div>'
    + '<div class="option">'+ questions[index].options[3] +'</div>';
    que_text.innerHTML = que_tag; //making the const que_tag equals to the class que_text from the Html making the question pop-up on the screen
    option_list.innerHTML = option_tag; //making the const option_tag equals to the class option_list from the Html making the options pop-up on the screen
    
    const option = option_list.querySelectorAll(".option");   
                  
        
    // set onclick attribute to all available options
    for(i=0; i < option.length; i++){
        option[i].setAttribute("onclick", "optionSelected(this)");//calls the option select and informs that the option selected was this.
       }

}

//Start Timer

function startTimer(){
    counter = setInterval(timer, 1000);
    function timer(){
        timeCount.textContent = timeValue; //changing the value of timeCount with time value
        timeValue--; //decrement the time value
        if (timeValue < 9){ //if timer is less than 9
            let addZero = timeCount.textContent; 
            timeCount.textContent = "0" + addZero; //add a 0 before time value
        }
        if (timeValue < 0){ //if timer is less than 0
            clearInterval(counter); //clear counter
            timeText.textContent = "Time Off"; //change the time text to time off
            showResult(); //show the result
        }
    }
}

//Start Timer Line

function startTimerLine(){
    counterLine = setInterval(timer, 90);    
    function timer(){
        timeLinevalue += 1; //upgrading time value with 1       
        time_line.style.width =  timeLinevalue  + "px"; //increasing width of time_line with px by time value
        if(time > 847){ //if time value is greater than 549
            clearInterval(counterLine); //clear counterLine
        }
    }
}
  

//if user clicked on option
let userAns;
let correcAns;

function optionSelected(answer){
    //clearInterval(counter); //clear counter
    //clearInterval(counterLine); //clear counterLine
    
    const allOptions = option_list.children.length; //getting all option items

      userAns = answer.textContent; //getting user selected option 
      correcAns = questions[que_count].answer; //getting correct answer from array
    
    if(userAns == correcAns){ //if user selected option is equal to array's correct answer
        userScore += 1; //upgrading score value with 1  
        
        document.getElementById("demo").setAttribute("class", "qtn_answer_correct"); 
        document.getElementById("demo").innerHTML="Your Previous question was CORRECT";   
       
    }else{ 

        document.getElementById("demo").setAttribute("class", "qtn_answer_wrong");
        document.getElementById("demo").innerHTML="Your Previous question was WRONG";
        timeValue -= 10; 
        timeLinevalue += 112;       
               
    }
       
    next_question();
}



// Once Question is answred is goes to next question

function next_question() {
    
    if(que_count < questions.length - 1 ){ //if question count is less than total question length
        que_count++; //increment the que_count value
        que_numb++; //increment the que_numb value
        showQuestions(que_count); //calling showQestions function
        queCounter(que_numb); //passing que_numb value to queCounter
        //startTimerLine(widthValue); //calling startTimerLine function
        //timeText.textContent = "Time Left"; //change the timeText to Time Left        
    }else{
        clearInterval(counter); //clear counter
        clearInterval(counterLine); //clear counterLine
        showResult(); //calling showResult function        
    }  
   
}



function showResult(){
    info_box.classList.remove("activeInfo"); //hide info box
    quiz_box.classList.remove("activeQuiz"); //hide quiz box
    result_box.classList.add("activeResult"); //show result box
    const scoreText = result_box.querySelector(".score_text");
    if (userScore > 3){ // if user scored more than 3
        //creating a new span tag and passing the user score number and total question number
        let scoreTag = '<span>and congrats!, You got <p>'+ userScore +'</p> out of <p>'+ questions.length +'</p></span>';
        scoreText.innerHTML = scoreTag;  //adding new span tag inside score_Text
    }
    else if(userScore > 1){ // if user scored more than 1
        let scoreTag = '<span> Nice , You got <p>'+ userScore +'</p> out of <p>'+ questions.length +'</p></span>';
        scoreText.innerHTML = scoreTag;
    }
    else{ // if user scored less than 1
        let scoreTag = '<span> Sorry, You got only <p>'+ userScore +'</p> out of <p>'+ questions.length +'</p></span>';
        scoreText.innerHTML = scoreTag;
    }
}

//function submit(){

    //result_box.classList.remove("activeResult");//hide result box  
    //score_box.classList.add("activeScore");//show score box

//}

function handleSubmit() {
    finalScore=userScore;
    let initials = initialsEl.value;
    // get array from storage, or initialize as empty array
    let highScoresList = JSON.parse(localStorage.getItem('highScores')) || [];
    // push new score to array
    highScoresList.push({ initials: initials, score: finalScore });
    // sort array ascending
    highScoresList = highScoresList.sort((curr, next) => {
        if (curr.score < next.score) {
            return 1
        } else if (curr.score > next.score) {
            return -1
        } else {
            return 0
        }
    });
    // set updated array to local storage
    localStorage.setItem('highScores', JSON.stringify(highScoresList))
    
    //call the function Populate HighScores
    return populateHighScores();
}



function populateHighScores() {

    result_box.classList.remove("activeResult");//hide result box  
    score_box.classList.add("activeScore");//show score box

    // get array from storage, or initialize as empty array
    let highScoresList = JSON.parse(localStorage.getItem('highScores')) || [];
    // populate highscores list
    let list = '';
    highScoresList.forEach(score => {
        list = list + '<p>' + score.initials + '  :  ' + score.score + '</p>';
    });
    highScoresListEl.innerHTML = list;
}
    

function queCounter(index){
    //creating a new span tag and passing the question number and total question
    let totalQueCounTag = '<span><p>'+ index +'</p> of <p>'+ questions.length +'</p> Questions</span>';
    bottom_ques_counter.innerHTML = totalQueCounTag;  //adding new span tag inside bottom_ques_counter
}




// if restartQuiz button clicked
function restart(){
    window.location.reload();
}


// if quitQuiz button clicked
function quit(){
    window.close();

}

//Reset Scores
function reset() {
    localStorage.clear();
    populateHighScores();
}





function viewHighScores(){
  
info_box.classList.remove("activeInfo"); //hide info box
quiz_box.classList.remove("activeQuiz"); //hide quiz box
reset_box.classList.add("activereset"); //hide quiz box
return populateHighScores();
}






