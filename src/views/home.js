import React from 'react';
import TextBox from '../components/textbox.js';

const home_body = "<Envy of Eden> is a semi-hardcore progression guild formed 01/05/17 during " +
  "Legion. Our aim is to be a top-tier, competitive raiding guild on US-Area 52 as " +
  "Shadowlands progresses. We are confident we can achieve this so long as our members bring " +
  "forth the same passion we do for the game.";

function Home() {
    return (
        <div className="Home">
          <div className="container">
            <img src="https://i.imgur.com/nx6GZJa.png" style={{width: "1100px", paddingBottom: "20px"}} />
            <TextBox title="Home" body={home_body} />
            <div class="kill-videos">
              <div class="kill-video" id="kill1"><iframe width="544" height="306" src="https://www.youtube.com/embed/N-kkjCZ215o" title="YouTube video player" frameborder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture" allowfullscreen></iframe></div>
              <div class="kill-video" id="kill3"><iframe width="544" height="306" src="https://www.youtube.com/embed/EUTEGJXRSJE" title="YouTube video player" frameborder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture" allowfullscreen></iframe></div>
              <div class="kill-video" id="kill4"><iframe width="544" height="306" src="https://www.youtube.com/embed/Efk1cUqIUHQ" title="YouTube video player" frameborder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture" allowfullscreen></iframe></div>
              <div class="kill-video" id="kill5"><iframe width="544" height="306" src="https://www.youtube.com/embed/vVIEmrcKgZY" title="YouTube video player" frameborder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture" allowfullscreen></iframe></div>
              <div class="kill-video" id="kill6"><iframe width="544" height="306" src="https://www.youtube.com/embed/vVIEmrcKgZY" title="YouTube video player" frameborder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture" allowfullscreen></iframe></div>
              <div class="kill-video" id="kill7"><iframe width="544" height="306" src="https://www.youtube.com/embed/vVIEmrcKgZY" title="YouTube video player" frameborder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture" allowfullscreen></iframe></div>
            </div>
          </div>
        </div>
      );
}

export default Home;