import { Provider } from 'mobx-react'
import * as React from 'react'
import { hot } from 'react-hot-loader'
import Store from '../store/ElectronStore'
import Frame from './Frame'

export interface AppProps {
	store?: Store
}

class App extends React.Component<AppProps, any> {
	render() {
		const { store } = this.props
		return (
			<Provider store={store}>
				<Frame/>
			</Provider>
		)
	}
}

export default hot(module)(App)
