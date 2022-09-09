import React, { useEffect, useState, useRef } from 'react'; 
import { useParams } from 'react-router';
import configData from '../config.json';
import Button from '@mui/material/Button';
import PresentationModal from './PresentationModal';
import { useMousePos } from './useMousePos';

const PresentationView = (props) => {

    const pvRef = useRef(null);
    const position = useMousePos();
    const [parentPosition, setParentPosition] = useState({top: 0, left: 0, width: 0, height: 0});
    const [isShown, setIsShown] = useState(false);
    const params = useParams();

    const [svg, setSvg] = useState(null);
    const [isLoaded, setIsLoaded] = useState(false);
    const [isErrored, setIsErrored] = useState(false);

    useEffect(() => {

        const setFromEvent = (e) => setParentPosition({
            top: pvRef.current.getBoundingClientRect().top,
            left: pvRef.current.getBoundingClientRect().left,
            width: pvRef.current.getBoundingClientRect().width, 
            height: pvRef.current.getBoundingClientRect().height
        });

        let url = configData.LEAN_SERVER_URL + 'presentations/' + params.name;
        fetch(url)
        .then(res => res.text())
        .then(setSvg)
        .catch(setIsErrored)
        .then(() => setIsLoaded(true))

        document.addEventListener("mousemove", setFromEvent);
        // document.addEventListener("mousemove", setFromParentEvent);
        return () => {
            window.removeEventListener("mousemove", setFromEvent);
            // window.removeEventListener("mousemove", setFromParentEvent);
        };

    }, []);

    return ( 
        <div id="pvContainer">
            <button onMouseEnter={() => setIsShown(true)}
                    onMouseLeave={() => setIsShown(false)}>                        
                Hover
            </button>
            <Button
                variant="contained"
                className="bg-pink-500 text-white active:bg-pink-600 font-bold uppercase text-sm px-6 py-3 rounded shadow hover:shadow-lg outline-none focus:outline-none mr-1 mb-1 ease-linear transition-all duration-150"
                type="button"
                onClick = {() => setIsShown(true)}
                >
              Open regular modal
            </Button>

            {isShown ? (
                <PresentationModal position={position} parentPosition={parentPosition} show={() => setIsShown(true)} onClose={() => setIsShown(false)}/>
            ) : null }
            

            <div id="presentationViewer" ref={pvRef}            
                className={`svgInline svgInline--${isLoaded ? 'loaded' : 'loading'} ${isErrored ? 'svgInline--errored' : ''}`}
                dangerouslySetInnerHTML={{ __html: svg }}
            />
        </div>
        );
}
export default PresentationView;