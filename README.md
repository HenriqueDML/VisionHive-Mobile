# VisionHive - Sistema de Gerenciamento de Pátio

## 📌 Video do Projeto
Link > https://youtu.be/3n4hlB2W4YU

## 📌 Descrição do Projeto

O VisionHive é um aplicativo mobile desenvolvido para automatizar e otimizar a gestão das motos nos pátios da empresa. O sistema permite o controle completo do fluxo de motos, desde o cadastro até a saída, com uma interface intuitiva e responsiva que funciona em qualquer dispositivo.

## 🎯 Objetivos

- Facilitar o cadastro e localização de motos no pátio
- Permitir a visualização rápida do status de cada moto
- Gerenciar múltiplas filiais com diferentes layouts de pátio
- Oferecer uma interface intuitiva, acessível por dispositivos móveis
- Agilizar os processos de movimentação e liberação de motos

## 🚨 Problema Resolvido

Com centenas de motos distribuídas em diversos pátios, a empresa enfrenta dificuldades operacionais para localizar rapidamente veículos específicos, gerando atrasos logísticos e desperdício de tempo da equipe.

## 💡 Nossa Solução

O _VisionHive_ propõe um sistema mobile completo que permite:

- Cadastro detalhado de motos com informações de chassi, placa e motor
- Controle de movimentação entre diferentes áreas
- Gerenciamento de múltiplas filiais
- Interface amigável e responsiva para uso em campo

## 🛠 Tecnologias Utilizadas

- React Native (com Expo): Framework para desenvolvimento de aplicativos móveis multiplataforma.
- React Navigation: Biblioteca para gerenciamento de rotas e navegação entre telas.
- React Context API: Para gerenciamento de estado global (Tema, Autenticação, Filiais, Pátios, Motos).
- Axios (ou fetch): Para realizar as chamadas HTTP e consumir a API.
- UI com Componentes Nativos e Personalizados: Interface construída com StyleSheet para garantir performance e um visual consistente.
- Firebase Authentication: Para gerenciamento de login, registro e autenticação de usuários.
- API em .NET: Backend responsável pela lógica de negócio e pelas operações de CRUD (Cadastrar, Ler, Atualizar, Deletar) de filiais, pátios e motos.

## 🚀 Como Rodar o Aplicativo

### Pré-requisitos

- Node.js: Versão 18 (LTS) ou superior.
- Java 17: Necessário para as builds do Android.
- Gerenciador de Pacotes: npm ou yarn.
- Expo CLI: Instale globalmente com npm install -g expo-cli.
- Git: Para clonar o repositório.
- Emulador/Dispositivo Físico: Um emulador Android (via Android Studio) ou um celular físico com o app Expo Go instalado.

### Instalação

1. Clone o repositório:

   ```bash
   git clone https://github.com/seu-repositorio-git/VisionHive-Mobile.git
   cd visionhive-mobile
   ```

2. No primeiro terminal acesse a API e rode:

   ```bash
   cd API
   cd VisionHive.API
   dotnet run
   ```

3. Abra um novo terminal para buildar o mobile:

   ```bash
   cd VisionHive
   npm install
   npx expo prebuild --clean
   npx expo run:android --no-build-cache
   ```

4. Opções para executar o aplicativo:
- Escaneie o QR code com o aplicativo Expo Go no seu dispositivo Android ou iOS
- Pressione `a` no terminal para abrir no emulador Android
- Pressione `i` no terminal para abrir no simulador iOS (apenas macOS)
- Pressione `w` para abrir em um navegador web (funcionalidade limitada)

### Solução de Problemas Comuns

- Se encontrar o erro "close is not a function", atualize o arquivo SideMenu.js conforme as instruções no relatório de correções
- Para problemas com o Metro bundler, execute `npx expo start --clear` para limpar o cache
- Certifique-se de que todas as dependências estão instaladas corretamente

## 📱 Funcionalidades Principais

- **Login e Cadastro**: Login utilizando firebase.
- **MainMenu**: Menu principal com acesso as funcionalidades do app e opção do tema noturno.
- **Tela Filial**: Possibilita o cadastro e edição e exclusão de uma filial, apresenta a lista das filiais já cadastradas.
- **Tela Pátio**: Possibilita o cadastro e edição e exclusão de um pátio, apresenta a lista dos pátios já cadastrados.
- **Tela Moto**: Possibilita o cadastro e edição e exclusão de uma moto, apresenta a lista das motos já cadastradas.
- **Tela Perfil**: Exibe as informações do cadastro e possibilita o logout
- **Ativação do IOT**: Ativa o IOT para localização da moto ( Simulação local, por precisar do ESP32 fisico para realização do mesmo)

## 👥 Integrantes

| Nome                 | RM       |
| -------------------- | -------- |
| João Victor Michaeli | RM555678 |
| Larissa Muniz        | RM557197 |
| Henrique Garcia      | RM558062 |

---

> Projeto acadêmico desenvolvido na FIAP para o Challenge 2025
