"use client"
import clsx from "clsx"
import { useForm } from "react-hook-form"
import type { Address, Country } from "@/interfaces"
import { useAddressStore } from "@/store"
import { useEffect } from "react"
import { deleteUserAddress, setUserAddress } from "@/actions"
import { useSession } from "next-auth/react"
import { useRouter } from "next/navigation"

type FormInputs = {
  name: string
  lastName: string
  address: string
  secondAddress: string
  cp: string
  city: string
  country: string
  phone: string
  rememberAddress: boolean
}

interface Props {
  countries: Country[]
  userStoredAddress?: Partial<Address>
}

export const AddressForm = ({ countries, userStoredAddress = {} }: Props) => {
  const router = useRouter()
  const { data: session } = useSession({ required: true })
  const setAdress = useAddressStore((state) => state.setAddress)
  const address = useAddressStore((state) => state.address)
  const {
    register,
    handleSubmit,
    formState: { isValid },
    reset,
  } = useForm<FormInputs>({
    defaultValues: {
      ...userStoredAddress,
    },
  })

  useEffect(() => {
    if (address.name) {
      reset(address)
    }
  }, [address])

  const onSubmit = async (data: FormInputs) => {
    setAdress(data)
    if (data.rememberAddress) {
      // save address to db
      const result = await setUserAddress(data, session!.user.id)
      if (!result.ok) {
        console.error(result.error)
        return
      }
      router.push("/checkout")
    } else {
      // remove address from db
      const result = await deleteUserAddress(session!.user.id)
      if (!result.ok) {
        console.error(result.error)
        return
      }
      router.push("/checkout")
    }
  }

  return (
    <form
      onSubmit={handleSubmit(onSubmit)}
      className='grid grid-cols-1 gap-2 sm:gap-5 sm:grid-cols-2 bg-white rounded-xl shadow-xl p-7'
    >
      <div className='flex flex-col mb-2'>
        <span>Name</span>
        <input
          type='text'
          className='p-2 border rounded-md bg-gray-200'
          {...register("name", { required: true })}
        />
      </div>

      <div className='flex flex-col mb-2'>
        <span>Last name</span>
        <input
          id='lastName'
          type='text'
          className='p-2 border rounded-md bg-gray-200'
          {...register("lastName", { required: true })}
        />
      </div>

      <div className='flex flex-col mb-2'>
        <span>Address</span>
        <input
          id='address'
          type='text'
          className='p-2 border rounded-md bg-gray-200'
          {...register("address", { required: true })}
        />
      </div>

      <div className='flex flex-col mb-2'>
        <span>Second address (opcional)</span>
        <input
          id='secondAddress'
          type='text'
          className='p-2 border rounded-md bg-gray-200'
          {...register("secondAddress")}
        />
      </div>

      <div className='flex flex-col mb-2'>
        <span>CP</span>
        <input
          id='cp'
          type='text'
          className='p-2 border rounded-md bg-gray-200'
          {...register("cp", { required: true })}
        />
      </div>

      <div className='flex flex-col mb-2'>
        <span>City</span>
        <input
          id='city'
          type='text'
          className='p-2 border rounded-md bg-gray-200'
          {...register("city", { required: true })}
        />
      </div>

      <div className='flex flex-col mb-2'>
        <span>Country</span>
        <select
          className='p-2 border rounded-md bg-gray-200'
          {...register("country", { required: true })}
        >
          <option value=''>[ Seleccione ]</option>
          {countries.map((country) => (
            <option key={country.id} value={country.id}>
              {country.name}
            </option>
          ))}
        </select>
      </div>

      <div className='flex flex-col mb-2'>
        <span>Phone</span>
        <input
          id='phone'
          type='text'
          className='p-2 border rounded-md bg-gray-200'
          {...register("phone", { required: true })}
        />
      </div>

      {/* Remember address checkbox */}
      <div className='flex flex-col mb-2 sm:mt-1'>
        <div className='inline-flex items-center mb-10'>
          <label
            className='relative flex cursor-pointer items-center rounded-full p-3'
            htmlFor='checkbox'
          >
            <input
              {...register("rememberAddress")}
              type='checkbox'
              className="before:content[''] peer relative h-5 w-5 cursor-pointer appearance-none rounded-md border border-gray-500 transition-all before:absolute before:top-2/4 before:left-2/4 before:block before:h-12 before:w-12 before:-translate-y-2/4 before:-translate-x-2/4 before:rounded-full before:bg-blue-gray-500 before:opacity-0 before:transition-opacity checked:border-blue-500 checked:bg-blue-500 checked:before:bg-blue-500 hover:before:opacity-10"
              id='checkbox'
            />
            <div className='pointer-events-none absolute top-2/4 left-2/4 -translate-y-2/4 -translate-x-2/4 text-white opacity-0 transition-opacity peer-checked:opacity-100'>
              <svg
                xmlns='http://www.w3.org/2000/svg'
                className='h-3.5 w-3.5'
                viewBox='0 0 20 20'
                fill='currentColor'
                stroke='currentColor'
                strokeWidth='1'
              >
                <path
                  fillRule='evenodd'
                  d='M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z'
                  clipRule='evenodd'
                ></path>
              </svg>
            </div>
          </label>
          <p>Remember address?</p>
        </div>

        <button
          type='submit'
          disabled={!isValid}
          className={clsx({
            "btn-primary": isValid,
            "btn-disabled": !isValid,
          })}
        >
          Next
        </button>
      </div>
    </form>
  )
}
