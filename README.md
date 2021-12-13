# **Projeto Conversor On.**
 
### O projeto tem como finalidade a criação de um sistema incorporado a um login por meio do banco de dados e um processo de cálculo automático entre moedas mundiais, utilizando para isso a api do site Exchangerate, de forma que os valores de conversão irão ser salvos no local storage, mas atualizandos a cada 1 hora;
 
</br></br>
## **Tecnologias Utilizadas** 🦾
- VueJs;
- Bootstrap;
- Axios;
- Express;
- Sequelize;
- JsonWebToken;
- Mysql;
- NodeJs;
- Docker;
 
</br></br>
## **Inicialização** 💥
- Realize a clonagem do sistema pelo github;
- Vá na pasta criada e pelo terminal entre na pasta **backend**;
- Crie um servidor Mysql com as seguinte características:
>   User: 'root'; <br>
>   Password: 'root'; <br>
>   Host: '172.17.0.2' <br>
>   Port: 3306
 
- Caso seja necessário, é possível trocar essa características de conexão no arquivo **"backend/src/database/index.js"**
- Execute o comando a seguir na pasta **backend**;
> yarn install</br>
- Execute o comando a seguir na pasta **backend** para criar o banco de dados localmente;
> yarn sequelize db:create</br>
- Execute o comando a seguir para inicializar o servidor backend;
> yarn serve</br>
- Volte a pasta raiz e entre na pasta **frontend**;
- Execute os comandos a seguir para inicializar o Vue;
> yarn install</br>
> yarn server</br>
- Entre no link do server disponibilizado no console;
- Utilize as seguintes informações para logar no sistema web:
> Login: admin@admin <br>
> Senha: admin


</br></br>
 
## **Especializações do Sistema** 🤖
- O sistema funciona utilizando o token, dessa maneira as informações do usuário não fica na máquina local;
- O token permite voltar sempre com o mesmo usuário quando recarrega a página;
- Caso seja apagado o localstorage durante o processo de conversão, o sistema irá continuar funcionando, mas quando recarregar, irá ser necessário logar;
- O campo login e senha não podem ficar em branco, aparecendo uma aviso, sendo o mesmo para os campos de conversão, como valor e tipo de conversão;
- O campo de valor para conversão não aceita letras, apenas números e o caracter ponto, utilizando assim para realizar cálculos decimais;
- Sempre que realizar uma conversão o valor irá ser mostrado no input resultado é salvo na tabela automaticamente;
- Ao iniciar a digitação do campo valor, o input resultado irá apagar automaticamente, utilizando para isso o ciclo de vida do Vue;
- Os botões de paginação irá ser habilitados de acordo com a quantidade de tabelas, dessa maneira não é possível acessar um tabela ainda não criada;
- Ao ser habilitado uma nova tabela o botão de paginação apresenta um efeito para distinguir do desabilitado;
- A paginação permite voltar entre as 3 tabelas como quiser, não alterando seu valor;
- Ao final das 3 tabelas, totalizando em 15 consultas, o sistema irá pedir para clicar no botão da mensagem para realizar a limpeza, outra opção é atualizando a página;
- Ao iniciar o sistema por meio do token, durante a verificação do banco de dados ou ainda quando chega no limite de valores da tabela, irá se mostrado um componente de mensagem;
- Ao realizar o conexão com a Api do site, o mesmo irá salvar o valor do banco de dados dele no local storage, dessa forma é realizado uma requisição por hora, caso, passe esse tempo na próxima requisição irá realizar todo o processo com a Api novamente, o mesmo acontece caso seja apagado o local storage ou seja conectado com um novo usuário;

</br></br>
 
## **Contato** 🥸
- Nome: Marcelo TJ;
- Nick: martex84;
- Linkedln: [link](https://www.linkedin.com/in/martex8/) ;
- Email: martex849@gmail.com
 
</br></br>
 
## **Imagens** 🗺️
 
### - **Tela Login**
![Imagem Login](./images/Tela_Login.png)
 
### - **Tela Conversão Inicial**
![Imagem Login](./images/Tela_Conversao_Inicial.png)
 
### - **Tela Conversão Preenchida**
![Imagem Login](./images/Tela_Conversao_Prenchimento.png)
 
### - **Tela Conversão Preenchida Mobile**
![Imagem Login](./images/Tela_Conversao_Preenchimento_Mobile.png)
