import React, { useState ,useEffect} from "react";
import { auth, googleAuthProvider } from "../../firebase";
import { toast } from "react-toastify";
import { Button } from "antd";
import { GoogleOutlined, MailOutlined } from "@ant-design/icons";
import { useDispatch ,useSelector} from "react-redux";
import {Link} from 'react-router-dom'
import {createOrUpdateUser} from '../../functions/auth';



const Login = ({ history }) => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);

  let dispatch = useDispatch();

  const {user}=useSelector((state)=>{
    return {...state}
})

  useEffect(()=>{
    let intended=history.location.state;
    console.log("intended",intended)
    if(intended){
      return; 

    }else{

      if(user&&user.token) history.push("/")

    }


}
,[user,history]);

const roleBasedRedirect=(res)=>{

  console.log("from role based products")
//check if intended
 let intended=history.location.state;
 
if(intended){
     history.push(intended.from)
}else{
  if(res.data.role==="admin"){
    history.push('/admin/dashboard');
  }else{
    history.push('/user/history');

  }
}

 
}

  //submit handler
  const handlesubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    try {
      const result = await auth.signInWithEmailAndPassword(email, password);
      //  console.log(result)
      const { user } = result;
      const idTokenResult = await user.getIdTokenResult();

      createOrUpdateUser(idTokenResult.token)
      .then((res)=>{

       dispatch({
        type: "LOGGED_IN_USER",
        payload: {
          name:res.data.name,
          email:res.data.email,
          token: idTokenResult.token,
          role:res.data.role,
          _id:res.data._id,
        },
      });

      roleBasedRedirect(res)

      })
      .catch();

      // history.push("/");
    } catch (error) {
      console.log(error);
      toast.error(error.message);
      setLoading(false);
    }
  };

  //google login
  const googleLogin = async () => {

    auth.signInWithPopup(googleAuthProvider)
      .then(async (result) => {
        const { user } = result;
        const idTokenResult = await user.getIdTokenResult();

        createOrUpdateUser(idTokenResult.token)
        .then((res)=>{
         dispatch({
          type: "LOGGED_IN_USER",
          payload: {
            name:res.data.name,
            email:res.data.email,
            token: idTokenResult.token,
            role:res.data.role,
            _id:res.data._id,
          },
        });
roleBasedRedirect(res)

        })
        .catch(err=>console.log(err));

        // history.push("/");
      })
      .catch((err) => {console.log(err)
      toast.error(err.message)
    
    });
  };

  //create form function
  const loginForm = () => (
    <form autoComplete="new-password" onSubmit={handlesubmit}>
      <div className="form-group">
        <input
          type="email"
          className="form-control"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          autoFocus
          placeholder="Your email"
        />
      </div>
      <div className="form-group">
        <input
          type="password"
          className="form-control"
          autoComplete="new-password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          placeholder="Your Password"
        />
      </div>
      <br />
      <Button
        onClick={handlesubmit}
        type="primary"
        className="mb-3"
        block
        shape="round"
        icon={<MailOutlined />}
        size="large"
        disabled={!email || password.length < 6}
      >
        Login with email/password
      </Button>
    </form>
  );

  return (
    <div>
      <div className="container p-5">
        <div className="row">
          <div className="col-md-6 offset-md-3">
            {loading ? (
              <h4 className="text-danger">Loading....</h4>
            ) : (
              <h4 >Login</h4>
            )}
            {loginForm()}
            <Button
              onClick={googleLogin}
              type="danger"
              className="mb-3"
              block
              shape="round"
              icon={<GoogleOutlined />}
              size="large"
            >
              Login with Google
            </Button>

            <Link className='danger' to="/forgot/password">Forgot Password</Link>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Login;
