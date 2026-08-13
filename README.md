# Landing Ventu

Landing page de [Ventu](https://ventu.cl) — red de abastecimiento B2B: crédito a
30 días y entrega el mismo día.

Sitio estático, sin build ni dependencias. Se despliega en Railway con nginx.

## Estructura

```
index.html        Landing principal (hero, propuesta de valor, stats, red, FAQ, CTA)
suppliers.html    Página para proveedores
drivers.html      Página para transportistas
styles.css        Design system v24 — compartido por las tres páginas
main.js           Toggle ES/EN, switcher de industrias, acordeón de FAQ
ventu-logo.png    Logo (2088×492, RGBA)
Dockerfile        Imagen nginx para Railway
nginx.conf.template  Config de nginx; ${PORT} lo inyecta Railway
railway.json      Fija el builder Dockerfile y el healthcheck
```

Las tres páginas comparten `styles.css` y `main.js`: el CSS y el JS eran
idénticos entre ellas, así que viven en un solo archivo cada uno.

## Desarrollo local

No hay build. Basta con servir la carpeta:

```bash
python3 -m http.server 8099
# o
npx http-server -p 8099
```

Y abrir http://localhost:8099.

Ábrelo por HTTP, no con `file://` — así las rutas relativas y las fuentes se
comportan igual que en producción.

## Deploy en Railway

Railway detecta el `Dockerfile` y construye la imagen. No hay variables de
entorno que configurar: `PORT` lo inyecta Railway y `nginx.conf.template` lo
consume vía `envsubst` (la imagen oficial de nginx corre esa sustitución al
arrancar sobre `/etc/nginx/templates/*.template`).

```bash
railway up
```

El healthcheck apunta a `/health`, que devuelve `200 ok`.

Para probar la imagen igual que en producción:

```bash
docker build -t ventu-landing .
docker run --rm -p 8080:8080 -e PORT=8080 ventu-landing
```

## Notas

- **Fuentes externas.** Satoshi (Fontshare) y JetBrains Mono (Google Fonts) se
  cargan por CDN. Si el navegador no las alcanza, el sitio cae a la fuente de
  sistema y el layout se mantiene.
- **Bilingüe.** El contenido ES/EN convive en el HTML con atributos
  `data-lang`; `main.js` alterna la clase `lang-active`. El idioma por defecto
  es ES y no se persiste entre visitas.
- **Assets sin hash.** `styles.css` y `main.js` se sirven con `Cache-Control:
  no-cache`, así que un deploy se ve de inmediato. Las imágenes sí se cachean
  30 días.
- **CTA externo.** Los botones de "Crear cuenta gratis" apuntan a un host
  externo de registro, no a este repo.
