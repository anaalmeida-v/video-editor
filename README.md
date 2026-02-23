# 🎬 Web Video Editor (MVP)

Um editor de vídeo leve, rodando 100% no navegador, utilizando FFmpeg.wasm para processamento client-side.

## 🚀 Sobre o Projeto

Este projeto é um MVP de editor de vídeo com foco em:

- Corte de vídeo
- Processamento local (sem upload para servidor)
- Interface moderna com React + TypeScript
- Arquitetura escalável para futuras funcionalidades

A proposta é construir um editor simples, rápido e performático, sem depender de processamento em backend.

---

## 🧠 Arquitetura

O projeto segue separação de responsabilidades:

- `components/` → Componentes reutilizáveis (VideoPlayer, Controls)
- `features/editor/` → Lógica principal do editor
- `hooks/` → Hooks customizados
- `state/` → Gerenciamento de estado global
- `utils/` → Funções auxiliares

A ideia é manter uma estrutura organizada e preparada para escalar.

---

## 🛠️ Tecnologias Utilizadas

- React
- TypeScript
- Vite
- Tailwind CSS
- FFmpeg.wasm

---

## 🎥 Como Funciona

1. O usuário faz upload de um vídeo local
2. O vídeo é renderizado no player
3. O FFmpeg.wasm processa o arquivo diretamente no navegador
4. O vídeo editado é exportado como MP4