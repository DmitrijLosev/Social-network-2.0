export const fetchInstance = ()=> {
    const base_Url = "https://social-network.samuraijs.com/api/1.0" as const

    const settings = {
        method: "GET",
        credentials: "include" as const,
        headers: {
            "Content-Type": "application/json;charset=utf-8",
            "API-KEY": "99e456ee-d6c6-4a9b-9a62-843b8099abfe"
        }
    }
    const getResponse = async (response: Promise<Response>) => {
        let res = await response;
        return res.json()
    }

    return {base_Url,settings,getResponse}
}