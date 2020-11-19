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
      'email': [],
      'submit': [],
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
            <form id="email-form" name="email-form" data-name="Email Form" className="af-class-subscribe-form-flex">
              <div className="af-class-subscribe-form-input-wrapper">{map(proxies['email'], props => <input type="email" maxLength={256} name="email" data-name="email" placeholder="E-Mail Address" id="email" required {...{...props, className: `af-class-subscribe-form-input w-input ${props.className || ''}`}}>{props.children}</input>)}</div>
              <div className="af-class-div-block-5">{map(proxies['submit'], props => <input type="submit" value="Subscribe" data-wait="Please wait..." id="submit" {...{...props, className: `af-class-submit-button-2 w-button ${props.className || ''}`}}>{props.children}</input>)}</div>
            </form>
            <div className="af-class-success-message w-form-done">
              <div className="af-class-text-block">Thank you for subscribing.</div>
            </div>
            <div className="af-class-error-message af-class-error-message-2 w-form-fail">
              <div className="af-class-text-block-2">Subscription&nbsp;Error.&nbsp;Please try again.</div>
            </div>
          </div>
        </span>
      </span>
    )
  }
}

export default FrameworkFormView

/* eslint-enable */