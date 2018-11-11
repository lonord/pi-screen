import classNames from 'classnames'
import { css } from 'emotion'
import { inject, observer } from 'mobx-react'
import qrcode from 'qrcode'
import * as React from 'react'
import Popup, { PopupChildProps } from '../../base/Popup'
import Store from '../../store/ElectronStore'
import { flexHorizental, flexItemFix, flexVertical } from '../../style/flex'
import IconQrcode from '../../svg/Qrcode'

export default class ReminderQrcodeUrl extends React.Component<{}, { popOpen: boolean }> {

	state = {
		popOpen: false
	}

	openPopup = () => {
		this.setState({ popOpen: true })
	}

	closePopup = () => {
		this.setState({ popOpen: false })
	}

	render() {
		const { popOpen } = this.state
		return (
			<div className={classNames(flexItemFix, flexHorizental, selfStyle)}
				onClick={this.openPopup}>
				<IconQrcode height={24} width={24} fill="#999" />
				<Popup isOpen={popOpen} onClose={this.closePopup} spaceClose>
					<PopupContent />
				</Popup>
			</div>
		)
	}
}

@inject('store')
@observer
class PopupContent extends React.Component<PopupChildProps & { store?: Store }, { loading: boolean }> {

	canvasRef: HTMLCanvasElement = null

	state = {
		loading: false
	}

	componentDidMount() {
		const { store } = this.props
		store.getWebServerUrls().then((urls) => {
			if (urls[0] && this.canvasRef) {
				qrcode.toCanvas(this.canvasRef, urls[0])
			}
		})
	}

	render() {
		const { loading } = this.state
		return (
			<div className={classNames(flexVertical, popupStyle)}>
				<div className={classNames(flexItemFix, flexVertical, qrcodeImgWrapStyle)}>
					{loading
						? <img className={classNames(qrcodeImgStyle)}
							src="images/spin.gif" />
						: <canvas ref={(r) => this.canvasRef = r} />}
				</div>
				<div className={classNames(flexItemFix, qrcodeTextStyle)}>扫一扫</div>
			</div>
		)
	}
}

const selfStyle = css`
	align-items: center;
	height: 34px;
	width: 34px;
	justify-content: center;
	cursor: pointer;
`

const popupStyle = css`
	width: 240px;
	height: 240px;
	background: white;
	padding: 24px;
`

const qrcodeImgWrapStyle = css`
	align-items: center;
	justify-content: center;
	height: 168px;
`

const qrcodeImgStyle = css`
`

const qrcodeTextStyle = css`
	text-align: center;
	height: 24px;
	line-height: 24px;
`
