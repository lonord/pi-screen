import { css } from 'emotion'
import * as React from 'react'
import { hot } from 'react-hot-loader'

class App extends React.Component<any, any> {
	render() {
		return (
			<div className={css({ color: 'blue', fontSize: '32px' })}>hello1</div>
		)
	}
}

export default hot(module)(App)
