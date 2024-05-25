import {RefObject} from "react";
import {Toast} from "primereact/toast";

export const showInfoMessage = (toast: RefObject<Toast>, title: string, detail: string) => {
    toast.current!.show({severity: 'info', summary: title, detail: detail, life: 3000});
}

export const showErrorMessage = (toast: RefObject<Toast>, title: string, detail: string) => {
    toast.current!.show({severity: 'error', summary: title, detail: detail, life: 3000});
}

export const showWarningMessage = (toast: RefObject<Toast>, title: string, detail: string) => {
    toast.current!.show({severity: 'warn', summary: title, detail: detail, life: 3000});
}

export const showSuccessMessage = (toast: RefObject<Toast>, title: string, detail: string) => {
    toast.current!.show({severity: 'success', summary: title, detail: detail, life: 3000});
}