import React from 'react';
import TextBox from '../components/textbox.js';

const about = "We're a group of friends (with raiding experience dating back to Vanilla) that wanted to  " +
    "stick together, but were tired of other raid teams not meeting our expectations. We " +
    "finally decided to just make our own guild and shape it into the friendly but determined " +
    "group we've always wanted!";

const expect_us = "• Progress Mythic content at a competitive rate. \n • Have knowledgeable enough leadership " +
"to recognize any issues while workin<br />g to fix them in a timely manner. \n " +
"• Maintain a raiding environment focused on respect for others. \n " +
"• Have a friendly, social guild atmosphere.";

const expect_you = "• Watch fight videos/research encounters as much as possible. \n " +
"• Come to raids prepared with flask, food, and potions. \n " +
"• Be fully knowledgeable of what your class needs, how to sim your character and how to read logs to improve your play. \n " +
"• Have a viable offspec and/or alt character to help facilitate roster flexibility on a fight-to-fight basis. \n " +
"• Don't be afraid to ask for help/advice if you're unsure of something.";

function About() {
    return(
        <div className="About">
          <div class="container">
                <TextBox title="About Us" body={about} />
                <TextBox title="What You Can Expect From Us" body={expect_us} />
                <TextBox title="What We Expect From You" body={expect_you} />
          </div>
        </div>
    );
}

export default About;