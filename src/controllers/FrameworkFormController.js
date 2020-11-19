import React from 'react'
import FrameworkFormView from '../views/FrameworkFormView'

import nodemailer from 'nodemailer'

// EMAIL CONFIGURATION
var transporter = nodemailer.createTransport({
    service: "gmail",
    auth: {
        user: process.env.EMAIL_ADDRESS,
        pass: process.env.EMAIL_PASSWORD
    }
});

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

        var mailOptions = {
            sender: process.env.EMAIL_ADDRESS,
            from: this.state.email,
            to: process.env.EMAIL_ADDRESS,
            subject: '[Framework Subscription]',
            text: "Subscribe to The Framework"
        }

        try {
            transporter.sendMail(mailOptions, function (error, info) {
                if (error) {
                    console.log(error);
                } else {
                    console.log('Subscribed successfully:\n', this.state.email);
                    this.setState({
                        mailSent: true
                    })
                }
            })
        } catch(error) {
            console.log(error);
        }
    }

}

export default FrameworkFormController