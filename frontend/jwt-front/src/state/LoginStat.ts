import { atom } from "recoil"
import Member from "../interface/Member"

export default atom<Member | null>({
    key: 'LoginStat',
    default: null
})