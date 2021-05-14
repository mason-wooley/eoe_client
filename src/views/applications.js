import React from 'react';
import { withAuthenticationRequired } from "@auth0/auth0-react";

class Applications extends React.Component {
    constructor(props) {
      super(props);
      this.state = {
        names: [],
        answers: [],
        questions: [],
        currentCharacter: 0,
        currentAnswers: []
      };
      this.handleClick = this.handleClick.bind(this);
      this.getTableClass = this.getTableClass.bind(this);
    }
  
    handleChange(event) {
      this.setState({ name: event.target.value });
    }
  
    componentDidMount() {
      fetch(`/api/get-applications`)
        .then(response => response.json())
        .then(data => {

            const questions = data.questions;
            const applications = data.applications;

            console.log(applications);
            const applicantList = [];
            const answerList = [];

            for(const app of applications) {

                applicantList.push({ 
                    'name': app.name, 
                    'server': `${app.region}-${app.server}`, 
                    'main spec': app.main_spec, 
                    'off spec': app.off_spec,
                    'date': app.app_date
                });

                answerList.push(app.answers);
            }

            this.setState({
                names: applicantList,
                answers: answerList,
                questions: questions.map(x => x.text),
                currentCharacter: 0,
                currentAnswers: answerList[0]
            });
        });
    }

    handleClick(e) {
        let clickedRow = e.target.parentElement.rowIndex;

        if (clickedRow !== 0) {
            this.setState({
                currentCharacter: clickedRow - 1,
                currentAnswers: this.state.answers[clickedRow - 1]
            })
        }
    }

    getTableClass(index) {
        if (this.state.currentCharacter === index) {
            return "table-primary";
        }
        return "";
    }

    render() {

        let characterTable = this.state.names.map((character, index) => (<tr class={"" + this.getTableClass(index)}><td>{character.name}</td><td>{character.server}</td><td>{character['main spec']}</td><td>{character['off spec']}</td><td>{character['date']}</td></tr>));
        let answerTable = this.state.currentAnswers.map((answer, index) => (<tr><td>{this.state.questions[index]}</td><td>{answer}</td></tr>));

        return (
          <div className="container">
                <table class="table table-sm table-light table-bordered table-hover" onClick={this.handleClick}>
                    <thead>
                        <tr>
                            <th>Name</th>
                            <th>Server</th>
                            <th>Main Spec</th>
                            <th>Off Spec</th>
                            <th>Application Date</th>
                        </tr>
                    </thead>
                    <tbody>
                        {characterTable}
                    </tbody>
                </table>
                <table class="table table-light table-bordered table-hover">
                    <thead>
                        <tr>
                            <th>Question</th>
                            <th>Response</th>
                        </tr>
                    </thead>
                    <tbody>
                        {answerTable}
                    </tbody>
                </table>
          </div>
        );
    }
}

export default withAuthenticationRequired(Applications, {
    // TODO: Add a redirect component to fill the page and then use it here
    onRedirecting: () => <container><h1>Redirecting you to the login page...</h1></container>,
});