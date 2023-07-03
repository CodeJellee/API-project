function EachSpot({spot}) {

    return (
        <>
        <div id="each-spot-previewImage">
            <img id='spot-previewImage'src={spot.previewImage} />
        </div>
        <div id='city-state-avgRating'>
            <div id="each-spot-city">{spot.city}, {spot.state}</div>
            <div id='each-spot-avgRating'>★ {spot.avgRating}</div>
        </div>
        <div id='each-spot-price'>${spot.price} night</div>
        </>
    )
}

export default EachSpot
