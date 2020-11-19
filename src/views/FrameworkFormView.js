/* eslint-disable */

import React from 'react'
import { createScope, map, transformProxies } from './helpers'

const scripts = [

]

let Controller

class FrameworkFormView extends React.Component {
  static get Controller() {
    if (Controller) return Controller

    try {
      Controller = require('../controllers/FrameworkFormController')
      Controller = Controller.default || Controller

      return Controller
    }
    catch (e) {
      if (e.code == 'MODULE_NOT_FOUND') {
        Controller = FrameworkFormView

        return Controller
      }

      throw e
    }
  }

  componentDidMount() {
    scripts.concat(Promise.resolve()).reduce((loaded, loading) => {
      return loaded.then((script) => {
        new Function(`
          with (this) {
            eval(arguments[0])
          }
        `).call(window, script)

        return loading
      })
    })
  }

  render() {
    const proxies = Controller !== FrameworkFormView ? transformProxies(this.props.children) : {
      'form-state-normal': [],
      'email': [],
      'submit': [],
      'form-state-success': [],
      'form-state-error': [],
    }

    return (
      <span>
        <style dangerouslySetInnerHTML={{ __html: `
          @import url(/css/normalize.css);
          @import url(/css/webflow.css);
          @import url(/css/celanding.webflow.css);
        ` }} />
        <span className="af-view">
          <div className="af-class-form-block w-form">
            {map(proxies['form-state-normal'], props => <form id="email-form" name="email-form" data-name="Email Form" method="post" action="https://cegames.us7.list-manage.com/subscribe/post?u=04ee9507edb15479a51e18fde&amp;id=d8b32178be" {...{...props, className: `af-class-subscribe-form-flex ${props.className || ''}`}}>{createScope(props.children, proxies => <React.Fragment>
              <div className="af-class-subscribe-form-input-wrapper">{map(proxies['email'], props => <input type="email" maxLength={256} name="email" data-name="email" placeholder="E-Mail Address" id="email" required {...{...props, className: `af-class-subscribe-form-input w-input ${props.className || ''}`}}>{props.children}</input>)}</div>
              <div className="af-class-div-block-5">{map(proxies['submit'], props => <input type="submit" value="Subscribe" data-wait="Please wait..." id="submit" {...{...props, className: `af-class-submit-button-2 w-button ${props.className || ''}`}}>{props.children}</input>)}</div>
            </React.Fragment>)}</form>)}
            {map(proxies['form-state-success'], props => <div {...{...props, className: `af-class-success-message w-form-done ${props.className || ''}`}}>{props.children ? props.children : <React.Fragment>
              <div className="af-class-text-block">Thank you for subscribing.</div>
            </React.Fragment>}</div>)}
            {map(proxies['form-state-error'], props => <div {...{...props, className: `af-class-error-message af-class-error-message-2 w-form-fail ${props.className || ''}`}}>{props.children ? props.children : <React.Fragment>
              <div className="af-class-text-block-2">Subscription&nbsp;Error.&nbsp;Please try again.</div>
            </React.Fragment>}</div>)}
          </div>
        </span>
      </span>
    )
  }
}

export default FrameworkFormView

/* eslint-enable */