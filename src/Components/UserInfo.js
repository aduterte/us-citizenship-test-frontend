import React, {useState} from "react"
import { userAtom } from "../Atom"
import { useSetRecoilState } from "recoil"

export default function UserInfo(){

    const setUser = useSetRecoilState(userAtom),
        [info, setInfo] = useState({address: "", state: "", zip: ""})

    function handleChange(e){
        setInfo({...info, [e.target.name]: e.target.value})
        console.log(info)
    }
    function handleSubmit(e){
        e.preventDefault()
        fetch(`https://civicinfo.googleapis.com/civicinfo/v2/representatives?address=${info.address}%20${info.state}%20${info.zip}&key=${process.env.REACT_APP_GOOGLE_API_KEY}`)
        .then(resp => resp.json())
        .then(data => {
            console.log(data)
            const obj = {
                potus: data.officials[0].name,
                vice: data.officials[1].name,
                senators: [data.officials[2].name, data.officials[3].name],
                house: data.officials[4].name,
                gov: data.officials[5].name,
                potusParty: data.officials[0].party
            }
            setUser(obj)
            // console.log(obj)
        })
    }
    return (
        <div>
            <form onSubmit={handleSubmit}>
                <div>Enter Address</div>
                <input onChange={handleChange} name="address" type="text" value={info.address}/>
                <div>Enter State</div>
                <input onChange={handleChange} name="state" type="text" value={info.state}/>
                <div>Enter Zipcode</div>
                <input onChange={handleChange} name="zip" type="text" value={info.zip}/>
                <div onClick={handleSubmit}>Submit</div>
            </form>
        </div>
    )
}

// https://api.opencagedata.com/geocode/v1/json?q=4413%20Romlon%20St%20Apt%20203%2C%20Beltsville%2C%20MD%2020705&key=7e1fe8a5e39e4722879d74a3d088c58c&language=en&pretty=1