import React, {useState,useEffect, Fragment} from 'react'
import DayPicker, {DateUtils} from 'react-day-picker';
import 'react-day-picker/lib/style.css';

const StartDayPicker = () => {
	const [selectedDays, setSelectedDays] = useState([])
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
	}
	return (
		<Fragment>
			<DayPicker 
				onDayClick={handleDayClick}
				selectedDays={selectedDays}
				disabledDays={
					[
					{daysOfWeek : [0,1]},
					new Date(2020, 1, 15),
					{before : new Date()}

					]
				}
			 />
			{selectedDays ? (
					<p>You clicked</p>
				) : (
					<p>Please select a day</p>
				)}
		</Fragment>
	)
}

export default StartDayPicker