FROM node:20-bullseye

# Install utilities and espeak-ng for phonemization
RUN apt-get update && apt-get install -y curl espeak-ng && rm -rf /var/lib/apt/lists/*

# Setup Piper Models
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

