import React, {useState} from "react"
import { userAtom } from "../Atom"
import { useRecoilState } from "recoil"

export default function UserInfo(){

    const [user, setUser]= useRecoilState(userAtom),
        [info, setInfo] = useState({address: null})

    return (
        <div>
            <form>
                <input type="text" value={info.address}/>
            </form>
        </div>
    )
}

// https://api.opencagedata.com/geocode/v1/json?q=4413%20Romlon%20St%20Apt%20203%2C%20Beltsville%2C%20MD%2020705&key=7e1fe8a5e39e4722879d74a3d088c58c&language=en&pretty=1