import React, { useState } from 'react'
import './App.css'
import { useDispatch, useSelector } from 'react-redux'
import { changeCurrentCard, deleteCount } from './store/inventorySlice'
import { handleDrop, flag } from './store/inventorySlice'
import close from './img/Vector.svg'

const App = () => {
	const inventory = useSelector(({ inventory }) => inventory.inventoryList)
	const currentCard = useSelector(({ inventory }) => inventory.currentCard)
	const flagItem = useSelector(({ inventory }) => inventory.flag)
	const [count, setCount] = useState(0)
	const [deleteFlag, setDeleteFlag] = useState(false)
	const inventoryForSort = [...inventory]
	const dispatch = useDispatch()
	const handleDragOver = e => {
		e.preventDefault()
	}
	console.log(count)

	const sortCard = (a, b) => {
		if (a.order > b.order) {
			return 1
		} else {
			return -1
		}
	}

	return (
		<div className='main'>
			<div className='inventory'>
				{inventoryForSort.sort(sortCard).map(card => (
					<div key={card.id} className='ceil'>
						<div
							className='ceil__inner'
							draggable={true}
							onClick={() => {
								if (card.img) {
									dispatch(flag(card))
									dispatch(changeCurrentCard(card))
								}
							}}
							onDragStart={e => {
								dispatch(changeCurrentCard(card))
							}}
							onDragOver={e => handleDragOver(e)}
							onDrop={e => {
								e.preventDefault()
								dispatch(handleDrop(card))
							}}
						>
							{card.img && (
								<div className='card'>
									<img src={card.img} alt='img' className='card-image' />
									<div className='card-count'>{card.count}</div>
								</div>
							)}
						</div>
					</div>
				))}
				{flagItem && (
					<div className='details'>
						<img
							src={close}
							alt='close'
							className='close'
							onClick={() => dispatch(flag(false))}
						/>

						<img src={currentCard.img} alt='img' className='details__img' />
						<div className='line'></div>
						<h3 className='details__title'>{currentCard.title}</h3>
						<div className='details__footer'>
							<p className='details__desc'>{currentCard.desc}</p>
							<div style={{ width: '100%' }}>
								<div className='line'></div>
								<button
									className='delete__btn'
									onClick={() => setDeleteFlag(true)}
									style={
										deleteFlag ? { display: 'none' } : { display: 'block' }
									}
								>
									Удалить предмет
								</button>
								<div
									className='count-remove'
									style={
										deleteFlag ? { display: 'block' } : { display: 'none' }
									}
								>
									<input
										type='number'
										placeholder='Введите количество'
										className='count__input'
										onChange={e => {
											e.preventDefault()
											setCount(e.target.valueAsNumber)
										}}
									/>
									<div className='btn__block'>
										<button
											className='cancel__btn'
											onClick={() => setDeleteFlag(false)}
										>
											Отмена
										</button>
										<button
											className='confirm__btn'
											onClick={() => {
												dispatch(deleteCount(count))
												dispatch(flag(false))
												setCount(0)
												setDeleteFlag(false)
											}}
										>
											Подтвердить
										</button>
									</div>
								</div>
							</div>
						</div>
					</div>
				)}
			</div>
		</div>
	)
}

export default App
