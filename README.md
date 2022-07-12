# Algoritmo-Caixeiro-Viajante
## Projeto em construção 

[![NPM](https://img.shields.io/npm/l/react)](https://github.com/Cyro56/Algoritmo-Caixeiro-Viajante/blob/main/LICENSE)


# Sobre o projeto

Imagine uma cidade onde há Sete bairros, e você tenha que realizar entregas nestes bairros percorrendo todos os bairros retornando para o bairro inicial.

<img width="413" alt="Captura de Tela 2022-07-12 às 15 39 36" src="https://user-images.githubusercontent.com/86036682/178569764-02b90337-e3e3-4023-aeaf-a29b1a0b4034.png">

Obviamente, há muitas formas de fazer isso, porém, seria interessante fazer esse caminho percorrendo a menor distância possível, este é o problema do caixeiro viajante. Neste projeto, foi construída uma heurística  para a solução do problema do caixeiro viajante (PCV), utilizando representação dos bairros em uma estrutura de grafo simétrico, metodologia de algoritmos genéticos e programação dinâmica para otimização  de buscas.

## Pré-requisitos
Pré-requisitos: Node Js,VS code

## Layout
console do terminal

# Tecnologias utilizadas
## Node js

# Como executar o projeto
O projeto conta com 3 módulos pertinentes á execução:

## DataCity.js

localizado na pasta dataCity, contém a representação dos bairros no formato de grafos simétricos, ali você encontrará a representação do esquema de bairros representado na imagem acima, com exatidão de ligações (connections) entre si, você poderá  incluir ou excluir bairros do esquema neste arquivo, atentando-se porém, ás devidas ligações entre as cidades que você deseja explorar, observe que não necessariamente  todas as cidades tem ligação  entre si e você poderá representar o arranjo que julgar pertinente.

obs: A variável Weight é iniciada como 0 para que se criem grafos simétricos, porém se você entender que na sua representação um determinado caminho tem custo maior que outro, você poderá atribuir a essa variável  o valor pertencente aos Reais que julgar necessário.

## neuralNetwork.js

localizada na pasta NeuralProcess, se destina á processar os dados de DataCity e treinar o algoritmo. Você pode variar as variáveis de CalculateRoute para os pontos iniciais e finais que desejar (não necessariamente precisam coincidir), e pode variar trainingNumber, para que o algoritmo aumente ou reduza sua precisão.

<img width="409" alt="Captura de Tela 2022-07-12 às 16 11 09" src="https://user-images.githubusercontent.com/86036682/178575099-0d7abbfd-0930-4c5e-a050-6a0790434f83.png">

## driver.js

Localizado  na raiz do projeto contém a função  DriverRoute, cujos parâmetros devem coincidir com os parâmetros  da função de treino CalculatRoute em neuralNetwork. Esse é o arquivo que deve ser executado no terminal do projeto enquanto ainda não foi construída a interface gráfica, por favor, sinta-se convidado a contribuir.

<img width="427" alt="Captura de Tela 2022-07-12 às 16 15 17" src="https://user-images.githubusercontent.com/86036682/178575837-788a65c8-7081-4683-b8cb-d7c3dbb930a8.png">





## Resposta 
Esse é o tipo de resposta esperada,um array com a sequencia de cidades a serem visitadas, o campo "tentativas", se refere ao número de ciclos que o algoritmo teve que passar para encontrar uma resposta aceitável

<img width="352" alt="Captura de Tela 2022-07-12 às 15 54 05" src="https://user-images.githubusercontent.com/86036682/178572328-7c6b605d-0c32-47b6-9b40-0229d91850b2.png">

obs: não  há problema em visitar uma cidade duas vezes, esse comportamento existe para contemplar casos de bifurcações, por exemplo: o caminho de F á F passando por todos os pontos.



## Próximos passos
-Será implementada a linguagem TypeScript, utilizando framework React

-Serão  implementados testes unitários

-Será implementada interface para interação com o usuário


# Autor

Cyro Renato

https://www.linkedin.com/in/cyro-renato-3971031b2
