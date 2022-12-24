import JwtResponse from "./JwtResponse";
import Member from "./Member";

export default interface LoginResponse {
    member: Member,
    jwt: JwtResponse
}