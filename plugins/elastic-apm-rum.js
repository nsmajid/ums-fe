import {apmBase} from '@elastic/apm-rum';
export default ({ $config }, inject) => {
  const apm = apmBase;
  apm.init($config.ELASTIC_APM_RUM);
  inject('apm', apm);
};