import React from 'react';
import './Border1.css';
import Modal from 'react-awesome-modal';

class Registration extends React.Component {
  constructor(props){
    super(props);
        this.state={
            name: '',
            address: '',
            mobileNo:'',
            gender:'',
            active:false,
            nonactive:false,
            course: '',
            passingYear: '',
            index:0,
            userArr: [],
            create: true,
            visible:false,
            hide:true,
            study:[],
           qualification:""
        }
}


handleChange=e=>{
  if(e.target.type ==="checkbox"){
      this.setState({
          [e.target.name]:e.target.checked
      });
      }else{
  this.setState({
      [e.target.name]:e.target.value
  })
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
    course: "",
    passingYear: "",
    create:true
  });
}

onStore = (data,id) => {
  this.setState({
    course: data.course,
    passingYear: data.passingYear,
    index:id,
    visible: true,
    create: false
  });
}

deleteRow = i => e => {
  e.preventDefault()
  let study=[
      ...this.state.study.slice(0, i),
      ...this.state.study.slice(i + 1)
  ]
  this.setState({
    study
  });
}

handleRemoveRow = index => e => {
  e.preventDefault()
  let  userArr=[
    ...this.state.userArr.slice(0, index),
    ...this.state.userArr.slice(index + 1)
  ]
   this.setState({
    userArr
   });
 }

 handleClick= () =>{
     
  let abc=this.state;
  let userObj ={
      name:abc.name,
      address:abc.address,
      mobileNo:abc.mobileNo,
      gender:abc.gender,
      active:abc.active,
      nonactive:abc.nonactive,
     qualification:abc.userArr
    //qualification:abc.userArr[0].course + abc.userArr[0].passingYear + abc.userArr[1].course + abc.userArr[1].passingYear 
    }
  abc.study.push(userObj);
   this.setState({
     study:abc.study,
     userArr:[],
     name:"",
     address:"",
     mobileNo:"",
     gender:"",
     active:"",
     nonactive:"",
    
   });
  console.log(abc.study);        
} 

onSave = () => {
  let  set =this.state;
  const newInfo={
    name:set.name,
    address:set.address,
    mobileNo:set.mobileNo,
    gender:set.gender,
    active:set.active,
    nonactive:set.nonactive,
    qualification:set.userArr
  };
  set.study[set.index]=newInfo;
  this.setState({
    study:set.study,
    hide:true,
    name:"",
    address:"",
    mobileNo:"",
    gender:"",
    active:"",
    nonactive:"",
    userArr:[]
  })
}

onChangeHandler = e => {
  this.setState({
    [e.target.name]: e.target.value
  });
}

onSubmit = () => {
  let abc = this.state;
  let userObj = {
    course: abc.course,
    passingYear: abc.passingYear
  }
  abc.userArr.push(userObj);
  this.setState({
    userArr: abc.userArr ,
    course: "",
    passingYear: "",
    visible:false
  });
}

