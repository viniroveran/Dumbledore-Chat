import Image from "next/image";
import { doSocialLogin } from "@actions/login";

const LoginForm = () => {
  return (
    <form action={doSocialLogin}>
      <button
        className="w-full text-center  me-3 border flex space-x-2 items-center justify-center border-slate-200 rounded-lg text-white hover:border-yellow-400 hover:text-yellow-400 hover:shadow transition duration-150"
        type="submit"
        name="action"
        value="google">
        <div className="flex py-3 my-3 mx-3">
          <Image
            src={"https://www.svgrepo.com/show/355037/google.svg"}
            className={"w-6 h-6"}
            alt={""}
          />
          <div className="ml-1"><span>Login with Google</span></div>
        </div>
      </button>
    </form>
  );
};

export default LoginForm;