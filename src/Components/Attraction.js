const Attraction = ({name, time}) => {
	return (
		<div className="attraction-container">
			<div className="green-container">
				<div className="attraction-title">{name}</div>
				<div className="time-container">
					<div className="time">{time}</div>
					<div className="time-text">Minutes</div>
				</div>
			</div>
		</div>
	)
}

export default Attraction;