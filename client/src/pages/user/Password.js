import React, { useState } from 'react';
import UserNav from '../../components/nav/UserNav';
import {auth} from '../../firebase'
import {toast} from 'react-toastify'

const Password=()=>{

    const handleSubmit= async (e)=>{
        e.preventDefault();
        SetLoading(true)
        console.log("handle submit")
        await auth.currentUser.updatePassword(password)
        .then(()=>{
         SetLoading(false);
         setPassword('');
         toast.success("Password updated")
        })
        .catch((error)=>{
            SetLoading(false);
            toast.error(error.message)
        })
    }

const [password,setPassword]=useState('');
const [loading,SetLoading]=useState(false);
const passwordUpdateForm=()=><form onSubmit={handleSubmit}>
    <div className="form-group">
        <label>password</label>
        <input type="password"
        placeholder="Enter new password"
        className="form-control"
        value={password}
        disabled={loading}
         onChange={(e)=>setPassword(e.target.value)}/>
         <button 
         className="btn btn-primary"
          disabled={!password || loading}
          >Submit
          </button>
    </div>
</form>
 
return(
    <div className="container-fluid">
        <div className="row">
            <div className="col-md-2">
                <UserNav />
            </div>
          <div className="col">
             {loading?(
             <h4 className="text-danger">loading...</h4>):(
                  <h4>Password Update</h4>)}
              {passwordUpdateForm()}
          </div>
        </div>
    </div>
)

}

export default Password