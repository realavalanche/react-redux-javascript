import React from 'react';

class ListOfWords extends React.PureComponent {
    render() {
        return <span>{this.props.words.join(',')}</span>;
    }
}

export default ListOfWords