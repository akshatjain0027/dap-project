import React from 'react';


import './teampage.styles.css'

class ContactPage extends React.Component {

    
    render(){
        return(
            <div className='Contact-Us'>

                    <div className='col-xs-4 contact'>
                        <div className='team'>

                            <h2>Akshat Jain</h2>
                            <p>Contact Number: +91-1236547896</p>
                            <p>Email: aj@ipu.ac.in</p>
                        </div>
                    </div>

   
                    <div className='col-xs-4 contact'>
                        <div className='team'>

                            <h2>Deepanshu Singh Chauhan</h2>
                            <p>Contact Number: +91-9874563210</p>
                            <p>Email: dsc@ipu.ac.in</p>
                        </div>
                        </div>
                    


                    <div className='col-xs-4 contact'>
                        <div className='team'>

                            <h2>Piyush Khurane</h2>
                            <p>Contact Number: +91-7412589630</p>
                            <p>Email: pk@ipu.ac.in</p>
                        </div>
                        
                   </div> 

            </div>      

        )
    }

    

}

export default ContactPage;