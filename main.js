
function getQuestions(){
    let myRequest = new XMLHttpRequest();
    myRequest.onreadystatechange = function(){
        if (this.readyState === 4 && this.status === 200) {
            console.log(this.responseText);
        }
        else{
            console.log('Error');
        }
    };
    myRequest.open("GET", "html-qustion.json", true);
    myRequest.send();
}
getQuestions();