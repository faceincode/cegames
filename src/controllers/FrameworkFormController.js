import React from 'react'
import FrameworkFormView from '../views/FrameworkFormView'

class FrameworkFormController extends React.Component {
    state = {
        'mailSent': false,
    }

    render() {
        return (
            <FrameworkFormView>
                <email onChange={this.setEmail} />
                <submit onClick={this.submit} />
            </FrameworkFormView>
        )
    }

    setEmail = (e) => {
        this.setState({
            email: e.target.value
        })
    }

    submit = () => {
        console.log(this.state.email)
        mailSent = sendmail()
        if( mailSent == true) {
            this.setState({
                mailSent: true
            })
        }
    }
}

export default FrameworkFormController