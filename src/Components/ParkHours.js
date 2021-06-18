const ParkHours = ({hours}) => {
	return (
		<div className="park-hours-container">
			<div className="green-container">
				<div className="title">Park Hours</div>
				<div className="time-container">
					<div className="top-time">{hours.opening}</div>
					<div className="bottom-time">{hours.closing}</div>
				</div>
			</div>
		</div>
	)
}

export default ParkHours;