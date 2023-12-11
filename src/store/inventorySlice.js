import { createSlice, PayloadAction } from '@reduxjs/toolkit'

const initialState = {
	currentCard: null,
	flag: false,
	inventoryList: [
		{
			id: 1,
			order: 1,
			img: 'https://images.saymedia-content.com/.image/t_share/MTc2MjQzNzcyMjY5OTk1OTEx/things-to-do-in-minecraft.png',
			count: 5,
			title: 'TNT',
			desc: 'BOOM',
		},
		{
			id: 2,
			order: 2,
			img: 'https://art.pixilart.com/thumb/0db6c744b5de9c6.png',
			count: 3,
			title: 'Bow',
			desc: 'Strelyaet',
		},
		{
			id: 3,
			order: 3,
			img: 'https://lh3.googleusercontent.com/K55p6hv2bx6aKzzQetw4HiWeBkYAuayJ80qfQVI8O25uWp2GPdWvP0JLR9yEezxIqFUfJFShevZy6OcCr_mboNK_jR-9wH4rxWU=s400',
			count: 3,
			title: 'Sword',
			desc: 'Razrezaet',
		},
		{
			id: 4,
			order: 4,
			img: 'https://cdn.modrinth.com/data/nMKRmM9Y/icon.png',
			count: 2,
			title: 'Udochka',
			desc: 'Dobyvaet rybu',
		},
		{ id: 5, order: 5, img: '', count: 1, title: '', desc: '' },
		{ id: 6, order: 6, img: '', count: 0, title: '', desc: '' },
		{ id: 7, order: 7, img: '', count: 0, title: '', desc: '' },
		{ id: 8, order: 8, img: '', count: 0, title: '', desc: '' },
		{ id: 9, order: 9, img: '', count: 0, title: '', desc: '' },
		{ id: 10, order: 10, img: '', count: 0, title: '', desc: '' },
		{ id: 11, order: 11, img: '', count: 0, title: '', desc: '' },
		{ id: 12, order: 12, img: '', count: 0, title: '', desc: '' },
		{ id: 13, order: 13, img: '', count: 0, title: '', desc: '' },
		{ id: 14, order: 14, img: '', count: 0, title: '', desc: '' },
		{ id: 15, order: 15, img: '', count: 0, title: '', desc: '' },
		{ id: 16, order: 16, img: '', count: 0, title: '', desc: '' },
		{ id: 17, order: 17, img: '', count: 0, title: '', desc: '' },
		{ id: 18, order: 18, img: '', count: 0, title: '', desc: '' },
		{ id: 19, order: 19, img: '', count: 0, title: '', desc: '' },
		{ id: 20, order: 20, img: '', count: 0, title: '', desc: '' },
		{ id: 21, order: 21, img: '', count: 0, title: '', desc: '' },
		{ id: 22, order: 22, img: '', count: 0, title: '', desc: '' },
		{ id: 23, order: 23, img: '', count: 0, title: '', desc: '' },
		{ id: 24, order: 24, img: '', count: 0, title: '', desc: '' },
		{ id: 25, order: 25, img: '', count: 0, title: '', desc: '' },
	],
}

const inventorySlice = createSlice({
	name: 'inventory',
	initialState,
	reducers: {
		changeCurrentCard: (state, { payload }) => {
			state.currentCard = payload
		},
		handleDrop: (state, { payload }) => {
			state.inventoryList = state.inventoryList.map(item => {
				if (item.id === payload.id) {
					return { ...item, order: state.currentCard.order }
				}
				if (item.id === state.currentCard.id) {
					return { ...item, order: payload.order }
				}
				return item
			})
		},
		flag: (state, { payload }) => {
			state.flag = payload
		},
		deleteCount: (state, { payload }) => {
			console.log(payload)
			state.inventoryList = state.inventoryList.map(item => {
				if (
					item.id === state.currentCard.id &&
					state.currentCard.count - payload <= 0
				) {
					return { ...item, img: '', count: 0, title: '', desc: '' }
				}
				if (item.id === state.currentCard.id) {
					return { ...item, count: state.currentCard.count - payload }
				}
				return item
			})
		},
		deleteCard: (state, { payload }) => {},
	},
})

export default inventorySlice.reducer
export const { changeCurrentCard, handleDrop, flag, deleteCount } =
	inventorySlice.actions
