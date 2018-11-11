import 'normalize.css'

import { injectGlobal } from 'emotion'
import * as React from 'react'
import * as ReactDOM from 'react-dom'
import Store from './store/WebStore'
import { getRootElement } from './util/dom'
import App from './web/WebApp'

injectGlobal`
	html, body, #root {
		height: 100%;
	}
	body {
		font-family: -apple-system, BlinkMacSystemFont, "Microsoft YaHei", "Helvetica Neue", Helvetica, Arial, sans-serif;
	}
`

const store = new Store()
ReactDOM.render(<App store={store} />, getRootElement())
