# CONTRIBUTING.md

### Cómo contribuir 🛠

#### 1. Configura tu entorno

- **Fork el repositorio**: Haz un "fork" del proyecto a tu cuenta de GitHub para tener tu propia copia. Para hacer esto, haz clic en el botón "Fork" en la parte superior derecha de la página del repositorio en GitHub. Esto creará una copia del repositorio en tu cuenta de GitHub.

- **Clona tu fork**: Después de hacer un fork, clona el repositorio a tu máquina local. Para hacerlo, copia la URL de tu fork haciendo clic en el botón verde "Code" y luego ejecuta `git clone <URL del fork>` en tu terminal.

- **Añade el repositorio original como remoto**: Para mantener tu fork actualizado con los cambios del repositorio original, agrega el repositorio original como un remoto. Puedes hacerlo ejecutando `git remote add upstream <URL del repositorio original>`.

- **Asegúrate de usar la versión de Node correcta**: Para ello, `nvm use` o `nvm use <version>`, si no usas `nvm`, asegúrate de descargar la versión detallada en `.node-version` o `.nvmrc`.

- **Instala las dependencias**: Navega hasta el directorio del proyecto clonado y ejecuta `pnpm install` para instalar todas las dependencias necesarias.

#### 2. Trabaja en tus cambios

- **Sincroniza el fork**: Puedes hacerlo desde `github.com/tu-usuario/tu-repositorio-de-la-line-follower` y haciendo click en `Sync fork`. También puedes hacerlo desde la terminal `gh repo sync -b main` o `git switch main && git fetch upstream && git merge upstream/main`. Más información en la [documentación oficial de Github](https://docs.github.com/en/pull-requests/collaborating-with-pull-requests/working-with-forks/syncing-a-fork)
- **Crea una nueva rama**: Antes de empezar a trabajar en tus cambios, crea una nueva rama utilizando `git switch -c nombre-de-tu-rama`.
- **Desarrolla tus cambios**: Implementa tus cambios o mejoras en tu rama local. Asegúrate de seguir las prácticas y estándares de código del proyecto.
- **Prueba tus cambios**: Ejecuta `pnpm run dev` para iniciar el servidor de desarrollo de Astro y revisa tus cambios en el navegador.

#### 3. Envía tus cambios

- **Commit de tus cambios**: Una vez estés satisfecho con tus cambios, haz commit de ellos con un mensaje claro y descriptivo.
- **Push a tu fork**: Haz push de tu rama con los cambios a tu fork en GitHub utilizando `git push origin nombre-de-tu-rama`.
- **Crea un Pull Request (PR)**: En GitHub, ve a tu fork de 'line-follower' y haz clic en "Pull request" para iniciar uno. Asegúrate de describir claramente qué cambios has realizado y por qué son necesarios o útiles para el proyecto.
