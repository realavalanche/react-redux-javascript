/* eslint-disable jsx-a11y/anchor-is-valid */
import React from 'react';
import ListOfWords from './ListOfWords'
import styles from '../App.module.css';

class WordAdder extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            words: ['marklar']
        };
    }

    handleClick = () => {
        // This section is bad style and causes a bug
        const words = this.state.words;
        words.push('markar');
        this.setState({ words });
    }

    render() {
        return (
            <div>
                <a style={{ marginRight: 20 }} className={styles.btn} onClick={this.handleClick}>Add Word</a>
                <ListOfWords data-test="list-of-words" words={this.state.words} />
            </div>
        );
    }
}

export default WordAdder