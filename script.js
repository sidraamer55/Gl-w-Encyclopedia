const url= "https://api.dictionaryapi.dev/api/v2/entries/en/";
const result= document.getElementById("result");
const sound= document.getElementById("sound");
const btn= document.getElementById("search-btn");

btn.addEventListener("click" , () => {
    let inpword = document.getElementById("inp-word").value;

    fetch(`${url}${inpword}`)
    .then((response) => response.json())
    .then((data) => {
        console.log("API Data:", data);

        if(!data || data.lenght ===0){
          result.innerHTML= `<h3 class="error"> Couldn't Find The Word </h3>`
          return;
        }

        let word= data[0];
        let phoneticText= word.phonetic || (word.phonetics && word.phonetics.length > 0 ? word.phonetics[0].text : "");
        let definition= word.meanings[0].definitions[0].definition;
        let partOfSpeech= word.meanings[0].partOfSpeech;
        let example= word.meanings[0].definitions[0].example || "";

        let audioUrl= null;
        if (word.phonetics && Array.isArray(word.phonetics)) {
          for (let i= 0; i<word.phonetics.length; i++) {
            if (word.phonetics[i].audio) {
              audioUrl= word.phonetics[i].audio;
              break;
            }
          }
        }

        result.innerHTML=`<div class="word">
            <h3>${inpword}</h3>
            <button onclick="playSound()" ${audioUrl ? "" : "disabled"}><i class="fa-solid fa-volume-high"></i></button>
        </div>
            <div class="details">
                <p>${partOfSpeech}</p>
                <p>/${phoneticText}/</p>
            </div>
          <p class="word-meaning"> ${definition} </p>
                  <p class="word-example"> ${example}  </p>`;

        if (audioUrl) {
          sound.setAttribute("src", audioUrl);
          sound.onerror= () => {
            console.error("Error loading audio: ", audioUrl);
            alert("Failed to load audio.");
          };
        } else {
          sound.removeAttribute("src");
          console.warn("No audio prounciation found for this word.");
        }
      })

      .catch(  (error) => {
        console.error("Fetch error: ", error);
        result.innerHTML= `<h3 class="error"> Couldn't Find The Word </h3>`;
      });
    });


function playSound() {
  sound.play().catch(error => {
    console.error("Playback failed: ", error);
    alert("Audio playback failed. Check console for details.");
  });
}