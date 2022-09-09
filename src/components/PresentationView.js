import React, { useEffect, useState, useRef } from 'react'; 
import { useParams } from 'react-router';
import configData from '../config.json';
import PresentationModal from './PresentationModal';

const PresentationView = (props) => {

    const pvRef = useRef(null);
    const params = useParams();
    const presentation = params.name;
    const [position, setPosition] = useState({x: 0, y: 0});
    const [isShown, setIsShown] = useState(false);
    const [svg, setSvg] = useState(null);
    const [components, setComponents] = useState();
    const [isLoaded, setIsLoaded] = useState(false);
    const [isErrored, setIsErrored] = useState(false);

    function getPresentation(props){
        let url = configData.LEAN_SERVER_URL + 'presentations/' + params.name;
        fetch(url)
        .then(res => res.text())
        .then(setSvg)
        .catch(setIsErrored)
        .then(() => setIsLoaded(true))
    }

    function getComponents(posX, posY){
        let url = configData.LEAN_SERVER_URL + 'presentations/' + params.name + '/0/' + posX + ',' + posY;
        fetch(url)
        .then(response => response.text())
        .then(setComponents)
        .catch( e=> {
            console.log(e);
            this.setState({...this.state, isFetching: false});
        });
    }

    useEffect(() => {
        const handleMouseMove = (e) => {
            setPosition({
                x: e.clientX - pvRef.current.getBoundingClientRect().left,
                y: e.clientY - pvRef.current.getBoundingClientRect().top
            });
            getComponents((e.clientX - pvRef.current.getBoundingClientRect().left), e.clientY - pvRef.current.getBoundingClientRect().top);                        
            setIsShown(true);
        };

        getPresentation();

        const pvElement = pvRef.current; 
        pvElement.addEventListener("mouseup", handleMouseMove);
        return () => {
            pvElement.removeEventListener("mouseup", handleMouseMove);
            setIsShown(false);
            console.log('position:' + position.x + ', ' + position.y); 
        };

    }, []);

    return ( 
        <div id="pvContainer">

            {isShown ? (
                <PresentationModal  presentation={presentation} 
                                    position={position} 
                                    components={components} 
                                    show={() => setIsShown(true)} 
                                    onClose={() => setIsShown(false)}
                />
            ) : null }
            
            <div id="presentationViewer" ref={pvRef}            
                className={`svgInline svgInline--${isLoaded ? 'loaded' : 'loading'} ${isErrored ? 'svgInline--errored' : ''}`}
                dangerouslySetInnerHTML={{ __html: svg }}
            />
        </div>
        );
}
export default PresentationView;