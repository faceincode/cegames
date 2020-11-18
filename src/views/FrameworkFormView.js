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
      'framework-email': [],
      'framework-submit': [],
    }

    return (
      <span>
        <style dangerouslySetInnerHTML={{ __html: `
          @import url(/css/normalize.css);
          @import url(/css/webflow.css);
          @import url(/css/celanding.webflow.css);
        ` }} />
        <span className="af-view">
          <form id="email-form" name="email-form" data-name="Email Form" className="af-class-subscribe-form-flex">
            <div className="af-class-subscribe-form-input-wrapper">{map(proxies['framework-email'], props => <input type="email" maxLength={256} name="Subscriber-Email" data-name="Subscriber Email" placeholder="E-Mail Address" id="Subscriber-Email" required {...{...props, className: `af-class-subscribe-form-input w-input ${props.className || ''}`}}>{props.children}</input>)}</div>
            <div className="af-class-div-block-5">{map(proxies['framework-submit'], props => <input type="submit" value="Subscribe" data-wait="Please wait..." {...{...props, className: `af-class-submit-button-2 w-button ${props.className || ''}`}}>{props.children}</input>)}</div>
          </form>
        </span>
      </span>
    )
  }
}

export default FrameworkFormView

/* eslint-enable */