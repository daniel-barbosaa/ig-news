/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  webpackDevMiddleware: (config) => {
    config.watchOptions = {
      ignored: /node_modules/, // Ignora os node_modules, se necessário
      aggregateTimeout: 300, // Adiciona um atraso antes de compilar após mudanças (300ms)
      poll: 500, // Polling a cada 1 segundo (ajuste se necessário)
    };
    return config;
  },
};

export default nextConfig;
