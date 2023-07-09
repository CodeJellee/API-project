

function EachSpot({spot}) {

    return (
        <div id="each-spot-user-container">
        <div id="each-spot-previewImage">
            <img id='spot-previewImage'src={spot.previewImage} alt={spot.name}/>
        </div>
        <div id='city-state-avgRating'>
            <div id="each-spot-city">{spot.city}, {spot.state}</div>
            {spot.avgRating && (
                <div id="each-spot-avgRating">★ {spot.avgRating.toFixed(1)}</div>
            )}
            {!spot.avgRating && <div id="each-spot-avgRating">★ New</div>}
        </div>
        <div id='each-spot-price'>${spot.price.toFixed(2)} night</div>
        </div>
    )
}

export default EachSpot
