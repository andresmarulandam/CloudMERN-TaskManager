import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react()],
  server: {
    port: 3000, // Define que el servidor de desarrollo de Vite se ejecutará en el puerto 3000. Esto significa que cuando inicies el proyecto, podrás acceder a la aplicación desde http://localhost:3000.
    proxy: {
      //  El proxy actúa como un intermediario entre tu frontend (que corre en http://localhost:3000) y tu backend (que corre en http://localhost:8800), evitando problemas con las CORS
      '/api': {
        target: 'http://localhost:8800',
        changeOrigin: true,
      },
      // Esta parte indica que cualquier solicitud que empiece con /api en el frontend será redirigida al backend. Por ejemplo, una solicitud a http://localhost:3000/api/users será redirigida a http://localhost:8800/api/users.
      //changeOrigin: true:
      // Esta opción cambia el encabezado Host de las solicitudes para que coincida con el del destino (http://localhost:8800). Esto es útil si el backend tiene configuraciones que dependen del encabezado Host.
    },
  },
});
