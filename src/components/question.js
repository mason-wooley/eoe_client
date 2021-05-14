import React from 'react';

function InputField(props) {
    return(
        <textarea
        type="text"
        class="form-control"
        id={props.id}
        rows={props.rows}
        required
        />
    );
}
    
function Label(props) {
    return(
        <label
            for={props.id}
        >
            {props.data}
        </label>
    );
}
      
function Question(props) {
    return(
        <div class="form-group">
            <Label 
            for={props.id}
            data={props.data}
            />
            <InputField 
            id={props.id}
            rows={props.rows}
            />
        </div>
    );
}

export {Label};
export default Question;