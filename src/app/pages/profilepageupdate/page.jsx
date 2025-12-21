import {getAuthenticatedUser } from '../../../lib/userDetailsToken/getUserToken'
import User from "../../../lib/schema/UserSchema"
import ProfilepageupatePage from "./ProfilepageupatePage";

export default async function editProfilePage(req) {
    const userId = await getAuthenticatedUser();
    const user = await User.findById(userId.id).lean();

    if(!user){
        return(
            <>
            <div>User Not Fount </div>
            </>
        )
    }

    const serializableUser = JSON.parse(JSON.stringify(user));

    return(
        <>
            <div>
                <ProfilepageupatePage user={serializableUser}/>
            </div>
        </>
    )
}