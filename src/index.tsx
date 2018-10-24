import 'normalize.css'

import { injectGlobal } from 'emotion'
import * as React from 'react'
import * as ReactDOM from 'react-dom'
import App from './app'

injectGlobal`
	html, body, #root {
		height: 100%;
	}
	body {
		font-family: -apple-system, BlinkMacSystemFont, "Microsoft YaHei", "Helvetica Neue", Helvetica, Arial, sans-serif;
	}
`

let rootEl = document.getElementById('root')
if (!rootEl) {
	rootEl = document.createElement('div')
	rootEl.id = 'root'
	document.body.appendChild(rootEl)
}
ReactDOM.render(<App />, rootEl)
