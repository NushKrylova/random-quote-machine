import React from 'react';
import './Quotes.css';

class Quotes extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      quoteText: '',
      quoteAuthor: ''
    };
  }
  async getRandomQuote() {
    function getRandomInt(max) {
      return Math.floor(Math.random() * Math.floor(max));
    }

    let quote
    await fetch('https://gist.githubusercontent.com/camperbot/5a022b72e96c4c9585c32bf6a75f62d9/raw/e3c6895ce42069f0ee7e991229064f167fe8ccdc/quotes.json')
      .then((response) => {
        return response.json();
      })
      .then((data) => {
        quote = data.quotes[getRandomInt(101)]
      });

    this.setState({
      quoteText: quote["quote"],
      quoteAuthor: "- ".concat(quote["author"])
    })
  }
  async componentDidMount() {
    await this.getRandomQuote()
  }
  async newQuote() {
    await this.getRandomQuote()
  }
  render() {
    return (
      <div id="parent">
        <div id="quote-box" className="box">
          <div id="quote-box" className="text-content">
            <p id="text" className="text text-quote">{this.state.quoteText}</p>
            <p id="author" className="text">{this.state.quoteAuthor}</p>
          </div>
          <div id="buttons">
            <a id="tweet-quote" type="button" className="btn btn-custom" aria-label="Left Align" href="https://twitter.com/intent/tweet">
              <span class="fa fa-twitter fa-lg" aria-hidden="true"></span>
            </a>
            <button id="new-quote" className="btn btn-custom" onClick={this.newQuote.bind(this)}>New Quote</button>
          </div>
        </div>
      </div>
    );
  }
}
export default Quotes;
