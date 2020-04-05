/* eslint-disable jsx-a11y/anchor-is-valid */
import React from 'react';
import ListOfWords from './ListOfWords'

class WordAdder extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            words: ['marklar']
        };
        this.handleClick = this.handleClick.bind(this);
    }

    handleClick() {
        // This section is bad style and causes a bug
        const words = this.state.words;
        words.push('markar');
        this.setState({ words });
    }

    render() {
        return (
            <div>
                <a className='btn' onClick={this.handleClick}>Add Word</a>
                <ListOfWords words={this.state.words} />
            </div>
        );
    }
}

export default WordAdder