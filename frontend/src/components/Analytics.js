import ReactGA, { initialize } from 'react-ga';
import conf from '../conf/configuration'
import {getWebsiteData} from '../firestore/dbOperations'
export    function Analytics(page){
        getWebsiteData().then((value)=>{
                if(value !== undefined)
                if(value.trackingCode !== undefined){
                        console.log(value.trackingCode);
                        ReactGA.initialize(value.trackingCode);
                        ReactGA.pageview(page);
                }
        })
  
}
