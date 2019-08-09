import defaultAppRouting from './apps/default';
import srAppRouting from './apps/sr';
import adminAppRouting from './apps/admin';
import rlAppRouting from './apps/rl';

export default {
  apps: {
    default: defaultAppRouting,
    sr: srAppRouting,
    admin: adminAppRouting,
    rl: rlAppRouting,
  },
};
