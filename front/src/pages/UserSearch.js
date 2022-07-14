
import React, { useEffect, useState } from "react";
import axios from "axios";
import UserResult from '../components/UserResult'

const UserSearch = () => {
    const [result, setResult] = useState([])
    const [noResult, setNoResult] = useState(1);
    useEffect(() => {
        userSearcher()
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [])
    const userSearcher = async () => {
        const token = JSON.parse(localStorage.token)
        let id = document.URL.replace('http://localhost:3000/UserSearch/', '')

        axios.get(`${process.env.REACT_APP_API_URL}api/auth/`, {
            params: {
                user: id
            },
            headers: {
                authorization: `Bearer ${token}`
            }
        }).then((res) => {
            if (res.data.error) {
                console.log(res.data.error)
            }
            else {
                setResult(res.data)
            }
        })
            .catch((err) => {
                setNoResult(0)
            });
    }
    return (
        <>
            {noResult === 1 ? (<div className="result-list">
                <div className="result-container">
                    <div className="info-user">
                        {result.map(result =>
                        (
                            <UserResult
                                key={result.UID}
                                fname={result.firstName}
                                name={result.lastName}
                                mail={result.email}
                                pic={result.imageProfile}
                                UID={result.UID}
                            />
                        )
                        )}
                    </div>
                </div>
            </div>)

                : (<div> <p>Aucun utilisateur ne correspond à votre recherche</p></div>)
            }
        </>
    )
}

export default UserSearch;
