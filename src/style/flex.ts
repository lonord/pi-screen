import { css } from 'emotion'

export const flexVertical = css`
	display: flex;
	flex-direction: column;
`

export const flexHorizental = css`
	display: flex;
	flex-direction: row;
`

export const flexItemFix = css`
	flex-grow: 0;
	flex-shrink: 0;
`

export const flexItemAdaptive = css`
	flex-grow: 1;
	flex-shrink: 1;
`
