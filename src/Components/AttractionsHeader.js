import flourishLeft from '../flourish-left.png';
import flourishRight from '../flourish-right.png';

const AttractionsHeader = () => {
	return (
		<div className="attractions-header-container">
			<div className="attraction-header-title">
				<div className="flourish"><img src={flourishLeft} alt=""/></div>
				<div className="title-text">ATTRACTIONS</div>
				<div className="flourish"><img src={flourishRight} alt=""/></div>
			</div>
			<div className="attraction-header-subtitle">
				<div className="top">Wait</div>
				<div className="bottom">Times</div>
			</div>
		</div>
		)
}

export default AttractionsHeader;