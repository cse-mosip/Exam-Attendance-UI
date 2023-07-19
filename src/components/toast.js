import { toast } from "react-toastify";

export function successToast(message) {
    toast.success(message,
        { position: 'top-center' }
    )
}

export function errorToast(message) {
    toast.error(message,
        { position: 'top-center' }
    )
}