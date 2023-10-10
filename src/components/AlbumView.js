// These components will be making separate API calls from the app
// component to serve specific data about a given album
import { useState, useEffect } from 'react'
import { useParams } from 'react-router-dom'

function AlbumView() {
    const { id } = useParams()
    const [ albumData, setAlbumData ] = useState([])

    useEffect(() => {
        //this connects backend app to frontend app
        const API_URL = `http://localhost:4000/song/${id}`

        const fetchData = async () => {
            const response = await fetch(API_URL)
            const data = await response.json()
            console.log(data)
            const albumData = data.results.filter(item => item.wrapperType === 'track')
            setAlbumData(albumData)
        }
        fetchData()
    }, [id])

    const albumDataDisplay = albumData.map(track => {
        return(
            <div key={track.trackId}>
                <p>{track.trackName}</p>
            </div>
        )
    })

    return (
        <div>
            {albumDataDisplay}
        </div>
    )
}

export default AlbumView;