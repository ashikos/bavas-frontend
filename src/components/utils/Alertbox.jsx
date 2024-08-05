import { HiInformationCircle } from "react-icons/hi";
import { Alert } from "flowbite-react";


const Alertbox = ({errorMessage}) => {
  return (
    <div className={`flex justify-center ${errorMessage.message ? '': "hidden"} absolute right-[40%] bottom-[10rem]`}>
      <Alert color={errorMessage.color} icon={HiInformationCircle}>
      <span className="font-medium">{errorMessage.title} </span> {errorMessage.message}
    </Alert>
    </div>

  )
}

export default Alertbox