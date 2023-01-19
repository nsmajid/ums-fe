import apmNode from 'elastic-apm-node';
export default function ({ $config }, inject) {
  if (!apmNode.isStarted()) apmNode.start();
  inject('apmNode', apmNode);
};