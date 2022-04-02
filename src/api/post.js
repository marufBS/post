import { baseUrl } from "../config";

export const getPost = async (pageCount) => {
    const data = await fetch(`${baseUrl}search_by_date?tags=story&page=${pageCount}`, {
        method: 'GET'
    })
        .catch(error => console.log(error))
    return data;
}