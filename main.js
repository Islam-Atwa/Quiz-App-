    // select elements
    let countSpan = document.querySelector(".quiz-info .count");
    let bulletsSpanContainer = document.querySelector(".bullets .spans");
    let quizArea = document.querySelector(".quiz-area");
    let answerArea = document.querySelector(".answer-area");
    let submitButton = document.querySelector(".submit-button"); // select the submit button

    let resultsContainer = document.querySelector(".result");


    // set options   
    let currentIndex = 0;
    let rightAnswers = 0;
    
     // تعريف qustion في النطاق العام


function getQuestions(){
    let myRequest = new XMLHttpRequest();
    myRequest.onreadystatechange = function () {
    if (this.readyState === 4 && this.status === 200) {
        
        let qustion = JSON.parse(this.responseText);
        let qCount = qustion.length;
        // console.log("Request Status:", this.status); // Add this line to check the status.
        createBullets(qCount);
        addQustionData(qustion[currentIndex], qCount);

        // Click on Submit Button
        submitButton.onclick = () => {
            let theRightAnswer = qustion[currentIndex].right_answer;
            // console.log(theRightAnswer);
            currentIndex++; // increase index

            // check the answer
            checkAnswer(theRightAnswer, qCount);

            // Remove the old question
            quizArea.innerHTML = "";
            answerArea.innerHTML = "";
            // add new question
            addQustionData(qustion[currentIndex], qCount);

            // Handel Bullets
            handelBullets();

            showResult(qCount);
        }
    }
};

myRequest.open("GET", "html-qustion.json", true);
myRequest.send();
}
getQuestions();

    // create bullets fn

function createBullets(num) {
    countSpan.innerHTML = num;
    
    // Create Spans
    for (let i = 0; i < num; i++) {
        // Create Bullet
        let theBullet = document.createElement("span");
    
        // Check If Its First Span
        if (i === 0) {
        theBullet.className = "on";
        }
    
        // Append Bullets To Main Bullet Container
        bulletsSpanContainer.appendChild(theBullet);
    }
}

function addQustionData(obj, count){
    
    if (currentIndex < count){

        let qTitle = document.createElement("h2"); // create question title
    
        let qText = document.createTextNode(obj['title']); // create question text
    
        qTitle.appendChild(qText); // append text to title H2
    
        quizArea.appendChild(qTitle); // append title to quiz area
    
        for (let i =1; i <= 4; i++){
            let mainDiv = document.createElement("div");  // create main div
            mainDiv.className = "answer"; // add class to main div
    
            let radioInput = document.createElement("input"); // create radio input
            radioInput.name = "qustion"; // add name to radio input
            radioInput.type = "radio"; // add type to radio input
            radioInput.id = `answer${i}`;    // add id to radio input
            radioInput.dataset.answer = obj[`answer${i}`]; // add data answer to radio input
    
            let theLable = document.createElement("label"); // create label
            theLable.htmlFor = `answer${i}`; // add for to label
    
            let theLableText = document.createTextNode(obj[`answer${i}`]); // create text for label
            theLable.appendChild(theLableText); // append text to label
    
            mainDiv.appendChild(radioInput); // append radio input to main div
            mainDiv.appendChild(theLable); // append lable to main div
    
            // append all main divs to answer area 
            answerArea.appendChild(mainDiv);
        }   
    }


}

function checkAnswer(rAnswer, count){
    let allAnswers = document.getElementsByName("qustion");
    let ChooseAnswer;

    for(let i =0; i < allAnswers.length; i++){
        if(allAnswers[i].checked){
            ChooseAnswer = allAnswers[i].dataset.answer;
        }
    }

    console.log(`Choosen Answer Is:${ChooseAnswer}`);
    console.log(`The Right answer Is:${rAnswer}`);
    
    // check right answer 
    if (rAnswer === ChooseAnswer){
        rightAnswers++;
        console.log("good answer ")
    }
    // check if the answer  is null
    if(ChooseAnswer === undefined){
        alert("من فضلك اختر اجابة"); 
        currentIndex--;
    }
}

// Hansel Bullets

function handelBullets(){
    let bulletSpan = document.querySelectorAll(".bullets .spans .span");

    let arrayOfSpan = Array.from(bulletSpan);
    arrayOfSpan.forEach((span, index)=>
    {
        if(currentIndex === index){
            span.className = "on";
        }
    });
}    


function showResult(count){
    let theResults;
    // لو رقم السؤال الحالي يساوي عدد الاسئلة الكلي  --> انهي الاختبار
    if (currentIndex === count){
        alert("Quiz End");
        quizArea.remove();
        answerArea.remove();
        submitButton.remove();
        bulletsSpanContainer.remove();
        theResults = `<span class="result">Your result </span>, ${rightAnswers} / ${count}`;

        resultsContainer.style.textAlign = "center"; // center the result
        
        let result = (`${rightAnswers} From ${count}`);
        alert(`Your Result IS : ${result}`);
        resultsContainer.innerHTML = theResults;
        resultsContainer.style.padding = "10px";
        resultsContainer.style.backgroundColor = "white";
        resultsContainer.style.marginTop = "10px";
    }

}