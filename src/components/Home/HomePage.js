import videoHomepage from '../../assets/video-homepage.mp4';
import { useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
const HomePage = () => {
    const account = useSelector(state => state.user.account)
    const isAuthenticated = useSelector(state => state.user.isAuthenticated)
    const navigate = useNavigate()
    return (
        <div className="homepage-container">
            <video autoPlay muted loop>
                <source
                    src={videoHomepage}
                    type="video/mp4"
                />
            </video>
            <div className="homepage-content">'
                <div className='title-1'>There's a better way to ask.</div>
                <div className='title-2'>When your forms break the norm, more people fill them out.
                    Think branded designs, video content, and relevant follow-up questions</div>
                <div className='title-3'>
                    {isAuthenticated === false ?
                        <button className='btn-start' onClick={() => navigate('./login')}>Get started. it's free</button>
                        :
                        <button onClick={() => navigate('./users')}>Doing quiz now</button>
                    }

                </div>
            </div>


        </div>
    )
}

export default HomePage;