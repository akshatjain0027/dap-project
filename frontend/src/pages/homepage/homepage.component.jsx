import React from 'react'
import './homepage.styles.css'
import Year from '../../components/year/year.component';

// const Homepage = () => (
//     <div className='container'>
//         <div className='row'>
//             <div className='col-xs-3'>
                

//             </div>
//             <div className='col-xs-6'>
//                 This is my homepage

//             </div>
//             <div className='col-xs-3'>
//                 This is my homepage

//             </div>
//         </div>
//     </div>
// )

class Homepage extends React.Component{
    constructor(){
        super();
    }

    render(){
        return(
            <div className='container'>
                <div className='row homepage'>
                    <div className='col-xs-3'>
                        <Year/>

                    </div>
                    <div className='col-xs-6'>
                        Posts
                    </div>
                    <div className='col-xs-3'>
                        Popular Topics
                    </div>
                </div>
            </div>
        )
    }
}

export default Homepage;