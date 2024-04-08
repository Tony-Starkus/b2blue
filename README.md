# B2Blue - Desafio

Este projeto foi construído baseado no desafio proposto.

## 🎯 Objetivo

Imagine três estações de armazenamento de resíduos. Seu desafio é criar um painel
intuitivo que permita aos usuários informar a % de volume de ocupação em cada estação.
Quando uma estação atingir 80% de ocupação, queremos que o sistema gere automaticamente
um pedido de coleta!
E aqui vem a parte interativa e inovadora: após o pedido de coleta, o usuário terá a opção
de confirmar a coleta da estação. Após a confirmação, a estação deve ser reiniciada para 0% de
preenchimento. Todas essas operações devem ser meticulosamente registradas em um banco
de dados para análise futura.

## &#x2705; Requisítos

- O painel deve contar com, no mínimo, três estações de armazenamento de resíduos;
- O usuário deve informar quantos % de volume com o qual cada estação está preenchida;
- Quando a estação estiver com 80% de ocupação, gerar um pedido de coleta automaticamente;
- Após o pedido de coleta o usuário poderá confirmar a realização da coleta da estação;
- Após a confirmação da coleta, a estação deve voltar seu volume ocupado para 0%;

## &#128187; Tecnologias

Este projeto foi construído usando React com Vite e TypeScript, utilizando as seguintes bibliotecas:

| Biblioteca                                                     | Descrição                                                                   |
| -------------------------------------------------------------- | --------------------------------------------------------------------------- |
| [MUI](https://mui.com/)                                        | Biblioteca de componentes UI para desenvolvimento rápido de funcionalidades |
| [react-toastify](https://www.npmjs.com/package/react-toastify) | Biblioteca para notificações em forma de toast                              |
| [sweetalert2](https://sweetalert2.github.io/)                  | Biblioteca de alertas estilizados, responsívos e customizáveis              |

## ⚡ Instalação

1. Clone este repositório
2. Instale as dependências

```shell
npm install
```

3. Rode o projeto

```shell
npm run dev
```

## &#128214; Documentação

[Clique aqui para acessar a documentação](docs/README.md)
