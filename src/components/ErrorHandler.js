import React from 'react'

class ErrorHandler extends React.Component {
    constructor(props) {
        super(props)
        this.state = {
            hasError: false
        }
    }
    static getDerievedStateFromError() {
        debugger
        console.log('comes here')
        return { hasError: true }
    }

    componentDidCatch() {
        debugger
        this.setState({ hasError: true })
    }

    render() {
        return (
            <div>
                {this.state.hasError ?
                    <div>
                        You have landed on error page
                    </div>
                    :
                    this.props.children
                }
            </div>
        )
    }
}

export default ErrorHandler