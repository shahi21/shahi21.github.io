const textInput=document.getElementById("text-input");
const voiceSelect=document.getElementById('voice-select');
const speakBtn=document.getElementById("speak-btn");
const stopBtn=document.getElementById("stop-btn");


let speech=window.speechSynthesis;//This is a Web Speech API that allows the browser to convert text into speech
let voices=[];

//Loading available voices
function loadVoices(){
    voices=speech.getVoices();//.getVoices() is an inbuilt method in Web Speech API.
    voiceSelect.innerHTML=""; //clear any previous options
    voices.forEach((voice,index)=>{
        const option=document.createElement("option");//creates a new <option> element
        option.value=index;
        option.textContent=`${voice.name} (${voice.lang}) `;
        voiceSelect.appendChild(option);
    })
}
//reloading voices on change
speech.onvoiceschanged=loadVoices;

function speakText(){
    if(textInput.value.trim()==="")
        return;
    const speakText= new SpeechSynthesisUtterance(textInput.value);
    const selectedVoice=voices[voiceSelect.value];

    if(selectedVoice){
        speakText.voice=selectedVoice;
    }
    speech.speak(speakText)

}
function stopSpeech(){
    speech.cancel();
}

speakBtn.addEventListener("click",speakText);
stopBtn.addEventListener("click",stopSpeech);
