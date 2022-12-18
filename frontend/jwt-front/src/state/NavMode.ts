import { atom } from "recoil"

export default atom<string>({
    key: 'NavMode',
    default: 'home'
})