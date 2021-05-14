import React from 'react';

function TextBox(props) {
    return(
        <div class="textbox">
            <div class="title h1">{props.title}</div>
            <div class="body">{props.body.split("\n\n").map(res => <div class="content">{res}</div>)}</div>
        </div>
    );
}

export default TextBox;