onUpdate = () => {
  let xyz=this.state;
    const newCourse={
    course:xyz.course,
    passingYear:xyz.passingYear

  };
 xyz.userArr[xyz.index]=newCourse;
      this.setState ({
        userArr:xyz.userArr,
        create: true,
        course: "",
        passingYear: "",
        visible:false
       } )
    
  }

  onEdit = (data,i) => {
    this.setState({
      name: data.name,
      address: data.address,
      mobileNo:data.mobileNo,
      gender:data.gender,
      active:data.active,
      nonactive:data.nonactive,
      userArr:data.qualification,
      index:i,
      hide:false,
     // qualification:data.userArr
    }); 
  }

    
     render() {
         const study=this.state.study;
         const hide = this.state.hide ? "Submit" : "update";
         const create = this.state.create ? "submit" : "update";
        
        return (
            <div>

                <div className="border">
                Name
                <div>
                     <input type="text"name="name" value={this.state.name}
                       onChange={this.handleChange} style={{style:"italic",margin:"10"}}></input>
                    <br/></div>
                Address
                <div>
                     <input className="text" type="text"name="address" value={this.state.address}
                      onChange={this.handleChange} ></input>
                    <br/></div>
                Mobile No
                <div>
                     <input type='number' name='mobileNo'value={this.state.mobileNo}
                     onChange={this.handleChange}></input>
                     <br/></div>
                Gender
                <div>
                     <input type="radio" name="gender" value="male" onChange={this.handleChange}
                     checked={this.state.gender==="male"}/> Male
                     <input type="radio" name="gender" value="female" onChange={this.handleChange}
                     checked={this.state.gender==="female"}/>Female <br/></div>
                Status
                <div>
                     <input type="checkbox" name="active" checked={this.state.active}
                      onChange={this.handleChange}></input> Active  
                     <input type="checkbox" name="nonactive" checked={this.state.nonactive}
                      onChange={this.handleChange}></input> NoN-Active    <br/> </div>
                Qualification:
                 <div style={{ position: "relative" }}>
                        <button style={{ position: 'center', bottom: '15px',float: 'right' }}
                type="button" value="Open" onClick={this.openModal} > Add Qualification </button>
                             <div style={{ width: "auto",  margin: '5px', padding: 0,  border: "1px solid black"  }}>
              {this.state.userArr.map((item, index) => {
                return (<div key={index}>
                    <button  onClick={() => this.onStore(item,index)}  key={index}>{item.course} {item.passingYear}  </button>
                    <button onClick={this.handleRemoveRow(index)}>x</button>
              </div>)
               })}                
          </div>         
</div><br/><br/><br/><br/>

              <button onClick={
                    this.state.hide
                    ? this.handleClick
                    :this.onSave}>

                    {hide}
                           </button>   
                           </div>
                          
        <div  >
            <Modal
             visible={this.state.visible}
             width="400"
             height="250"
                 >        
            <h1>Add your Qualification</h1>
             <div className="tss">
             
             
              <input
                style={{ width: 195 }}
                type="text"
                placeholder="Enter course"
                onChange={this.onChangeHandler}
                name="course"
                value={this.state.course}
              />
            
              
              <input
                style={{ width: 195 }}
                type="number"
                placeholder="Enter passingYear"
                onChange={this.onChangeHandler}
                name="passingYear"
                value={this.state.passingYear}
              /><br />
              <button
                className="btn-add"
                onClick={
                  this.state.create
                    ? this.onSubmit
                    : this.onUpdate}
              >
                {create}
              </button>
                  <button className="btn-close" onClick={this.closeModal} >Close</button>
                  </div> 
          </Modal> 
          </div>  
          
            <div>
            {study.length>0?<div>
         <div className="main">
                <h1>Table!</h1>
                <table border="1" style={{width:400,paddingTop:5}} >
                <tbody>
                  <tr>
                      <th>Name</th>
                      <th>Address</th>
                      <th>MobileNo</th>
                      <th>Gender</th>
                      <th>Status</th>
                      {/* <th>Qualification</th> */}
                      <th>Edit</th>
                      <th>Delete</th>
                   </tr>
                  {study.map((study,i)=>{
                      return(
                          <tr key={i}>
                          <td>{study.name}</td>
                          <td>{study.address}</td>
                          <td>{study.mobileNo}</td>
                          <td>{study.gender}</td>
                          <td>{`${study.active===true ?"Active":study.nonactive === true? "NonActive":''}`}</td>
                          {/* <td>{study.qualification} </td>  */}
                                              
                          <td><button onClick={() => this.onEdit(study,i)}>Edit</button></td>
                          <td><button onClick={this.deleteRow(i)}>Delete</button></td>
                          
                          </tr>    
                      );                
                  })}
                </tbody>
                </table>
            </div>
            </div>:null}
            </div>
           
 
            </div>
           );
       }
    
}
export default Registration;