import express from 'express';
import {StatusCodes} from 'http-status-codes';

const app = express();
const PORT = process.env.PORT || 3000;
let users = [
    {id: 1, name: 'Rafael Ribeiro', age: 31 },
    {id: 2, name: 'Gabriel Custodio', age: 27 },
];

app.use(express.json());  // para informar que as request utilizam o formato json

app.listen(PORT, () => {
    console.log(`Servidor rodando em http://localhost:${PORT}`);
});

app.get('/', (request, response) => {
    return response.send('<h1>Trabalhando com servidor express.</h1>');
});

app.get('/users', (request, response) => {
    return response.send(users);
});

app.get('/users/:userId', (request, response) => {
    const userId = request.params.userId;
    const user = users.find(user => {
        return (user.id === Number(userId))
    })
    return response.send(user);
});

app.post('/users', (request, response) => {
    const newUser = request.body;

    users.push(newUser);

    return response.status(StatusCodes.CREATED).send(newUser);
})

/* Dados para teste de POST com o thunder(extensão) no VS Code

  {
    "id": 3,
    "name": "Fernanda de Araújo",
    "age": 30
  },
  {
    "id": 4,
    "name": "Jorge Cunha",
    "age": 27
  }

  */

  app.put('/users/:userId', (request, response) => {
    const userId = request.params.userId;
    const updatedUser = request.body;

    users = users.map(user => {
        if (Number(userId) === user.id) {
            return updatedUser;
        }
        return user;
    })
    return response.send(updatedUser);
});

app.delete('/users/:userId', (request, response) => {
    const userId = request.params.userId;

    users = users.filter((user) => 
        user.id !== Number(userId));
    
    return response.status(StatusCodes.NO_CONTENT).send();
});
