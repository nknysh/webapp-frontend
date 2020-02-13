export const getDeploymentEnv = () => {
  if(!window){
    return null;
  }

  const host = window.location.host;

  if(/localhost/.test(host)){
    return 'local';
  }

  const [env, ...rest] = host.split('.');

  if(env === 'pure-escapes'){
    return 'production';
  }

  return env;
};
