import React from 'react';
import {Container , Dropdown} from 'react-bootstrap';  
import configData from '../config.json';

export const PresentationList = (props) => (

    <div className="form-group">
        <Container>  
            <Dropdown>  
                <Dropdown.Toggle variant=" primary" id="dropdown-basic">  
                    Select a presentation
                </Dropdown.Toggle>  
                <Dropdown.Menu>
                    {props.options.map((item) => (
                        <Dropdown.Item href={'/presentations/' + item} key={item} value={item}>
                        {item}
                        </Dropdown.Item>
                    ))}
                </Dropdown.Menu>
            </Dropdown>
        </Container>
    </div>
)

export default class PresentationDropdown extends React.Component {
    constructor() {
      super()
      this.state = {
        list: [],
        chosenValue: '',
      }
    }
      
    componentDidMount() {
        let url = configData.LEAN_SERVER_URL + 'presentations';
        fetch(url)
          .then((response) => response.json())
          .then((item) => this.setState({ list: item }))
    }    
  
    onDropdownChange = (e) => {
        this.setState({ chosenValue: e.target.value })
    }

    render() {
        return (
            <div>
                <PresentationList
                    name="presentations"
                    options={this.state.list}
                    onDropdownChange={this.onDropdownChange}
            />
            </div>
        )
    }
}