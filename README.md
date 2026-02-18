# Screenlite Player Web

An open-source, web-based digital signage player.

Built with **Vite**, **React**, and **TypeScript**.

## Getting Started

1. **Clone the repository:**
	```bash
	git clone https://github.com/screenlite/web-player.git
	cd web-player
	```

2. **Install dependencies:**
	```bash
	npm install
	```

3. **Start the development server:**
	```bash
	npm run dev
	```

## Docker Compose (Development Build)
Build the image:
```bash
docker compose build --no-cache --pull
```

Run compose:
```bash
docker compose up --force-recreate
```

## Docker (Production Build)

Build the image:
```bash
docker build -t ds-web-player .
```

Run the container:
```bash
docker run --rm -p 8080:80 ds-web-player
```

Open `http://localhost:8080`.

### Docker on Another PC

Option 1: Build from source
```bash
git clone https://github.com/screenlite/web-player.git
cd web-player
docker build -t ds-web-player .
docker run --rm -p 8080:80 ds-web-player
```

Option 2: Build once and transfer the image
```bash
# On the source PC
docker build -t ds-web-player .
docker save -o ds-web-player.tar ds-web-player

# On the other PC
docker load -i ds-web-player.tar
docker run --rm -p 8080:80 ds-web-player
```

## Supported Data Sources

- **Network JSON file**
- **[Screenlite CMS](https://github.com/screenlite/screenlite)** _(Work in Progress)_
- **[Garlic-Hub CMS](https://github.com/sagiadinos/garlic-hub)** _(Work in Progress)_

## Notes

- If you encounter CORS errors, you can launch Chrome with web security disabled:

	**On Linux/macOS:**
	```bash
	chrome --disable-web-security --user-data-dir="/tmp/chrome"
	```

	**On Windows:**
	```powershell
	start chrome --disable-web-security --user-data-dir="C:\chrome-dev"
	```
- This project is tested and intended for use in **Google Chrome** only.
