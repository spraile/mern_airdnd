import React, {useState,useEffect, Fragment} from 'react'
import DayPicker, {DateUtils} from 'react-day-picker';
import 'react-day-picker/lib/style.css';

const StartDayPicker = ({handleChangeReservedDates, selectedPlace}) => {

	let reserved = selectedPlace.reservedDates
	console.log(reserved)
	const [selectedDays, setSelectedDays] = useState([])
	let disablod = reserved.map( day => day.reservedDate.slice(0,10) )
	console.log(disablod)
	const handleDayClick = (day, { selected, disabled }) => {
		if (disabled) {
			return
		}
		let newList = [...selectedDays]
		if (selected) {
			// newList.filter( date => date != day)
			const selectedIndex = selectedDays.findIndex(selectedDay => DateUtils.isSameDay(selectedDay, day))

			newList.splice(selectedIndex, 1);
		} else {
		newList.push(day)
		}
		setSelectedDays([...newList])
		handleChangeReservedDates([...newList])
	}

	const handleSave = () => {
		
	}
	return (
		<Fragment>
			<DayPicker 
				onDayClick={handleDayClick}
				selectedDays={selectedDays}
				disabledDays={
					[
					// {daysOfWeek : [0,1]},
					// new Date(2020,1,15),
					...disablod.map( disDate => {
						return (
							new Date(disDate)
						)
					}),
					// disablod,
					{before : new Date()}

					]
				}
			 />

		</Fragment>
	)
}

export default StartDayPicker