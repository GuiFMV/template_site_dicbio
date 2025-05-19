# Usa uma imagem oficial do Python
FROM python:3.12-slim

# Define o diretório de trabalho
WORKDIR /app

# Copia os arquivos do projeto para dentro do contêiner
COPY . /app/

# Instala dependências
RUN pip install --upgrade pip \
    && pip install -r requirements.txt

# Expõe a porta do Django
EXPOSE 8000

# Comando padrão para rodar o servidor
CMD ["python", "manage.py", "runserver", "0.0.0.0:8000"]
