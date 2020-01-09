import React, { Component } from 'react';
import Modal from 'react-awesome-modal';

class Examples extends Component {
    constructor(props) {
        super(props);
        this.state = {
            course: '',
            year: '',
            id: 0,
            data:true 
        }   
    }

    changeHandle = (e) => {
        this.setState({
            [e.target.name]: e.target.value
        });
    }
    closeModal = () => {
        this.setState({
          visible: false,
        
        });
      }
     

    
    
    render() {
       
        return (
            
            <Modal
                visible={this.props.visible}
                width="300"
                height="300"
                
            >
                <div className="modal">
                    <h1>Qualification!</h1>
                    Course:
                       <div>
                        <input type="text" name="course" value={this.state.course}
                            onChange={e => this.setState({ course: e.target.value })}></input>
                        <br />
                    </div>
                    Year:
                        <div>
                        <input type='number' name="year" value={this.state.year}
                            onChange={e => this.setState({ year: e.target.value })}></input>
                        <br />
                    </div>
                    <button className="btn-add" onClick={() => this.props.addQualification(this.state)}>Add Qualification</button>
          
                    <button className="btn-add" onClick={()=>this.props.updateQualification(this.state)} >Update</button>
                </div>
            </Modal>
        );
    }
}
export default Examples;