import React from 'react';
import './Border.css'
import Example from './Modal';


class Registration extends React.Component {
    constructor(props) {
        super(props)
        this.state = {
            reg: {
                id: 0,
                name: '',
                address: '',
                mobileNo: '',
                gender: '',
                qualifications:[],
               
            },
            dataObj:[],
            visible: false,
            hide:true,
           
        }
    }

    openModal = () => {
        this.setState({ 
            visible: true
         });
    }
    closeModal = () => {
        this.setState({
          visible: false,
          course: '',
            year: '',
        });
      }
    
    handleChange = (e) => {
        this.setState({
            [e.target.name]: e.target.value
        })
    }
    onSubmit = () => {
        let data = this.state
        let userObj = {
            name: data.name,
            address: data.address,
            mobileNo: data.mobileNo,
            gender: data.gender,
            qualifications:data.reg
        }
        data.dataObj.push(userObj)
            this.setState({
                reg:{
                qualifications:[],
            },
                dataObj: data.dataObj,
                name: '',
                address: '',
                mobileNo: '',
                gender: '',
            
            })
            console.log(data.dataObj);   
     }

     onSave = () => {
        let  set =this.state;
        const newInfo={
          name:set.name,
          address:set.address,
          mobileNo:set.mobileNo,
          gender:set.gender,
          qualifications:set.reg
        };
        set.dataObj[set.id]=newInfo;
        this.setState({
            reg:{
            qualifications:[],
        },
            hide:true,
            dataObj: set.dataObj,
            name: '',
            address: '',
            mobileNo: '',
            gender: '',
        })
      }
   
     deleteItem = id => {
               this.state.reg.qualifications.splice(id, 1);
        this.setState({
            reg: this.state.reg
        });
      }
   
   
    handleEdit = (item, id) => {
        this.setState({
            course: item.course,
            year: item.year,
            id,
            visible: true
          
        });
    }
    
    updateQualification=(props)=> {
        let newState = Object.assign({}, this.state)
        newState.reg.qualifications[props.id] = props
        this.setState({newState, visible: false})
      };
    
   
      onEdit = (data,i) => {
        this.setState({
                  id: i,
                name: data.name,
                address: data.address,
                mobileNo: data.mobileNo,
                gender: data.gender,
                reg:data.qualifications,
                hide:false
                        },

        ); 
      }
      
      deleteRow = id => e => {
        e.preventDefault()
        let dataObj=[
            ...this.state.dataObj.slice(0, id),
            ...this.state.dataObj.slice(id + 1)
        ]
        this.setState({
          dataObj
        });
      }
 
    addQualification = (qaulification) => {
        const updateModel = this.state.reg;
        updateModel.qualifications.splice(updateModel.qualifications.length, 0, qaulification);
        this.setState({ reg: updateModel, visible: false });
    }

    render() {
        const  dataObj=this.state.dataObj;
        const hide = this.state.hide ? "Submit" : "update";
        return (
            <div>
            <div className="border">
                Name:
                <div>
                    <input type="text" name="name" value={this.state.name}
                        onChange={this.handleChange}></input>
                    <br />
                </div>
                Address:
                <div>
                    <input className="text" type="text" name="address" value={this.state.address}
                        onChange={this.handleChange} ></input>
                    <br />
                </div>
                Mobile No:
                <div>
                    <input type='number' name='mobileNo' value={this.state.mobileNo}
                        onChange={this.handleChange}></input>
                    <br />
                </div>
                Gender:
                <div>
                    <input type="radio" name="gender" value="male"
                        onChange={this.handleChange}
                        checked={this.state.gender === "male"}
                    ></input>Male
                    <input type="radio" name="gender" value="female"
                        onChange={this.handleChange}
                        checked={this.state.gender === "female"}
                    ></input>Female
                    <br />
                </div>
                <div style={{ width: '80%', height: '80px', margin: '5px', border: '2px solid black' }}>
                    Qualifications:
                        {this.state.reg.qualifications.map((item, id) => {
                        return (<div key={id}>
                            <button onClick={() => this.handleEdit(item, id)} key={id}> {item.course} {item.year} </button>
                            <button onClick={() => this.deleteItem(id)} > x </button>
                        </div>)
                    })}
                    <input type="button" value="Open" onClick={this.openModal} />

                </div>
                <Example visible={this.state.visible} addQualification={this.addQualification} updateQualification={this.updateQualification}  />
               
                <button className="btn" onClick={
                    this.state.hide
                    ? this.onSubmit
                    :this.onSave}>

                    {hide}
                           </button>   
                
                </div>
                <div>
        <h1>Table!</h1>
        <div>
        <tbody>
            <tr>
                <th>Name:</th>
                <th>Address:</th>
                <th>Mobile No:</th>
                <th>Gender:</th>
                <th>Edit</th>
                <th>Delete</th>
                </tr>
                {dataObj.map((dataObj,id)=>{
                    return(
                     <tr key={id}>
                     <td>{dataObj.name}</td>
                     <td>{dataObj.address}</td>
                     <td>{dataObj.mobileNo}</td>
                     <td>{dataObj.gender}</td>
                     <td><button onClick={() => this.onEdit(dataObj,id)}>Edit</button></td>
                     <td><button onClick={this.deleteRow(id)} >Delete</button></td>
                    </tr>
                    );
                })}
        </tbody>
     </div>
    </div>
            </div>
        );
    }
}
export default Registration;