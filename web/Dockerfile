FROM node:20-bullseye

# Install utilities and espeak-ng for phonemization
RUN apt-get update && apt-get install -y curl tar bzip2 espeak-ng && rm -rf /var/lib/apt/lists/*

# Setup Piper
WORKDIR /tmp
# Download Piper
RUN curl -L -o piper.tar.gz https://github.com/rhasspy/piper/releases/download/2023.11.14-2/piper_linux_x86_64.tar.gz \
    && tar -xvf piper.tar.gz \
    && mv piper /usr/local/bin/piper-bin \
    && ln -s /usr/local/bin/piper-bin/piper /usr/local/bin/piper \
    && rm piper.tar.gz

# Setup Models
WORKDIR /usr/local/share/piper
# Download en_US-amy-low (Small, fast model for phonics)
RUN curl -L -o en_US-amy-low.onnx https://huggingface.co/rhasspy/piper-voices/resolve/v1.0.0/en/en_US/amy/low/en_US-amy-low.onnx?download=true
RUN curl -L -o en_US-amy-low.onnx.json https://huggingface.co/rhasspy/piper-voices/resolve/v1.0.0/en/en_US/amy/low/en_US-amy-low.onnx.json?download=true

# Setup App
WORKDIR /app
COPY package*.json ./
RUN npm install

COPY . .

EXPOSE 3000
CMD ["npm", "run", "dev"]

