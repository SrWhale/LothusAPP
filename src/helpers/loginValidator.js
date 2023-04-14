import axios from 'axios';

export async function validateLogin(username, password) {
    const parser = new URLSearchParams({ username, password });

    const wait = await axios.get(`http://20.206.200.239:25565/login?${parser.toString()}`).then(res => res.data);

    console.log(wait);
    
    return wait
}