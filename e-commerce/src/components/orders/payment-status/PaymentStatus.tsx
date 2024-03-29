import clsx from "clsx"
import { IoCartOutline } from "react-icons/io5"

export const PaymentStatus = () => {
  return (
    <div
      className={clsx(
        "flex items-center rounded-lg py-2 px-3.5 text-xs font-bold text-white mb-5",
        { "bg-red-500": false, "bg-green-700": true }
      )}
    >
      <IoCartOutline size={30} />
      {/* <p className='mx-2'>Pending payment</p> */}
      <p className='mx-2'>Paid!</p>
    </div>
  )
}
