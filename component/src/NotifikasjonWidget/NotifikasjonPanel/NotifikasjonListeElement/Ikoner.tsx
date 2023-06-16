import React, {useMemo} from "react";

/**
 * Poor man's useId. React 18 har useId
 * Fjern denne når på React 18
 */
let globalId = 0;
const useId = () => useMemo(() => {
    globalId += 1
    return `ikonId-${globalId}`
  }, []
)

export const OppgaveIkon = () => {
  const id = useId()
  return <svg width="38" height="38" aria-labelledby={id} viewBox="0 0 38 38" fill="none" xmlns="http://www.w3.org/2000/svg">
    <rect width="38" height="38" rx="4" fill="#C77300"/>
    <path fillRule="evenodd" clipRule="evenodd" d="M8.66699 7.66667C8.66699 6.74619 9.41318 6 10.3337 6H27.667C28.5875 6 29.3337 6.74619 29.3337 7.66667V30.3333C29.3337 31.2538 28.5875 32 27.667 32H10.3337C9.41318 32 8.66699 31.2538 8.66699 30.3333V7.66667ZM18.0003 24.3333C18.0003 23.781 18.448 23.3333 19.0003 23.3333H23.667C24.2193 23.3333 24.667 23.781 24.667 24.3333C24.667 24.8856 24.2193 25.3333 23.667 25.3333H19.0003C18.448 25.3333 18.0003 24.8856 18.0003 24.3333ZM19.0003 18C18.448 18 18.0003 18.4477 18.0003 19C18.0003 19.5523 18.448 20 19.0003 20H23.667C24.2193 20 24.667 19.5523 24.667 19C24.667 18.4477 24.2193 18 23.667 18H19.0003ZM15.0137 20H15.0003C14.448 20 14.0003 19.5523 14.0003 19C14.0003 18.4477 14.448 18 15.0003 18H15.0137C15.5659 18 16.0137 18.4477 16.0137 19C16.0137 19.5523 15.5659 20 15.0137 20ZM15.0003 23.3333C14.448 23.3333 14.0003 23.781 14.0003 24.3333C14.0003 24.8856 14.448 25.3333 15.0003 25.3333H15.0137C15.5659 25.3333 16.0137 24.8856 16.0137 24.3333C16.0137 23.781 15.5659 23.3333 15.0137 23.3333H15.0003ZM19.3337 12.3333C19.3337 11.781 19.7814 11.3333 20.3337 11.3333H23.667C24.2193 11.3333 24.667 11.781 24.667 12.3333C24.667 12.8856 24.2193 13.3333 23.667 13.3333H20.3337C19.7814 13.3333 19.3337 12.8856 19.3337 12.3333ZM17.8003 11.6001C18.1317 11.1582 18.0422 10.5314 17.6003 10.2001C17.1585 9.86869 16.5317 9.95823 16.2003 10.4001L14.8921 12.1443L14.3741 11.6263C13.9836 11.2358 13.3504 11.2358 12.9599 11.6263C12.5694 12.0168 12.5694 12.65 12.9599 13.0405L14.2932 14.3738C14.4982 14.5788 14.7821 14.6848 15.0712 14.6642C15.3604 14.6437 15.6264 14.4986 15.8003 14.2667L17.8003 11.6001Z" fill="white"/>
  </svg>

}

export const BeskjedIkon = () => {
  const id = useId()
  return <svg width="38" height="38" viewBox="0 0 38 38" aria-labelledby={id} fill="none" xmlns="http://www.w3.org/2000/svg">
    <rect width="38" height="38" rx="4" fill="#3380A5"/>
    <path fillRule="evenodd" clipRule="evenodd" d="M7.33301 11.0002C7.33301 8.97512 8.97463 7.3335 10.9997 7.3335H26.9997C29.0247 7.3335 30.6663 8.97512 30.6663 11.0002V23.0002C30.6663 25.0252 29.0247 26.6668 26.9997 26.6668H15.2767L8.8475 30.5243C8.53857 30.7097 8.15382 30.7145 7.84031 30.537C7.5268 30.3595 7.33301 30.0271 7.33301 29.6668V11.0002Z" fill="white"/>
  </svg>
}

export const OppgaveIkkeNyIkon = () => {
  const id = useId()
  return <svg width="38" height="38" aria-labelledby={id} viewBox="0 0 38 38" fill="none" xmlns="http://www.w3.org/2000/svg">
    <rect width="38" height="38" rx="4" fill="black" fillOpacity="0.44"/>
    <path fillRule="evenodd" clipRule="evenodd" d="M8.66699 7.66667C8.66699 6.74619 9.41318 6 10.3337 6H27.667C28.5875 6 29.3337 6.74619 29.3337 7.66667V30.3333C29.3337 31.2538 28.5875 32 27.667 32H10.3337C9.41318 32 8.66699 31.2538 8.66699 30.3333V7.66667ZM18.0003 24.3333C18.0003 23.781 18.448 23.3333 19.0003 23.3333H23.667C24.2193 23.3333 24.667 23.781 24.667 24.3333C24.667 24.8856 24.2193 25.3333 23.667 25.3333H19.0003C18.448 25.3333 18.0003 24.8856 18.0003 24.3333ZM19.0003 18C18.448 18 18.0003 18.4477 18.0003 19C18.0003 19.5523 18.448 20 19.0003 20H23.667C24.2193 20 24.667 19.5523 24.667 19C24.667 18.4477 24.2193 18 23.667 18H19.0003ZM15.0137 20H15.0003C14.448 20 14.0003 19.5523 14.0003 19C14.0003 18.4477 14.448 18 15.0003 18H15.0137C15.5659 18 16.0137 18.4477 16.0137 19C16.0137 19.5523 15.5659 20 15.0137 20ZM15.0003 23.3333C14.448 23.3333 14.0003 23.781 14.0003 24.3333C14.0003 24.8856 14.448 25.3333 15.0003 25.3333H15.0137C15.5659 25.3333 16.0137 24.8856 16.0137 24.3333C16.0137 23.781 15.5659 23.3333 15.0137 23.3333H15.0003ZM19.3337 12.3333C19.3337 11.781 19.7814 11.3333 20.3337 11.3333H23.667C24.2193 11.3333 24.667 11.781 24.667 12.3333C24.667 12.8856 24.2193 13.3333 23.667 13.3333H20.3337C19.7814 13.3333 19.3337 12.8856 19.3337 12.3333ZM17.8003 11.6001C18.1317 11.1582 18.0422 10.5314 17.6003 10.2001C17.1585 9.86869 16.5317 9.95823 16.2003 10.4001L14.8921 12.1443L14.3741 11.6263C13.9836 11.2358 13.3504 11.2358 12.9599 11.6263C12.5694 12.0168 12.5694 12.65 12.9599 13.0405L14.2932 14.3738C14.4982 14.5788 14.7821 14.6848 15.0712 14.6642C15.3604 14.6437 15.6264 14.4986 15.8003 14.2667L17.8003 11.6001Z" fill="white"/>
    </svg>
}

export const LukkIkon = () => {
  const id = useId()
  return <svg width="17" height="17" viewBox="0 0 17 17" aria-labelledby={id} fill="none" xmlns="http://www.w3.org/2000/svg">
    <path d="M2.0916 0L8.02602 5.93459L13.9521 0.0092317L16.0435 2.10083L10.1175 8.02602L16.034 13.9427L13.9427 16.034L8.02602 10.1175L2.10082 16.0432L0.00947464 13.9521L5.93459 8.02602L0 2.09135L2.0916 0Z" fill="#6A6A6A"/>
  </svg>

}

