module.exports = {
    resolve: {
      fallback: {
        path: false,
        fs: false,
      },
    },
    module: {
      rules: [
        {
          test: /\.worker\.js$/,
          use: { loader: "worker-loader" },
        },
      ],
    },
  };