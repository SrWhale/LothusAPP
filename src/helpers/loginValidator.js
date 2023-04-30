import axios from 'axios';

export async function validateLogin(username, password) {
    const parser = new URLSearchParams({ username, password });

    const wait = await axios.get(`http://api.mc-lothus.com:25565/login?${parser.toString()}`).then(res => res.data).catch(err => {
        console.log(err);

        return { status: false, message: "Erro ao conectar ao servidor"}
    })

    console.log(wait);
    
    return wait
}