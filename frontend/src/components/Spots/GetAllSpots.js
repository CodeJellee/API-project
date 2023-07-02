function EachSpot({spot}) {

    return (
        <>
        <div id="each-spot-previewImage">
            <img id='spot-previewImage'src={spot.previewImage} />
        </div>
        <div id="each-spot-city">{spot.city}</div>
        <div id="each-spot-state">{spot.state}</div>
        <div id='each-spot-avgRating'>{spot.avgRating}</div>
        <div id='each-spot-price'>{spot.price}</div>
        </>
    )
}

export default EachSpot
