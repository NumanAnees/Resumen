import React , {Component} from 'react';
import Cv1 from '../../cv-templates/cv1/Cv1';
import Cv2 from '../../cv-templates/cv2/Cv2';
import Cv3 from '../../cv-templates/cv3/Cv3';
import Cv4 from '../../cv-templates/cv4/Cv4';
import Cv5 from '../../cv-templates/cv5/Cv5';
import Cv6 from '../../cv-templates/cv6/Cv6';
import Cv7 from '../../cv-templates/cv7/Cv7';
import Cv8 from '../../cv-templates/cv8/Cv8';
import Cv9 from '../../cv-templates/cv9/Cv9';
import Cv10 from '../../cv-templates/cv10/Cv10';


import {getJsonById} from '../../firestore/dbOperations'
class Exporter extends Component {
    
   constructor(props){
       super(props);
       console.log(this.props.match.params.resumeId);

    this.state ={
        gotData:false,
        values:{
            firstname:"",
            lastname:"",
            photo:"",
            phone:"",
            address:"",
            email:"",
            country:"",
            city:"",
            postalcode:"",
            languages:[],
            employments:[],
            skills:[],
            educations:[],
            summary:[],
        }
    }
   }
   componentDidMount(){
       if(!this.state.gotData){
           getJsonById(this.props.match.params.resumeId).then((data)=>{
             
            data !== null &&
            this.setState({values:data,gotData:true})
           })
       }
   }

   render(){
       return(
           <>
           {
           this.props.resumeName == "Cv1" ? <Cv1 language={this.props.match.params.language} values={this.state.values} ></Cv1>:
           this.props.resumeName == "Cv2" ?  <Cv2 language={this.props.match.params.language}  values={this.state.values} ></Cv2> : 
           this.props.resumeName == "Cv3" ?  <Cv3  language={this.props.match.params.language} values={this.state.values} ></Cv3> : 
           this.props.resumeName == "Cv4" ?  <Cv4  language={this.props.match.params.language} values={this.state.values} ></Cv4> : 
           this.props.resumeName == "Cv5" ?  <Cv5  language={this.props.match.params.language}values={this.state.values} ></Cv5> : 
           this.props.resumeName == "Cv6" ?  <Cv6  language={this.props.match.params.language} values={this.state.values} ></Cv6> : 
           this.props.resumeName == "Cv7" ?  <Cv7  language={this.props.match.params.language} values={this.state.values} ></Cv7> : 
           this.props.resumeName == "Cv8" ?  <Cv8  language={this.props.match.params.language} values={this.state.values} ></Cv8> : 
           this.props.resumeName == "Cv9" ?  <Cv9 language={this.props.match.params.language} values={this.state.values} ></Cv9> : 
           this.props.resumeName == "Cv10" ?  <Cv10 language={this.props.match.params.language} values={this.state.values} ></Cv10> : 
           ""  
        }
           </>
       )
   }
}
export default Exporter