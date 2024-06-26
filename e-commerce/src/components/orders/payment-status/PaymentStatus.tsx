import clsx from "clsx"
import { IoCartOutline } from "react-icons/io5"

interface Props {
  isPaid: boolean
}

export const PaymentStatus = ({ isPaid }: Props) => {
  return (
    <div
      className={clsx(
        "flex items-center rounded-lg py-2 px-3.5 text-xs font-bold text-white mb-5",
        { "bg-red-700": !isPaid, "bg-green-700": isPaid }
      )}
    >
      <IoCartOutline size={30} />
      {isPaid ? (
        <p className='mx-2'>Paid!</p>
      ) : (
        <p className='mx-2'>Pending payment</p>
      )}
    </div>
  )
}
