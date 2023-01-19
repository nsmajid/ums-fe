export default function ({ $config: {API_TOKEN}, $axios, $sentry, $apm, $apmNode, error }) {
  const nuxtError = error;
  $axios.onRequest((config) => {
    if (API_TOKEN)
    {
      config.headers = {
        ...config.headers,
        'Authorization': 'Bearer '+API_TOKEN
      };
    }
    return config;
  });
  $axios.onResponse((response) => {
    return Promise.resolve(response);
  });
  $axios.onError((err) => {
    const errorMessage = new Error(`HTTP Request: ${err.message}`);

    // Sentry Logger
    if ($sentry)
    {
      $sentry.withScope(scope => {
        scope.setExtra("request_headers", err.request._header);
        scope.setExtra("response_config", err.response.config);
        scope.setExtra("response_headers", err.response.headers);
        scope.setExtra("response_data", err.response.data);
        $sentry.captureException(errorMessage);
      });
    }

    // for elastic apm payload metadata
    const elasticApmAxiosMetadata = {
      axios: {
        response: {
          config: err.response.config,
          headers: err.response.headers,
          data: err.response.data,
          status: err.response.status,
          statusText: err.response.statusText
        }
      }
    };

    // Logger - Elastic APM Node (SSR)
    if ($apmNode)
    {
      $apmNode.setCustomContext(elasticApmAxiosMetadata);
      $apmNode.captureError(errorMessage);
    }

    // Logger - Elastic APM RUM (Client)
    if ($apm)
    {
      this.$apm.setCustomContext(elasticApmAxiosMetadata);
      this.$apm.captureError(errorMessage);
    }

    nuxtError({
      message: err.message,
      statusCode: err.response.status
    });

    return Promise.reject(err);
  });
};