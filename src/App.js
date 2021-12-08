import logo from './logo.svg';
import quotes from './quotes.json';
import effects from './effects.json';
import mestari2 from './mestari2.png';
import kauhu from './kaahu.mp3';
import './App.css';
import Speech from 'speak-tts'
import ImageEffect from 'react-image-effects'
import React from 'react';

function App() {
  const speech = new Speech() // will throw an exception if not browser supported

  if(speech.hasBrowserSupport()) { // returns a boolean
      console.log("speech synthesis supported")
  }

  var data = JSON.parse(JSON.stringify(quotes));
  var dataEf = JSON.parse(JSON.stringify(effects));
  var random = Math.floor(Math.random(0) * data.length);
  var randomEf = Math.floor(Math.random(0) * dataEf.length);
  var randomQuote = "Tero, " + data[random];
  var randomEffect = dataEf[randomEf];

  var randomPos = Math.floor(Math.random() * 4) + 1;


  console.log("Random: " + random);
  speech.init({
    'volume': 1,
    'rate': 0.5,
    'pitch': 0.3
  }).then((data) => {
    console.log("Speech is ready, voices are available", data)
    console.log("Quote: " + randomQuote);
    console.log(randomEffect);
    var audio = new Audio(kauhu);
    audio.loop = true;
    audio.play();
    speech.speak({
      text: randomQuote,
      queue: false
    }).then(() => {
        console.log("Success !")
    }).catch(e => {
        console.error("An error occurred :", e)
    })
  }).catch(e => {
      console.error("An error occured while initializing : ", e)
  })

  return (
    <div className="App">
      <p className={"p"+randomPos}>{randomQuote}</p>
      <button onClick={Clicked}>Uusi loitsu</button>
        <div className="shake">
          <ImageEffect
            url={mestari2}
            effect={randomEffect}
            width="100vw"
            height="100vh"
          />
        </div>
        
    </div>
  );
}

function Clicked() {
  window.location.reload(false);
}

export default App;
