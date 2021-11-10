
import React, { Component } from 'react'
import Cv1New from './../../../cv-templates/cv1/Cv1';
import Cv2New from './../../../cv-templates/cv2/Cv2';
import Cv3New from './../../../cv-templates/cv3/Cv3';
import Cv4New from './../../../cv-templates/cv4/Cv4';
import Cv5New from './../../../cv-templates/cv5/Cv5';
import Cv6New from './../../../cv-templates/cv6/Cv6';
import Cv7New from './../../../cv-templates/cv7/Cv7';
import Cv8 from '../../../cv-templates/cv8/Cv8';
import Cv9 from '../../../cv-templates/cv9/Cv9';
import Cv10 from '../../../cv-templates/cv10/Cv10';
class Canvas extends Component {
    constructor(props) {
        super(props);
        this.currentHeight = 0;
    }
    render() {
        return (
            <div style={{ color: "black" }}>
                {
                    this.props.currentResumeName == "Cv1" ?
                        <Cv1New values={this.props.values}    ></Cv1New>
                        :
                        this.props.currentResumeName == "Cv2" ?
                            <Cv2New values={this.props.values}    ></Cv2New>
                            :
                            this.props.currentResumeName == "Cv3" ?
                                <Cv3New values={this.props.values}    ></Cv3New>
                                :
                                this.props.currentResumeName == "Cv4" ?
                                    <Cv4New values={this.props.values}    ></Cv4New>
                                    :
                                    this.props.currentResumeName == "Cv5" ?
                                        <Cv5New values={this.props.values}    ></Cv5New>
                                        :
                                        this.props.currentResumeName == "Cv6" ?
                                            <Cv6New values={this.props.values}    ></Cv6New> :
                                            this.props.currentResumeName == "Cv7" ?
                                              <Cv7New values={this.props.values}    ></Cv7New> : 
                                              this.props.currentResumeName == "Cv8"  ?
                                              <Cv8 values={this.props.values}    ></Cv8> : 
                                              this.props.currentResumeName == "Cv9" ?  
                                              <Cv9 values={this.props.values}    ></Cv9> : 
                                              <Cv10 values={this.props.values}  ></Cv10>



                }
            </div>
        )
    }
}
export default Canvas;