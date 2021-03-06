# Back End - Localizador de CEPS

Esse projeto é o back - end do localizador de CEPs. Para usá-lo, baixe clone o projeto em uma pasta e, dentro dessa pasta, digite:

```shell

yarn install || npm install

```

Depois disso, basta iniciar o processo com o seguinte comando:

```shell

yarn start || npm start

```

A partir dai, o programa irá iniciar e você pode utilizá-lo a partir do seu localhost através da porta 3000.

## Funcionalidade

Essa API possui duas finalidades que servem ao mesmo propósito: consulta de CEPS. Para fazer uma consulta de cep, você deve informar um cep válido, ou seja, com 5 dígitos, hífen e, após isso, 3 dígitos. Qualquer coisa fora desse padrão irá retornar um erro com o código 400 e esse retorno:

```json
{
  "error": " não é um valor válido "
}
```

A API, depois de validar o seu CEP, irá procurar por ele dentro do banco de dados local. Caso ele não exista, será feita uma requisição ao [ViaCep](https://viacep.com.br/). Essa requisição irá retornar os dados necessários para o CEP. Caso esse CEP seja válido, ele irá ter seus dados salvos no banco de dados. Com isso, toda requisição subsequente irá pegar os dados do banco de dados. Caso contrário, ele retornará uma mensagem de que esse CEP não existe com o código de 404 informando que o CEP não existe.

