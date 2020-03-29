import React from 'react'

const Footer = (props) => {
    const { title } = props
    return (
        <div>
            <div>
                Welcome to the {this.state.pageTitle}
            </div>
            <div>
                {this.props.pageTitle}
            </div>
            <div>
                <button onClick={this.props.clickHandler}>Hey It's me</button>
            </div>
            <Footer title='foot' />
        </div>
    )
}

export default Footer