import React, { useEffect, useState } from 'react'; 
import { useParams } from 'react-router';
import configData from '../config.json';

const PresentationView = () => {

    const params = useParams();
    const [svg, setSvg] = useState(null);
    const [isLoaded, setIsLoaded] = useState(false);
    const [isErrored, setIsErrored] = useState(false);

    useEffect(() => {
        let url = configData.LEAN_SERVER_URL + 'presentations/' + params.name;
        fetch(url)
        .then(res => res.text())
        .then(setSvg)
        .catch(setIsErrored)
        .then(() => setIsLoaded(true))
    }, []);

    return ( 
        <div id="presentationView"
            className={`svgInline svgInline--${isLoaded ? 'loaded' : 'loading'} ${isErrored ? 'svgInline--errored' : ''}`}
            dangerouslySetInnerHTML={{ __html: svg }}
        />
        );
}
export default PresentationView;