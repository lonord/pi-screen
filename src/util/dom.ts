export function getRootElement() {
	let rootEl = document.getElementById('root')
	if (!rootEl) {
		rootEl = document.createElement('div')
		rootEl.id = 'root'
		document.body.appendChild(rootEl)
	}
	return rootEl
}

export function getPopupElement() {
	let popupEl = document.getElementById('popup')
	if (!popupEl) {
		popupEl = document.createElement('div')
		popupEl.id = 'popup'
		document.body.appendChild(popupEl)
	}
	return popupEl
}
