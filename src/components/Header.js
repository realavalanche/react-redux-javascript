import React from 'react'
import Footer from './Footer'

class Header extends React.PureComponent {
    constructor(props) {
        super(props)
        this.state = {
            pageTitle: 'Home Page'
        }
    }

    handleChange = (e) => {
        this.setState({
            value: e.target.value
        })
    }

    clickHandler = () => {
        this.setState({
            clicked: !this.state.clicked
        })
    }

    render() {
        return (
            <React.Fragment>
                <div>
                    <input type='text' onChange={this.handleChange} />
                </div>
                <div>
                    Updated value : {this.state.value}
                </div>
                <Footer startValue={this.state.value} clickHandler={this.clickHandler} />
                <div>
                    Btn Clicked {this.state.clicked ? 'Yes' : 'No'}
                </div>
            </React.Fragment>
        )
    }
}

export default Header