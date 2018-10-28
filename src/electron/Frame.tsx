import { css } from 'emotion'
import { inject, observer } from 'mobx-react'
import * as React from 'react'
import Store from '../store/ElectronStore'

export interface FrameProps {
	store?: Store
}

@inject('store')
@observer
export default class Frame extends React.Component<FrameProps, any> {
	render() {
		const { store } = this.props
		const onlineUserCount = store ? store.onlineUserCount : 0
		return (
			<div>
				online user count {onlineUserCount}
			</div>
		)
	}
}
