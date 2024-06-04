import { HiInformationCircle } from "react-icons/hi";
import { Alert } from "flowbite-react";


const Alertbox = () => {
  return (
    <div hidden={false} className="flex justify-center">
      <Alert color="failure" icon={HiInformationCircle}>
      <span className="font-medium">Info alert!</span> Page Under Maintainance
    </Alert>
    </div>

  )
}

export default Alertbox