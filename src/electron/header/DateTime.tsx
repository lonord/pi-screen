import fecha from 'fecha'
import * as React from 'react'

export default class DateTime extends React.Component<any, { time: string }> {

	state = {
		time: '-'
	}

	timer: any = null

	componentDidMount() {
		this.updateTime()
		this.timer = setInterval(this.updateTime, 1000)
	}

	componentWillUnmount() {
		this.timer && clearInterval(this.timer)
	}

	updateTime = () => {
		const d = new Date()
		this.setState({
			time: fecha.format(d, 'MM月DD日 HH:mm')
		})
	}

	render() {
		return (
			<div>{this.state.time}</div>
		)
	}
}
