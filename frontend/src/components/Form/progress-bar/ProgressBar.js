import React, {Component} from 'react'
import './ProgressBar.scss'
import { withTranslation } from 'react-i18next'
class ProgressBar extends Component{ 
    constructor(props){
        super(props);
        this.state = {
            progress:0
        }
        this.checkFullFields = this.checkFullFields.bind(this) 
    }
    componentDidMount(){
          this.checkFullFields();
    }
    componentWillReceiveProps(){
    this.checkFullFields();
    }

    /// Check which fields are entered and generate a number ( progress )
    checkFullFields(){


       if( parseInt( this.props.values.fullFields )<1){
        this.setState({progress:0});
        return
    }
    if( parseInt( this.props.values.fullFields )<2){
        this.setState({progress:10});
        return
    }
    if( parseInt( this.props.values.fullFields )<3){
        this.setState({progress:15});
        return
    }
    if( parseInt( this.props.values.fullFields )<4){
        this.setState({progress:20});
        return
    }
    if( parseInt( this.props.values.fullFields )<6){
        this.setState({progress:25});
        return
    }
    if( parseInt( this.props.values.fullFields )<7){
        this.setState({progress:30});
        return
    }
    if( parseInt( this.props.values.fullFields )<8){
        this.setState({progress:40});
        return
    }
    if( parseInt( this.props.values.fullFields )<9){
        this.setState({progress:60});
        return
    }
    if( parseInt( this.props.values.fullFields )<10){
        this.setState({progress:70});
        return
    }
    if( parseInt( this.props.values.fullFields )<11){
        this.setState({progress:80});
        return
    }
    if( parseInt( this.props.values.fullFields )<12){
        this.setState({progress:100});
        return
    }
    if( parseInt( this.props.values.fullFields )<=14){
        this.setState({progress:100});
        return
    }
    }
     render(){
       const  {t}=this.props;
        return(
            <div>
                 {this.props.textHidden == false && 
                         <div className="progressLabel">
                         <span className="title">{t("form.profileCompleteness")}</span> <span style={{ color: this.state.progress > 65 ? "#2ecc71" : (this.state.progress > 30 ? "#e67e22" : (this.state.progress > 0 ? "#e74c3c" : "")) }} className="value">{this.state.progress}%</span>
                       </div>
                 }

        <div className="progressWrapper">
            <div className="progressPath">
                <div style={{
                    width:this.state.progress+"%", // Getting the propgress state from the parent component
                    // Changing the color of the progress bar based on the value provided      
                    background:  this.state.progress > 65 ?  "#2ecc71" : ( this.state.progress > 30 ? "#e67e22" : (this.state.progress >0 ? "#e74c3c":"") )
                    }} className="progressFill"></div>
            </div>
        </div>
     </div>

        );
    }
}

const MyComponent = withTranslation('common')(ProgressBar)
export default MyComponent;

