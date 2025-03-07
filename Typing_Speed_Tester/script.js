const sentences=[
    "I love playing video games.",
    "The new game is so much fun.",
    "I'm really good at Fortnite.",
    "I'm not very good at Minecraft.",
    "I love playing video games with my friends.",
    "The new game is really hard.",
    "I'm really good at Call of Duty.",
    "I'm not very good at Overwatch.",
    "I love playing video games with my family.",
    "The new game is really easy.",
    ];
 
    //selecting elements
    const displayText= document.getElementById('display-text');
    const userInput= document.getElementById('user-input');
    const restartBtn= document.getElementById('restart-btn');
    const timerElement= document.getElementById('timer');
    const wpmElement= document.getElementById('wpm');
    const accuracyElement= document.getElementById('accuracy');

    //some variables for timer and accuracy

    let timer;
    let timeElapsed=0;
    let startTime;
    let correctWords=0;

    //function to start timer

    function startTimer(){
        startTime=new Date();
        timer=setInterval(()=>{
            timeElapsed=Math.floor((new Date()-startTime)/1000);
            timerElement.textContent=timeElapsed
        },1000)
    }

    //function to stop the timer
    function stopTimer(){
        clearInterval(timer);
    }

    //function to calculate wpm
    function calculateWpm(){
        const wordsTyped=userInput.value.trim().split(/\s+/).length;
        return Math.round((wordsTyped/timeElapsed)*60);
    }

    //function to calculate accuracy
    function calculateAccuracy(){
        const originalWords=displayText.textContent.trim().split(/\s+/);
        const typedWords=userInput.value.trim().split(/\s+/);
        let correctCount=0;
        for(let i=0; i< typedWords.length;i++){
            if(typedWords[i]==originalWords[i]){
                correctCount++;
        }
    }
    return Math.round((correctCount/originalWords.length)*100);
    }

    //fucntion to restart the test
    function restartTest(){
        stopTimer();
        timeElapsed=0;
        timerElement.textContent='0';
        wpmElement.textContent='0';
        accuracyElement.textContent='100';
        userInput.value='';
        userInput.disabled=false;
        displayText.textContent=sentences[Math.floor(Math.random() * sentences.length)];
    }

    //event listener for input
    userInput.addEventListener("input",()=>{
        if(!startTime){
            startTimer();
        }
        wpmElement.textContent=calculateWpm();
        accuracyElement.textContent=calculateAccuracy();
       
//stop the timer when user completes typing
if(userInput.value.trim()===displayText.textContent.trim()){
    stopTimer();
}

    })

    restartBtn.addEventListener("click",restartTest);
    restartTest();
