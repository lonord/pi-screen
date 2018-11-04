import 'normalize.css'

import { injectGlobal } from 'emotion'
import * as React from 'react'
import * as ReactDOM from 'react-dom'
import App from './electron/ElectronApp'
import Store from './store/ElectronStore'

injectGlobal`
	html, body, #root {
		height: 100%;
	}
	body {
		font-family: -apple-system, BlinkMacSystemFont, "Microsoft YaHei", "Helvetica Neue", Helvetica, Arial, sans-serif;
	}
	* {
		box-sizing: border-box;
	}
`

let rootEl = document.getElementById('root')
if (!rootEl) {
	rootEl = document.createElement('div')
	rootEl.id = 'root'
	document.body.appendChild(rootEl)
}
const store = new Store()
ReactDOM.render(<App store={store}/>, rootEl)
