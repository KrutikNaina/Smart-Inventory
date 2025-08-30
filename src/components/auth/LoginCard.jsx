import { GoogleLogin } from "@react-oauth/google";
import axios from "axios";

export default function LoginCard() {
  const handleGoogleLogin = async (credentialResponse) => {
    try {
      // send Google token to backend
      const res = await axios.post("http://localhost:5000/api/auth/google", {
        token: credentialResponse.credential,
      });

      // save JWT from backend
      localStorage.setItem("token", res.data.token);

      // redirect
      window.location.href = "/dashboard";
    } catch (err) {
      console.error("Google login failed:", err);
    }
  };

  return (
    <div className="bg-neutral-900 p-8 rounded-xl shadow-lg">
      <h2 className="text-xl font-bold mb-6">Login</h2>
      <GoogleLogin
        onSuccess={handleGoogleLogin}
        onError={() => console.log("Google login error")}
      />
    </div>
  );
}
